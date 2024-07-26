const Consultant = require("../models/consultantschema");
const Review = require("../models/review");
const Consultation = require("../models/consultationschema");
const { GridFSBucket, MongoClient, ObjectID } = require("mongodb");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
const Request = require("../models/request");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const OTP = require("otp-generator");
const { response } = require("../app");
const stream = require("stream");
dotenv.config({ path: "./config.env" });
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
let token = "";
let newToken = "";

const sendEmailOTP = async (email, otp) => {
  const msg = {
    to: email,
    from: process.env.SENDER_EMAIL,
    subject: "WELCOME TO PLATO",
    text: `Your OTP for registration is ${otp}`,
  };

  try {
    await sgMail.send(msg);
    console.log("OTP sent successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Error sending OTP");
  }
};

exports.showEmailForm = (req, res) => {
  // Render the emailForm view from the htmlForms directory
  res.render("emailFormConsultant");
};

exports.sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email already exists in the database
    const existingConsultant = await Consultant.findOne({ email });
    
    if (existingConsultant) {
      // If the email already exists, send a response indicating that
      return res.status(400).json({ 
        error: "Email already registered", 
        message: "This email is already registered. Please sign in instead."
      });
    }

    // If the email doesn't exist, proceed with OTP generation and sending
    const otp = OTP.generate(6, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });

    await sendEmailOTP(email, otp);
    token = jwt.sign({ email, otp }, process.env.JWT_SECRET, { expiresIn: "5m" });
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing request");
  }
};

exports.showOTPForm = (req, res) => {
  res.render("otpFormConsultant");
};

exports.verifyOTP = (req, res) => {
  const { otp } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    if (decoded.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    } else {
      const newToken = jwt.sign({ email: decoded.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.status(200).json({ 
        message: "Verified successfully", 
        token: newToken,
        email: decoded.email
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error verifying OTP" });
  }
};
exports.getPicture = async (req, res) => {
  const consultantId = req.params.id;
  const consultant = await Consultant.find({ email: consultantId });
  res.status(200).json({ consultant });
};

exports.showBasicDetailsForm = (req, res) => {
  res.render("basicDetailsForm");
};

exports.handleBasicDetails = async (req, res) => {
  console.log(req.body);
  try {
    if (!token) {
      return res.status(401).send("Unauthorized access");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const email = decoded.email;
    console.log(email);

    const {
      firstName,
      lastName,
      contact,
      orgName,
      industry,
      designation,
      functionName,
      skills,
      yearsOfExperience,
      highestEducation,
      yearOfPassing,
      instituteName,
      photo,
    } = req.body;

    const existingUser = await Consultant.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send("User with provided contact or email already exists");
    }

    const basicDetails = {
      ...req.body,
    };

    const consultant = new Consultant({ basicdetails: [basicDetails], email });
    await consultant.save();
    res.status(200).json({ message: "Success" });

    console.log(consultant);

    // res.redirect('/register/additional-details');
  } catch (error) {
    console.error("Error handling basic details:", error);
    res.status(500).send("An error occurred while handling basic details");
  }
};

async function uploadFileToGridFS(base64Data, filename) {
  if (!base64Data) return null;

  try {
    const uri = "mongodb://admin:ALQ01jFH2763%5E2H@103.110.127.195:28029/";

    const client = new MongoClient(uri);

    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db();

    const bucket = new GridFSBucket(db);

    const buffer = Buffer.from(base64Data, "base64");

    const readableStream = new stream.PassThrough();
    readableStream.end(buffer);

    // Upload stream options
    const uploadStream = bucket.openUploadStream(filename);
    readableStream.pipe(uploadStream);

    return new Promise((resolve, reject) => {
      uploadStream.on("error", (error) => {
        console.error("Error uploading file to GridFS:", error);
        reject(error);
      });

      uploadStream.on("finish", () => {
        console.log("File uploaded successfully to GridFS", filename);

        resolve(uploadStream.id);
      });
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

exports.showAdditionalDetailsForm = async (req, res) => {
  const consultant = await Consultant.findOne({
    "basicdetails.contact": req.body.contact,
  });
  res.render("additionalDetailsForm", { consultant });
};

exports.handleAdditionalDetails = async (req, res) => {
  try {
    if (!token) {
      return res.status(401).send("Unauthorized access");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const email = decoded.email;
    console.log(email);

    const {
      aboutYourself,
      resumeAttachment,
      linkedinProfile,
      feePerSession,
      lastCTC,
      compensationDetails,
      appointmentLetter,
    } = req.body;

    let resumeFileId = null;
    let appointmentLetterFileId = null;
    let compensationDetailId = null;

    // Handle resume attachment if provided
    if (resumeAttachment) {
      const resumeBuffer = Buffer.from(resumeAttachment, "base64");
      resumeFileId = await uploadFileToGridFS(resumeBuffer);
    }

    if (compensationDetails) {
      const compensationBuffer = Buffer.from(compensationDetails, "base64");
      compensationDetailId = await uploadFileToGridFS(compensationBuffer);
    }

    console.log(compensationDetails);

    // Handle appointment letter if provided
    if (appointmentLetter) {
      const appointmentBuffer = Buffer.from(appointmentLetter, "base64");
      appointmentLetterFileId = await uploadFileToGridFS(appointmentBuffer);
    }

    console.log(appointmentLetter);

    const additionalDetails = {
      aboutYourself,
      resumeAttachment: resumeFileId,
      linkedinProfile,
      feePerSession,
      lastCTC,
      compensationDetails: compensationDetailId,
      appointmentLetter: appointmentLetterFileId,
    };
    console.log(additionalDetails);

    const consultant = await Consultant.findOne({ email });
    console.log(consultant);
    consultant.additionalDetails.push(additionalDetails);
    await consultant.save();
    res.status(200).json({ message: "Success" });

    // res.redirect('/register/critical-details');
  } catch (error) {
    console.error("Error handling additional details:", error);
    res.status(500).send("An error occurred while handling additional details");
  }
};

exports.showCriticalDetailsForm = async (req, res) => {
  const consultant = await Consultant.findOne({
    "basicdetails.contact": req.body.contact,
  });
  res.render("criticalDetailsForm", { consultant });
};

exports.handleCriticalDetails = async (req, res) => {
  try {
    if (!token) {
      return res.status(401).send("Unauthorized access");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const email = decoded.email;
    console.log(email);
    const { makeYourAvailability, provideTimeAvailability } = req.body;

    const criticalDetails = {
      makeYourAvailability,
      provideTimeAvailability,
    };

    const consultant = await Consultant.findOne({ email });
    consultant.criticalDetails.push(criticalDetails);
    await consultant.save();
    res.status(200).json({ message: "Success" });

    // res.redirect('/register/payment-details');
  } catch (error) {
    console.error("Error handling critical details:", error);
    res.status(500).send("An error occurred while handling critical details");
  }
};
exports.showPaymentDetailsForm = async (req, res) => {
  const consultant = await Consultant.findOne({
    "basicdetails.contact": req.body.contact,
  });
  res.render("paymentDetailsForm", { consultant });
};

exports.handlePaymentDetails = async (req, res) => {
  try {
    if (!token) {
      return res.status(401).send("Unauthorized access");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const email = decoded.email;
    console.log(email);
    const {
      bankAccountNumber,
      ifscCode,
      bankName,
      bankBranch,
      cancelledCheque,
      panNumber,
    } = req.body;

    let cancelledChequeFileId = null;

    // Handle resume attachment if provided
    if (cancelledCheque) {
      const chequeBuffer = Buffer.from(cancelledCheque, "base64");
      cancelledChequeFileId = await uploadFileToGridFS(chequeBuffer);
    }

    const paymentDetails = {
      bankAccountNumber,
      ifscCode,
      bankName,
      bankBranch,
      cancelledCheque: cancelledChequeFileId,
      panNumber,
    };

    const consultant = await Consultant.findOne({ email });
    consultant.paymentDetails.push(paymentDetails);
    await consultant.save();
    res.status(200).json({ message: "Success" });

    // res.redirect('/register/set-password');
  } catch (error) {
    console.error("Error handling payment details:", error);
    res.status(500).send("An error occurred while handling payment details");
  }
};

exports.showSetPasswordForm = async (req, res) => {
  const consultant = await Consultant.findOne({
    "basicdetails.contact": req.body.contact,
  });
  res.render("setPasswordForm", { consultant });
};

exports.handleSetPassword = async (req, res) => {
  try {
    if (!token) {
      return res.status(401).send("Unauthorized access");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const email = decoded.email;
    console.log(email);
    const { password } = req.body;
    const passwordDetails = {
      password: await bcrypt.hash(password, 10),
    };

    const consultant = await Consultant.findOne({ email });
    consultant.passwordDetails.push(passwordDetails);

    const isRegistrationComplete =
      consultant.basicdetails.length > 0 &&
      consultant.basicdetails.every(
        (detail) =>
          detail.firstName &&
          detail.lastName &&
          detail.contact &&
          detail.orgName &&
          detail.industry &&
          detail.designation &&
          detail.functionName &&
          detail.skills &&
          detail.yearsOfExperience &&
          detail.highestEducation &&
          detail.yearOfPassing &&
          detail.instituteName &&
          detail.photo
      ) &&
      consultant.additionalDetails.length > 0 &&
      consultant.additionalDetails.every(
        (detail) =>
          detail.aboutYourself &&
          detail.resumeAttachment &&
          detail.linkedinProfile &&
          detail.feePerSession &&
          detail.lastCTC &&
          detail.compensationDetails &&
          detail.appointmentLetter
      ) &&
      consultant.criticalDetails.length > 0 &&
      consultant.criticalDetails.every(
        (detail) =>
          detail.makeYourAvailability && detail.provideTimeAvailability
      ) &&
      consultant.paymentDetails.length > 0 &&
      consultant.paymentDetails.every(
        (detail) =>
          detail.bankAccountNumber &&
          detail.ifscCode &&
          detail.bankName &&
          detail.bankBranch &&
          detail.cancelledCheque &&
          detail.panNumber
      ) &&
      consultant.passwordDetails.length > 0 &&
      consultant.passwordDetails.every((detail) => detail.password);

    if (isRegistrationComplete) {
      consultant.registrationStatus = "completed";
    }

    await consultant.save();
    res.status(200).json({ message: "Success" });

    // res.redirect('/registration-success');
  } catch (error) {
    console.error("Error handling set password:", error);
    res.status(500).send("An error occurred while handling set password");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const consultant = await Consultant.findOne({ email });
    console.log(consultant);
    const _id = { consultant };

    if (!consultant) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check if passwordDetails exists and has at least one element
    if (
      !consultant.passwordDetails ||
      consultant.passwordDetails.length === 0
    ) {
      return res.status(401).json({ error: "Password details not found" });
    }

    const storedPassword = consultant.passwordDetails[0].password;

    const isMatch = await bcrypt.compare(password, storedPassword);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    } else {
      const loginToken = jwt.sign({ email, _id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      console.log(loginToken);
      res.status(200).json({
        message: "Login successful",
        token: loginToken,
        id: consultant._id,
      });
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.verifyToken = (req, res, next) => {
  const token = req.headers["consultantAuthorization"];
  console.log("Authorization Header:", token);
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const bearerToken = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

exports.getReviewsAndRating = async (req, res) => {
  const consultantId = req.params.id;
  try {
    const reviews = await Review.find({ consultantId }).populate(
      "userId",
      "firstName lastName email"
    );

    if (!reviews.length) {
      return res
        .status(404)
        .json({ message: "No reviews found for this consultant" });
    }

    // Divide the ratings by 1, 2, 3, 4, 5 and count them
    const ratings = { 1: [], 2: [], 3: [], 4: [], 5: [] };
    const ratingsCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    reviews.forEach((review) => {
      if (ratings[review.rating]) {
        ratings[review.rating].push(review);
        ratingsCount[review.rating] += 1;
      }
    });

    res.status(200).json({ ratings, ratingsCount, reviews });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getUpcomingConsultations = async (req, res) => {
  const consultantId = req.params.id;
  const todayDate = new Date();
  try {
    const consultations = await Consultation.find({ consultantId }).populate(
      "userId",
      "firstName lastName email"
    );
    const upcomingConsultations = consultations.filter(
      (consultation) => new Date(consultation.date) > todayDate
    );
    res.status(200).json({ upcomingConsultations });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getPreviousConsultations = async (req, res) => {
  const consultantId = req.params.id;
  const todayDate = new Date();
  try {
    const consultations = await Consultation.find({ consultantId }).populate(
      "userId",
      "firstName lastName email"
    );
    const previousConsultations = consultations.filter(
      (consultation) => new Date(consultation.date) < todayDate
    );
    res.status(200).json({ previousConsultations });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.homepage = (req, res) => {
  res.render("homePage");
};

exports.dashboard = (req, res) => {
  try {
    res.status(200).json({ message: "navigated to user home page" });
    //  res.redirect("dashboard");
  } catch (error) {
    console.error("Error fetching consultations:", error);
    res.status(500).json({ error: "Error fetching consultations" });
  }
};

exports.contact = (req, res) => {
  try {
    res.status(200).json({ message: "navigated to contact page" });
    // res.redirect("contact");
  } catch (error) {
    console.error("Error fetching consultations:", error);
    res.status(500).json({ error: "Error fetching consultations" });
  }
};

exports.getConsultation = async (req, res) => {
  try {
    res.status(200).json({ message: "Consultations fetched successfully" });
  } catch (error) {
    console.error("Error fetching consultations:", error);
    res.status(500).json({ error: "Error fetching consultations" });
  }
};

exports.consultationReport = async (req, res) => {
  try {
    res.status(200).json({ message: "Consultations fetched successfully" });
  } catch (error) {
    console.error("Error fetching consultations:", error);
    res.status(500).json({ error: "Error fetching consultations" });
  }
};

exports.thankyou = async (req, res) => {
  try {
    res.status(200).json({ message: "Thankyou page fetched successfully" });
    //res.redirect("thankYou");
  } catch (error) {
    console.error("Error fetching consultations:", error);
    res.status(500).json({ error: "Error fetching consultations" });
  }
};

exports.showAcceptedThankYou = async (req, res) => {
  try {
    res.status(200).json({ message: "Thankyou page fetched successfully" });
    //res.redirect("thankYou");
  } catch (error) {
    console.error("Error fetching consultations:", error);
    res.status(500).json({ error: "Error fetching consultations" });
  }
};

exports.handleThankYouForm = (req, res) => {
  const { name } = req.body;
  //res.render('thankYou', { name });
  try {
    res.status(200).json({ message: `Your request accepted by ${name}` });
  } catch (error) {
    console.error("Error handling Thank You form:", error);
    res.status(500).json({ error: "Error handling Thank You form" });
  }
};

exports.showRejectedThankYou = async (req, res) => {
  try {
    res.status(200).json({ message: "Thankyou page fetched successfully" });
    //res.redirect("thankYou");
  } catch (error) {
    console.error("Error fetching consultations:", error);
    res.status(500).json({ error: "Error fetching consultations" });
  }
};

exports.showBasicDetailsForm1 = async (req, res) => {
  try {
    const email = req.headers["email"]; // Getting email from the request headers
    const consultant = await Consultant.find({ email:email });
    if (!consultant) {
      return res.status(404).json({ error: "Consultant not found" });
    }
    console.log("It has been hit");
    res.json({ consultant });
  } catch (error) {
    console.error("Error fetching consultant details:", error);
    res.status(500).json({ error: "Error fetching consultant details" });
  }
};

exports.updateBasicDetails = async (req, res) => {
  console.log(req);
  try {
    const email = req.headers["email"];
    const {
      firstName,
      lastName,
      contact,
      organizationName,
      industry,
      designation,
      function1,
      skills,
      experience,
      educationQualification,
      yearOfPassing,
      instituteName,
      photo,
    } = req.body;
    const consultant = await Consultant.find({ email:email });

    if (!consultant) {
      return res.status(404).json({ error: "Consultant not found" });
    }

    consultant.basicdetails[0].firstName = firstName;
    consultant.basicdetails[0].lastName = lastName;
    consultant.basicdetails[0].contact = contact;
    consultant.basicdetails[0].organizationName = organizationName;
    consultant.basicdetails[0].industry = industry;
    consultant.basicdetails[0].designation = designation;
    consultant.basicdetails[0].function1 = function1;
    consultant.basicdetails[0].skills = skills;
    consultant.basicdetails[0].experience = experience;
    consultant.basicdetails[0].educationQualification = educationQualification;
    consultant.basicdetails[0].yearOfPassing = yearOfPassing;
    consultant.basicdetails[0].instituteName = instituteName;
    if (photo) {
      consultant.basicdetails[0].photo = photo;
    }

    // Handle photo update if it exists

    await consultant.save();
    res.redirect("/edit/additional-details");
  } catch (error) {
    console.error("Error updating basic details:", error);
    res.status(500).json({ error: "Error updating basic details" });
  }
};

exports.showAdditionalDetailsForm1 = async (req, res) => {
  try {
    const email = req.headers["email"]; // Getting email from the request headers
    const consultant = await Consultant.find({ email:email });
    if (!consultant) {
      return res.status(404).json({ error: "Consultant not found" });
    }
    console.log("It has been hit");
    res.json({ consultant });
  } catch (error) {
    console.error("Error fetching consultant details:", error);
    res.status(500).json({ error: "Error fetching consultant details" });
  }
};

exports.updateAdditionalDetails = async (req, res) => {
  try {
    const email = req.headers["email"];
    const { aboutYourself, linkedinProfile, feePerSession } = req.body;
    const consultant = await Consultant.findOne({ email:email });

    if (!consultant) {
      return res.status(404).json({ error: "Consultant not found" });
    }

    consultant.additionalDetails[0].aboutYourself = aboutYourself;
    consultant.additionalDetails[0].linkedinProfile = linkedinProfile;
    consultant.additionalDetails[0].feePerSession = feePerSession;

    // Handle resume update if it exists
    if (req.files && req.files["resume"]) {
      const resume = req.files["resume"][0];
      const resumeId = await uploadFileToGridFS(resume);
      consultant.resume = resumeId;
    }

    await consultant.save();
    res.redirect("/edit/critical-details");
  } catch (error) {
    console.error("Error updating additional details:", error);
    res.status(500).json({ error: "Error updating additional details" });
  }
};

exports.showCriticalDetailsForm1 = async (req, res) => {
  try {
    const email = req.headers["email"]; // Getting email from the request headers
    const consultant = await Consultant.find({ email:email });
    if (!consultant) {
      return res.status(404).json({ error: "Consultant not found" });
    }
    res.json({ consultant });
  } catch (error) {
    console.error("Error fetching consultant details:", error);
    res.status(500).json({ error: "Error fetching consultant details" });
  }
};

exports.updateCriticalDetails = async (req, res) => {
  try {
    const email = req.headers["email"];
    const { makeYourAvailability, provideTimeAvailability } = req.body;
    const consultant = await Consultant.find({ email:email });

    if (!consultant) {
      return res.status(404).json({ error: "Consultant not found" });
    }

    consultant.criticalDetails[0].makeYourAvailability = makeYourAvailability;
    consultant.criticalDetails[0].provideTimeAvailability =
      provideTimeAvailability;

    await consultant.save();
    res.redirect("/edit/payment-details");
  } catch (error) {
    console.error("Error updating critical details:", error);
    res.status(500).json({ error: "Error updating critical details" });
  }
};

exports.showPaymentDetailsForm1 = async (req, res) => {
  try {
    const email = req.headers["email"]; // Getting email from the request headers
    const consultant = await Consultant.find({ email });
    if (!consultant) {
      return res.status(404).json({ error: "Consultant not found" });
    }
    res.json({ consultant });
  } catch (error) {
    console.error("Error fetching consultant details:", error);
    res.status(500).json({ error: "Error fetching consultant details" });
  }
};

exports.updatePaymentDetails = async (req, res) => {
  try {
    const email = req.headers["email"];
    const {
      bankAccountNumber,
      IFSC,
      bankName,
      branchAddress,
      cancelledChequeCopy,
      PANNumber,
    } = req.body;
    const consultant = await Consultant.find({ email:email });

    if (!consultant) {
      return res.status(404).json({ error: "Consultant not found" });
    }

    consultant.paymentDetails[0].bankAccountNumber = bankAccountNumber;
    consultant.paymentDetails[0].IFSC = IFSC;
    consultant.paymentDetails[0].bankName = bankName;
    consultant.paymentDetails[0].branchAddress = branchAddress;

    // Handle cancelled cheque update if it exists
    if (req.files && req.files["cancelledCheque"]) {
      const cancelledCheque = req.files["cancelledCheque"][0];
      const cancelledChequeId = await uploadFileToGridFS(cancelledCheque);
      consultant.paymentDetails[0].cancelledChequeCopy = cancelledChequeId;
    }

    consultant.paymentDetails[0].PANNumber = PANNumber;

    await consultant.save();
    res.redirect("/profile-completion");
  } catch (error) {
    console.error("Error updating payment details:", error);
    res.status(500).json({ error: "Error updating payment details" });
  }
};

const calculateCompletionPercentage = (consultant) => {
  const totalFields = 23;
  let filledFields = 0;

  const basicDetailsFields = [
    "firstName",
    "lastName",
    "contact",
    "organizationName",
    "industry",
    "designation",
    "function1",
    "skills",
    "experience",
    "educationQualification",
    "yearOfPassing",
    "instituteName",
  ];

  if (consultant.basicdetails.length > 0) {
    const basicDetails = consultant.basicdetails[0];
    basicDetailsFields.forEach((field) => {
      if (basicDetails[field]) {
        filledFields += 1;
      }
    });
  }

  // Additional Details
  const additionalDetailsFields = [
    "aboutYourself",
    "linkedinProfile",
    "feePerSession",
    "resume",
  ];

  if (consultant.additioanlDetails.length > 0) {
    const additionalDetails = consultant.additioanlDetails[0];
    additionalDetailsFields.forEach((field) => {
      if (additionalDetails[field]) {
        filledFields += 1;
      }
    });
  }

  const criticalDetailsFields = [
    "makeYourAvailability",
    "provideTimeAvailability",
  ];

  if (consultant.criticalDetails.length > 0) {
    const criticalDetails = consultant.criticalDetails[0];
    criticalDetailsFields.forEach((field) => {
      if (criticalDetails[field]) {
        filledFields += 1;
      }
    });
  }

  const paymentDetailsFields = [
    "bankAccountNumber",
    "IFSC",
    "bankName",
    "branchAddress",
    "cancelledChequeCopy",
    "PANNumber",
  ];

  if (consultant.paymentDetails.length > 0) {
    const paymentDetails = consultant.paymentDetails[0];
    paymentDetailsFields.forEach((field) => {
      if (paymentDetails[field]) {
        filledFields += 1;
      }
    });
  }

  return (filledFields / totalFields) * 100;
};

exports.getProfileCompletionPercentage = async (req, res) => {
  const email = req.headers["email"];

  try {
    const consultant = await Consultant.findOne({ email });

    if (!consultant) {
      return res.status(404).json({ error: "Consultant not found" });
    }

    const completionPercentage = calculateCompletionPercentage(consultant);
    return res.status(200).json({ completionPercentage });
  } catch (error) {
    console.error("Error getting profile completion percentage:", error);
    return res
      .status(500)
      .json({ error: "Error getting profile completion percentage" });
  }
};

const sendPasswordResetLink = async (email, resetToken) => {
  const resetUrl = `http://localhost:3000/consultant/create-password/${resetToken}`;

  const msg = {
    to: email,
    from: process.env.SENDER_EMAIL,
    subject: "Password Reset Request",
    html: `
      <p>You requested a password reset</p>
      <p>Click this <a href="${resetUrl}">link</a> to set a new password.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("Password reset link sent successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Error sending password reset link");
  }
};

const crypto = require("crypto");
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const consultant = await Consultant.findOne({ email });
    if (!consultant) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    consultant.resetPasswordToken = resetToken;
    consultant.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await consultant.save();

    // Send email
    await sendPasswordResetLink(consultant.email, resetToken);

    res.status(200).json({ message: "Reset link sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in forgot password process" });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const consultant = await Consultant.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!consultant) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    consultant.password = hashedPassword;
    consultant.resetPasswordToken = undefined;
    consultant.resetPasswordExpires = undefined;
    await consultant.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error resetting password" });
  }
};

exports.verifyResetToken = async (req, res) => {
  const { token } = req.params;

  try {
    const consultant = await Consultant.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!consultant) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    res.status(200).json({ message: "Token is valid" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error verifying token" });
  }
};
exports.createPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find the consultant by email
    const consultant = await Consultant.findOne({ email });

    if (!consultant) {
      return res.status(404).json({ message: "Consultant not found" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the consultant's password
    consultant.passwordDetails = [{ password: hashedPassword }];
    consultant.registrationStatus = "completed"; // Optionally update registration status

    // Save the updated consultant
    await consultant.save();

    res.status(200).json({ message: "Password created successfully" });
  } catch (error) {
    console.error("Error in createPassword:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.consultationRequests = async (req, res) => {
  try {
    // Use the consultant email attached by the middleware
    const { consultantEmail } = req.params;
    console.log(consultantEmail);
    const requests = await Request.find({
      consultantEmail,
      status: "pending",
      AcceptedBy: "",
    });
    console.log(requests);
    console.log("This api has been hit");
    res.json(requests);
    // res.render("consultantHomePage", { requests }); // Render the page with requests data
  } catch (error) {
    console.error("Error fetching consultation requests:", error);
    res
      .status(500)
      .send("An error occurred while fetching consultation requests");
  }
};

exports.acceptRequest = async (req, res) => {
  const requestId = req.params.requestId;
  const { customerEmail, consultantEmail } = req.body;
  console.log(requestId);
  console.log("accept hitted");
  try {
    // Find the request by ID
    const request = await Request.findById(requestId);
    console.log(requestId);
    // Update request status to "Accepted" and save the consultant's email
    request.status = "Accepted";
    request.AcceptedBy = consultantEmail;
    await request.save();

    // Create a new consultation record
    console.log(requestId);
    const newConsultation = new Consultation({
      userId: customerEmail, // Assuming customerId is stored in the Request model
      consultantId: consultantEmail,
      date: new Date(), // Set the date to current date/time or as per your logic
      duration: "60", // Assuming duration is stored in the Request model
      industry: request.industry, // Assuming industry is stored in the Request modell
      functionName: request.functionName, // Assuming functionName is stored in the Request model
      expertiseArea: request.expertise, // Assuming expertiseArea is stored in the Request model
      additionalInformation: request.additionalInformation, // Assuming additionalInformation is stored in the Request model
      consultationTopic: request.consultationTopic,
    });

    console.log("this happened");

    // Save the new consultation
    await newConsultation.save();

    // Respond with success message
    res.status(200).json({ message: "Request accepted", requestId });
  } catch (error) {
    console.error("Error accepting request:", error);
    res.status(500).send("An error occurred while accepting the request");
  }
};

// Controller function to handle declining a consultation request
exports.declineRequest = async (req, res) => {
  const requestId = req.params.requestId;

  try {
    const request = await Request.findById(requestId);
    // Process decline logic (e.g., update status, notify user, etc.)
    request.status = "pending";
    await request.save();

    res.redirect("/consultant/consultationrequests"); // Redirect back to the consultation requests page
  } catch (error) {
    console.error("Error declining request:", error);
    res.status(500).send("An error occurred while declining the request");
  }
};



exports.getConsultantInfo = async (req, res) => {
  try {
    const email = req.headers['email'];
    const consultant = await Consultant.findOne({ email });
    if (!consultant) {
      return res.status(404).json({ message: 'Consultant not found' });
    }
    res.status(200).json(consultant);
  } catch (error) {
    console.error('Error fetching consultant info:', error);
    res.status(500).json({ message: 'Server error' });
  }
};