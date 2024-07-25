const express = require("express");
const router = express.Router();
const Customer = require("../models/customerschema");

// const paymentController = require("../controllers/paymentController");
const customerController = require("../controllers/customerController");
const paymentController = require("../controllers/paymentController");
router.get("/email", customerController.showEmailForm);
router.post("/email", customerController.sendOTP);
router.get("/otp", customerController.showOTPForm);
router.post("/otp", customerController.verifyOTP);
router.get("/register", customerController.showRegistrationForm);
router.post("/register", customerController.registerCustomer);
router.post("/register-password", customerController.setPassword);
router.post("/login", customerController.login);
router.get("/home", customerController.homepage);

router.get("/edit/basic-details", customerController.showBasicDetailsForm);
router.patch("/edit/basic-details", customerController.updateBasicDetails);

router.get("/home/about", customerController.getAboutUsPage);
router.get("/home/about/articles", customerController.getArticlePage);
router.get("/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;
    const customer = await Customer.findOne({ _id: customerId });

    if (!customer) {
      return res.status(404).send({ message: "Customer not found" });
    }

    res.send(customer);
    console.log(customer);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get(
  "/home/about/articles/:articleId",
  customerController.getArticleById
);
router.post(
  "/home/about/articles/:articleId/comment",
  customerController.postCommentsOnArticle
);
router.post(
  "/home/about/articles/:articleId/:commentId/reply",
  customerController.replyToComment
);

router.get("/home/explore/:id", customerController.consultationRequest);
router.post("/home/explore", customerController.searchConsultants);

router.post("/home/explore/reduce-credit", customerController.reduceCredit);

router.get(
  "/home/seek-consultation/industry/:industry",
  customerController.getIndustryConsultants
);
//add routes similarly
router.get(
  "/home/seek-consultation/expertise/:expertise",
  customerController.getExpertiseConsultants
);
router.get(
  "/home/seek-consultation/function/:function",
  customerController.getFunctionConsultants
);

router.get("/home/get-consultation", customerController.getConsultationForm);

router.post("/home/get-consultation", customerController.showTopConsultants);
//router.get("/home/get-consultation/explore-now",customerController.consultationRequest);
//router.post(
//  "/home/get-consultation/:consultantId/consult-now",
//  customerController.scheduleConsultation
//);
router.get(
  "/home/get-consultation/:consultantId/view-details",
  customerController.getConsultantDetails
);
router.post(
  "/home/get-consultation/:customerId/view-details/:consultantId/consult-now",
  customerController.scheduleConsultation
);
// router.get(
//   "/home/upcoming/:consultantId",
//   customerController.getScheduledConsultation
// );  problamatic

// router.get("/subscription-page", paymentController.paymentForm);
// router.post("/subscription-page", paymentController.basicRazorPay);
// router.post(
//   "/subscription-page/verify-payment",
//   paymentController.verifyPayment
// );

// router.get(
//   "/profile/edit/user-details/:id",
//   customerController.showBasicUserDetails
// );  problamatic
router.patch(
  "/profile/edit/user-details",
  customerController.updateUserDetails
);

router.get(
  "/profile/consultations/upcoming/:id",
  customerController.getUpcomingConsultations
);
router.get(
  "/profile/consultations/previous/:id",
  customerController.getPreviousConsultations
);

router.get("/profile/my-plans", paymentController.invoices);
// Fetch current plan
// router.get("/Myplan/:userId", paymentController.myPlan);

// Fetch invoice history
// router.get("/invoices/:userId", paymentController.invoices);

router.post("/forgot-password", customerController.forgotPassword);
//router.get("/reset-password/:token", customerController.verifyResetToken);
router.post("/reset-password/:token", customerController.resetPassword);
router.patch("/password/create", customerController.createPassword);

module.exports = router;
