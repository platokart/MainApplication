const Customer = require("../models/customerschema");
const Review = require("../models/review");
const Articles = require("../models/articleschema");
const Consultant = require("../models/consultantschema");
const Consultation = require("../models/consultationschema");
const sgMail = require("@sendgrid/mail");
const bcrypt = require("bcrypt");
const OTP = require("otp-generator");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Request = require("../models/request");

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

const sendEmailToConsultant = async (email, message) => {
  const msg = {
    to: email,
    from: process.env.SENDER_EMAIL,
    subject: "You have got a customer",
    text: message,
  };
};

exports.showEmailForm = (req, res) => {
  // Render the emailForm view from the htmlForms directory
  res.render("emailFormConsultant");
};

exports.sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email already exists in the database
    const existingConsultant = await Customer.findOne({ email });
    console.log(existingConsultant);
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
      const newToken = jwt.sign(
        { email: decoded.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        message: "Verified successfully",
        token: newToken,
        email: decoded.email,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error verifying OTP" });
  }
};

exports.showRegistrationForm = (req, res) => {
  res.send("registrationForm");
};

exports.registerCustomer = async (req, res) => {
  try {
    if (!token) {
      return res.status(401).send("Unauthorized access");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const email = decoded.email;
    console.log(email);

    const {
      companyName,
      industry,
      companyType,
      fundingStage,
      companyFounded,
      numberOfEmployees,
      headquarterLocation,
      numberOfOfferings,
      companyWebsite,
      contact,
    } = req.body;

    const existingUser = await Customer.findOne({
      email,
    });
    if (existingUser) {
      return res
        .status(400)
        .send("User with provided email or contact already exists");
    }

    const basicDetails = {
      companyName,
      industry,
      companyType,
      fundingStage,
      companyFounded,
      numberOfEmployees,
      headquarterLocation,
      numberOfOfferings,
      companyWebsite,
      contact,
      email,
    };

    console.log(basicDetails);
    const customer = new Customer({ basicdetails: [basicDetails], email });
    await customer.save();
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("Error registering customer:", error.message);
    res.status(500).send("An error occurred while registering the customer");
  }
};

exports.setPassword = async (req, res) => {
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

    const customer = await Customer.findOne({ email });
    customer.passwordDetails.push(passwordDetails);

    await customer.save();
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
    const customer = await Customer.findOne({ email });
    const _id = { customer };
    if (!customer) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    if (!customer.passwordDetails || customer.passwordDetails.length === 0) {
      return res.status(401).json({ error: "Password details not found" });
    }

    const storedPassword = customer.passwordDetails[0].password;

    const isMatch = await bcrypt.compare(password, storedPassword);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    } else {
      const loginToken = jwt.sign({ email, _id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({
        message: "Login successful",
        token: loginToken,
        id: customer._id,
      });
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
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

exports.showBasicDetailsForm = async (req, res) => {
  try {
    const email = req.headers["email"]; // Getting email from the request headers
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({ error: "customer not found" });
    }
    res.status(200).json({ customer });
  } catch (error) {
    console.error("Error fetching customer details:", error);
    res.status(500).json({ error: "Error fetching customer details" });
  }
};

exports.updateBasicDetails = async (req, res) => {
  try {
    const {
      companyName,
      industry,
      companyType,
      fundingStage,
      companyFounded,
      numberOfEmployees,
      headquarterLocation,
      numberOfOfferings,
      companyWebsite,
      contact,
      email,
    } = req.body;
    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(404).json({ error: "customer not found" });
    }

    customer.basicdetails[0].companyName = companyName;
    customer.basicdetails[0].industry = industry;
    customer.basicdetails[0].companyType = companyType;
    customer.basicdetails[0].fundingStage = fundingStage;
    customer.basicdetails[0].companyFounded = companyFounded;
    customer.basicdetails[0].numberOfEmployees = numberOfEmployees;
    customer.basicdetails[0].headquarterLocation = headquarterLocation;
    customer.basicdetails[0].numberOfOfferings = numberOfOfferings;
    customer.basicdetails[0].companyWebsite = companyWebsite;
    customer.basicdetails[0].contact = contact;
    customer.basicdetails[0].email = email;

    await customer.save();
  } catch (error) {
    console.error("Error updating basic details:", error);
    res.status(500).json({ error: "Error updating basic details" });
  }
};

exports.homepage = (req, res) => {
  res.render("homePage");
};

exports.getAboutUsPage = (req, res) => {
  res.render("aboutUs");
};

exports.getArticlePage = async (req, res) => {
  try {
    const articles = await Articles.find();
    res.status(200).send({ ok: true, articles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getArticleById = async (req, res) => {
  const articleId = req.params.articleId;
  console.log(articleId);
  try {
    const article = await Articles.findById(articleId); // Corrected: Changed findOne to findById
    let commentMsg;
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    // Assuming you also need to fetch comments here; modify as needed
    const comments = await Comment.find({ articleId: articleId }).populate('Replies');
    if(!comments){
      return res.status(201).json({message : "No Comments Yet"});
    }
    article.comments = comments; // Attach comments to the article object
    console.log(article);
    res.status(200).send({ok:true,article,comments});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.postCommentsOnArticle = async (req, res) => {
  const { content,userId,articleId } = req.body;
  console.log(req.body)
  try {
    const user = await Customer.findById(userId);
    console.log(user);
    const newComment = new Comment({
      // Corrected: Changed newComment to new Comment
      articleId: articleId,
      author: user.email,
      content,
    });
    await newComment.save();
    // res.redirect(`/home/about/articles/${req.params.articleId}`); // Corrected: Changed single quotes to backticks for template string
    res.status(200).send({ok:true, message:"Comment Posted Successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.replyToComment = async (req, res) => {
  const { content, userId, articleId, commentId } = req.body;
  try {
    const user = await Customer.findById(userId);
    console.log(userId);
    console.log(user);
    const newReply = new Reply({
      articleId: articleId,
      author: user.email,
      content,
      parentId: req.params.commentId,
    });

    await newReply.save();

    const comment = await Comment.findById(req.params.commentId);
    console.log(comment);

    comment.Replies.push(newReply);
    console.log(comment);
    await comment.save();
    
    // await Comment.findByIdAndUpdate(commentId, {
    //   $push: { Replies: newReply._id }
    // });

    res.status(200).send({ ok: true, message: "Reply for the comment successfully posted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchConsultants = async (req, res) => {
  const {
    industry,
    functionName,
    expertiseArea,
    additionalInformation,
    consultationTopic,
    customerEmail,
  } = req.body;

  try {
    const matchingConsultants = await Consultant.find({
      "basicdetails.industry.value": industry,
      "basicdetails.functionName": functionName,
      "basicdetails.skills.value": expertiseArea,
    });

    if (matchingConsultants.length === 0) {
      return res.status(404).send("No consultants found matching the criteria");
    }

    const userRequest = `Industry: ${industry}, Function: ${functionName}, Expertise: ${expertiseArea}, Additional Information ${additionalInformation}`;
    const requestIds = [];

    for (const consultant of matchingConsultants) {
      await sendEmailToConsultant(consultant.email, userRequest);
      const newRequest = await Request.create({
        industry,
        functionName,
        expertise: expertiseArea,
        additionalInformation,
        consultationTopic,
        customerEmail: customerEmail,
        consultantEmail: consultant.email,
      });
      requestIds.push(newRequest._id);
    }

    const checkStatus = async () => {
      for (const requestId of requestIds) {
        const request = await Request.findById(requestId);
        if (request.status === "Accepted") {
          return request; // Return the accepted request
        }
      }
      return null; // No accepted requests found
    };

    const checkRequestsStatus = async (resolve, reject) => {
      const startTime = Date.now();
      const interval = 5000; // Check every 5 seconds

      const intervalId = setInterval(async () => {
        const acceptedRequest = await checkStatus();
        if (acceptedRequest) {
          clearInterval(intervalId);
          resolve(acceptedRequest);
        } else if (Date.now() - startTime >= 60000) {
          // 1 minute timeout
          clearInterval(intervalId);
          resolve(null);
        }
      }, interval);
    };

    const acceptedRequest = await new Promise(checkRequestsStatus);

    if (acceptedRequest) {
      console.log(acceptedRequest);
      const email = acceptedRequest.AcceptedBy;
      for (const requestId of requestIds) {
        const request = await Request.findById(requestId);
        if (request !== acceptedRequest) {
          request.AcceptedBy = email;
          request.status = "Accepted";
          await request.save();
        }
      }
      const consultant = await Consultant.find({ email });
      res.status(200).json(consultant);
    } else {
      return res.status(404).send("No consultants found matching the criteria"); // No requests accepted
    }
  } catch (error) {
    console.error("Error searching consultants:", error);
    res.status(500).send("An error occurred while searching for consultants");
  }
};

exports.getIndustryConsultants = async (req, res) => {
  try {
    const consultantIndustry = req.params.industry;
    const consultants = await Consultant.find({
      "basicdetails.industry": {
        $elemMatch: {
          value: consultantIndustry,
        },
      },
    });

    if (consultants.length === 0) {
      return res
        .status(404)
        .send("No consultants found with the specified industry");
    }

    res.status(200).json(consultants);
  } catch (error) {
    console.error("Error fetching consultants:", error.message);
    res.status(500).send("An error occurred while fetching the consultants");
  }
};

//for other categories.......

exports.getFunctionConsultants = async (req, res) => {
  try {
    const consultantFunction = req.params.function;
    console.log("Requested function:", consultantFunction);

    const consultants = await Consultant.find({
      "basicdetails.functionName": consultantFunction,
    });
    console.log("Found consultants:", consultants);

    if (consultants.length === 0) {
      return res
        .status(404)
        .json({ message: "No consultants found with the specified function" });
    }

    res.status(200).json(consultants);
  } catch (error) {
    console.error("Error fetching consultants:", error);
    res.status(500).json({
      message: "An error occurred while fetching the consultants",
      error: error.message,
    });
  }
};

exports.getExpertiseConsultants = async (req, res) => {
  try {
    const consultantExpertise = req.params.expertise;
    const consultants = await Consultant.find({
      "basicdetails.skills": {
        $elemMatch: {
          value: consultantExpertise,
        },
      },
    });

    if (consultants.length === 0) {
      return res
        .status(404)
        .send("No consultants found with the specified expertise");
    }

    res.status(200).json(consultants);
  } catch (error) {
    console.error("Error fetching consultants:", error.message);
    res.status(500).send("An error occurred while fetching the consultants");
  }
};
exports.consultationRequest = async (req, res) => {
  const customerId = req.params.id;

  try {
    // Find the customer by their ID
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (customer.credits >= 1) {
      res.status(200).json({ message: "Consultation request form" });
      //consultation request form data here
    } else {
      res.status(202).json({ message: "Subscription form" });
      //send the subscription form
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.showUserDetails = async (req, res) => {
  const customerId = req.params.id;

  try {
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: "Consultant not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateUserDetails = async (req, res) => {
  const {
    id,
    firstName,
    lastName,
    email,
    contact,
    companyName,
    industry,
    functions,
    jobLevel,
  } = req.body;
  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    if (firstName) {
      customer.firstName = firstName;
    }
    if (lastName) {
      customer.lastName = lastName;
    }
    if (email) {
      customer.email = email;
    }
    if (contact) {
      customer.contact = contact;
    }
    if (companyName) {
      customer.companyName = companyName;
    }
    if (industry) {
      customer.industry = industry;
    }
    if (functions) {
      customer.functions = functions;
    }
    if (jobLevel) {
      customer.jobLevel = jobLevel;
    }
    await customer.save();
    res
      .status(200)
      .json({ message: "Customer details updated successfully", customer });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getConsultationForm = async (req, res) => {
  res.send("consultation-form");
};

exports.showTopConsultants = async (req, res) => {
  try {
    const consultants = await Consultant.find().sort({ ratings: -1 }); // Sort by rating in descending order
    res.json(consultants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.showUserDetails = async (req, res) => {
  const customerId = req.params.id;

  try {
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: "Consultant not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.scheduleConsultation = async (req, res) => {
  const customerId = req.params.customerId;
  const consultantId = req.params.consultantId;
  const { dateTime } = req.body; // Assuming date and other details come from the request body
  console.log(dateTime);
  console.log(`Customer ID: ${customerId}`);
  console.log(`Consultant ID: ${consultantId}`);

  try {
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (customer.credits >= 1) {
      // Deduct credits from customer
      customer.credits -= 1;
      await customer.save(); // Save the updated customer document

      // Create consultation document
      const newConsultation = new Consultation({
        userId: customerId, // Assuming this is how you identify the customer
        consultantId,
        date: dateTime,
      });

      // Save consultation to the database
      await newConsultation.save();

      // Respond with scheduling form message
      return res
        .status(200)
        .json({ message: "Please fill out the scheduling time form" });
    } else {
      return res.status(202).json({ message: "Pay for consultation" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.getConsultantDetails = async (req, res) => {
  const consultantId = req.params.consultantId;
  console.log(consultantId);

  try {
    const consultant = await Consultant.findById(consultantId); // Use findById for a single document
    console.log(consultant);
    
    const reviews = await Review.find({ consultantId }).populate(
      "userId",
      "firstName lastName email"
    );
    console.log(reviews);

    // Divide the ratings by 1, 2, 3, 4, 5 and count them
    const ratings = { 1: [], 2: [], 3: [], 4: [], 5: [] };
    const ratingsCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let totalSum = 0; // To compute the average rating

    if (reviews.length) {
      reviews.forEach((review) => {
        if (ratings[review.rating]) {
          ratings[review.rating].push(review);
          ratingsCount[review.rating] += 1;
          totalSum += review.rating; // Accumulate the sum of ratings
        }
      });
    }

    const totalRatings = Object.values(ratingsCount).reduce((sum, count) => sum + count, 0);
    const averageRating = totalRatings === 0 ? 0 : (totalSum / totalRatings).toFixed(1); // Calculate average and format to one decimal

    res.status(200).json({ ratings, ratingsCount, reviews, consultant, averageRating });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


exports.getUpcomingConsultations = async (req, res) => {
  const customerId = req.params.id;
  const todayDate = new Date();

  try {
    // Find the customer and get their email
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    const email = customer.email;

    // Find consultations for the customer based on email
    const consultations = await Consultation.find({ userId: email }).populate(
      "userId",
      "firstName lastName email"
    );

    // Filter upcoming consultations

    //the date I'm storing and the date i.e., todayDate are different
    // I mean the format of the date...
    const upcomingConsultations = consultations.filter(
      (consultation) => new Date(consultation.date) > todayDate
    );

    res.status(200).json({ upcomingConsultations });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getPreviousConsultations = async (req, res) => {
  const customerId = req.params.id;
  const todayDate = new Date();

  try {
    // Find the customer and get their email
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    const email = customer.email;

    // Find consultations for the customer based on email
    const consultations = await Consultation.find({ userId: email }).populate(
      "userId",
      "firstName lastName email"
    );

    // Filter upcoming consultations
    const previousConsultations = consultations.filter(
      (consultation) => new Date(consultation.date) < todayDate
    );

    res.status(200).json({ previousConsultations });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const sendPasswordResetLink = async (email, resetToken) => {
  const resetUrl = `http://localhost:3000/user/create-password/${resetToken}`;

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
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    customer.resetPasswordToken = resetToken;
    customer.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await customer.save();

    // Send email
    await sendPasswordResetLink(customer.email, resetToken);

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
    const customer = await customer.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!customer) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    customer.password = hashedPassword;
    customer.resetPasswordToken = undefined;
    customer.resetPasswordExpires = undefined;
    await customer.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error resetting password" });
  }
};

exports.verifyResetToken = async (req, res) => {
  const { token } = req.params;

  try {
    const customer = await customer.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!customer) {
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

    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(404).json({ message: "customer not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the customer's password
    customer.passwordDetails = [{ password: hashedPassword }];
    customer.registrationStatus = "completed"; // Optionally update registration status

    // Save the updated customer
    await customer.save();

    res.status(200).json({ message: "Password created successfully" });
  } catch (error) {
    console.error("Error in createPassword:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.reduceCredit = async (req, res) => {
  const { customerId } = req.body;

  // Logic to reduce credit from the customer's account
  // Fetch the customer from the database, reduce the credit, and save the updated customer data

  try {
    const customer = await Customer.findById(customerId);
    if (customer.credits > 0) {
      customer.credits -= 1;
      await customer.save();
      res.status(200).json({ success: true, credits: customer.credits });
    } else {
      res.status(400).json({ success: false, message: "Insufficient credits" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
