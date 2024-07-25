const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const CommunityMessage = require('../models/messageSchema');
const stream = require('stream');

let bucket;

mongoose.connection.once('open', () => {
  bucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads'
  });
});

exports.postMessage = async (req, res) => {
  try {
    const { consultantId, category, item, message, name, imagefile,photo } = req.body;

    let fileId = null;

    if (imagefile) {
      const buffer = Buffer.from(imagefile, 'base64');
      const uploadStream = bucket.openUploadStream(`${Date.now()}_image.jpg`, {
        contentType: 'image/jpeg'
      });

      await new Promise((resolve, reject) => {
        const bufferStream = new stream.PassThrough();
        bufferStream.end(buffer);
        bufferStream.pipe(uploadStream)
          .on('error', reject)
          .on('finish', () => {
            fileId = uploadStream.id;
            resolve();
          });
      });
    }

    const newMessage = new CommunityMessage({
      consultant: new mongoose.Types.ObjectId(consultantId),
      category,
      item,
      message,
      imagefile: fileId,
      name,
      photo
    });

    await newMessage.save();

    res.status(201).json({
      status: 'success',
      data: {
        message: newMessage
      }
    });
  } catch (error) {
    console.error('Error posting message:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error posting message'
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { category, item } = req.query;
    
    const messages = await CommunityMessage.find({ category, item })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      status: 'success',
      results: messages.length,
      data: {
        messages
      }
    });
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving messages'
    });
  }
};

exports.getFile = async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.fileId);
    const downloadStream = bucket.openDownloadStream(fileId);

    downloadStream.on('error', () => {
      res.status(404).json({
        status: 'error',
        message: 'File not found'
      });
    });

    downloadStream.pipe(res);
  } catch (error) {
    console.error('Error retrieving file:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving file'
    });
  }
};