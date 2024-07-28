// controllers/communityController.js
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const CommunityMessage = require('../models/messageSchema');
const LastViewed = require('../models/lastViewedSchema');
const stream = require('stream');

let bucket;

mongoose.connection.once('open', () => {
  bucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads'
  });
});

exports.postMessage = async (req, res) => {
  try {
    const { consultantId, category, item, message, name, imagefile, photo, replyTo } = req.body;

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
      photo,
      replyTo: replyTo ? {
        id: new mongoose.Types.ObjectId(replyTo.id),
        name: replyTo.name,
        message: replyTo.message
      } : null
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
    const { category, item, consultantId } = req.query;
    const messages = await CommunityMessage.find({
      category,
      item,
      deletedFor: { $ne: consultantId }
    }).sort({ createdAt: 1 });
    res.json({ success: true, data: { messages } });
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

exports.getLastViewedTime = async (req, res) => {
  try {
    const { consultantId, category, item } = req.query;
    const lastViewed = await LastViewed.findOne({ consultantId, category, item });
    res.json({ lastViewedTime: lastViewed ? lastViewed.lastViewedTime : new Date(0) });
  } catch (error) {
    console.error('Error retrieving last viewed time:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving last viewed time'
    });
  }
};

exports.updateLastViewedTime = async (req, res) => {
  try {
    const { consultantId, category, item, lastViewedTime } = req.body;
    await LastViewed.findOneAndUpdate(
      { consultantId, category, item },
      { lastViewedTime },
      { upsert: true, new: true }
    );
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating last viewed time:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error updating last viewed time'
    });
  }
};

exports.deleteMessage = async (req, res) => {
  try {

    const { messageId, consultantId, deleteType, category, item } = req.body;
  console.log(`Received delete request: ${messageId}, ${consultantId}, ${deleteType}`);

    // Validate input
    if (!messageId || !consultantId || !deleteType) {
      return res.status(400).json({ status: 'error', message: 'Missing required fields' });
    }

    // Find the message
    const message = await CommunityMessage.findById(messageId);
    if (!message) {
      return res.status(404).json({ status: 'error', message: 'Message not found' });
    }

    // Check if the consultant is the owner of the message
    if (message.consultant.toString() !== consultantId) {
      return res.status(403).json({ status: 'error', message: 'Not authorized to delete this message' });
    }

    if (deleteType === 'for everyone') {
      await CommunityMessage.findByIdAndDelete(messageId);
    } else if (deleteType === 'for me') {
      // Add the consultantId to the deletedFor array
      await CommunityMessage.findByIdAndUpdate(messageId, {
        $addToSet: { deletedFor: consultantId }
      });
    } else {
      return res.status(400).json({ status: 'error', message: 'Invalid delete type' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error deleting message'
    });
  }
};