const express = require("express");
const router = express.Router();
const consultantController = require("../controllers/consultantController");

router.get("/email", consultantController.showEmailForm);
router.post("/email", consultantController.sendOTP);
router.get("/otp", consultantController.showOTPForm);
router.post("/otp", consultantController.verifyOTP);
router.get(
  "/register/basic-details",
  consultantController.showBasicDetailsForm
);
router.post("/register/basic-details", consultantController.handleBasicDetails);
router.get(
  "/register/additional-details",
  consultantController.showAdditionalDetailsForm
);
router.post(
  "/register/additional-details",
  consultantController.handleAdditionalDetails
);
router.get(
  "/register/critical-details",
  consultantController.showCriticalDetailsForm
);
router.post(
  "/register/critical-details",
  consultantController.handleCriticalDetails
);
router.get(
  "/register/payment-details",
  consultantController.showPaymentDetailsForm
);
router.get("/pic/:id",consultantController.getPicture);
router.post(
  "/register/payment-details",
  consultantController.handlePaymentDetails
);
router.get("/register/set-password", consultantController.showSetPasswordForm);
router.post("/register/set-password", consultantController.handleSetPassword);
router.post("/login", consultantController.login);
router.get("/home", consultantController.homepage);
//router.get("/home/consultations",consultantController.pendingConsultations);
//router.post("/home/consultations",videoCallChatController.acceptedConsultation);

router.post("/forgot-password", consultantController.forgotPassword);
router.get("/reset-password/:token", consultantController.verifyResetToken);
router.post("/reset-password/:token", consultantController.resetPassword);
router.patch("/password/create", consultantController.createPassword);

router.get("/dashboard", consultantController.dashboard);
router.get("/getConsultation", consultantController.getConsultation);
router.get("/consultationReport", consultantController.consultationReport);
router.get(
  "/consultationrequests/:consultantEmail",
  consultantController.consultationRequests
);
router.post("/consultationrequests/:requestId/accept", consultantController.acceptRequest);
//router.post("/consultationrequests/:requestId/decline", declineRequest);

router.get("/thankYou", consultantController.thankyou);
router.get("/thankyou/accepted", consultantController.showAcceptedThankYou);
router.post("/thankYou/accepted", consultantController.handleThankYouForm);
router.get("/thankyou/rejected", consultantController.showRejectedThankYou);
router.get("/contact", consultantController.contact);
router.get("/edit/basic-details", consultantController.showBasicDetailsForm1);
router.patch("/edit/basic-details", consultantController.updateBasicDetails);

router.get(
  "/edit/additional-details",
  consultantController.showBasicDetailsForm1
);
router.patch(
  "/edit/additional-details",
  consultantController.updateAdditionalDetails
);

router.get(
  "/edit/critical-details",
  consultantController.showBasicDetailsForm1
);
router.patch(
  "/edit/critical-details",
  consultantController.updateCriticalDetails
);

router.get(
  "/edit/payment-details",
  consultantController.showBasicDetailsForm1
);
router.patch(
  "/edit/payment-details",
  consultantController.updatePaymentDetails
);

router.get(
  "/profile-completion",
  consultantController.getProfileCompletionPercentage
);

router.get("/profile/reviews/:id", consultantController.getReviewsAndRating);
router.get(
  "/profile/consultations/upcoming/:id",
  consultantController.getUpcomingConsultations
);
router.get(
  "/profile/consultations/previous/:id",
  consultantController.getPreviousConsultations
);


router.get('/consultants/:id', consultantController.getConsultantInfo);
module.exports = router;

module.exports = router;
