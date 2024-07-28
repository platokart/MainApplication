const express = require('express');
const communityController = require('../controllers/communityController');

const router = express.Router();

router.post('/messages', communityController.postMessage);
router.get('/messages', communityController.getMessages);
router.get('/files/:fileId', communityController.getFile);
router.get('/lastviewed', communityController.getLastViewedTime);
router.post('/lastviewed', communityController.updateLastViewedTime);
router.post('/messages/delete', communityController.deleteMessage);

module.exports = router;