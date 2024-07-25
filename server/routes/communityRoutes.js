const express = require('express');
const communityController = require('../controllers/communityController');

const router = express.Router();

router.post('/messages', communityController.postMessage);
router.get('/messages', communityController.getMessages);
router.get('/files/:fileId', communityController.getFile);

module.exports = router;