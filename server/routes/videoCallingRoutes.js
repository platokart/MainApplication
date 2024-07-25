const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const videoCallChatController = require("../controllers/videoCallChatController");

router.get("/:customerId/video/:consultantId", videoCallChatController.acceptedConsultation);
router.get("/:customerId/my-chats", videoCallChatController.getMessagesforUser);
router.post("/:customerId/rating/:consultantId",videoCallChatController.postReviewRating);
//router.post("/report/:id",videoCallChatController.reportAbuse);
//router.post("/report-issue/:id",videoCallChatController.reportIssue);
module.exports = router;
