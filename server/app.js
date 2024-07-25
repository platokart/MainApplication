const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const customerRoutes = require("./routes/customerRoutes");
const consultantRoutes = require("./routes/consultantRoutes");
const videoCallingRoutes = require("./routes/videoCallingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const landingPageController = require("./controllers/landingPageController");
const {
  acceptedConsultation,
} = require("./controllers/videoCallChatController");
const communityRoutes = require("./routes/communityRoutes");
const app = express();
const http = require("http");
const server = http.createServer(app); // Create HTTP server
require("./tasks/removeExpiredCredits");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: "http://localhost:3000", // Specify your client app's origin
  })
);
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", landingPageController.landingPage);
app.use("/customer", customerRoutes);
app.use("/consultant", consultantRoutes);
app.use("/payment", paymentRoutes);
// Middleware to initialize socket.io server when /video route is accessed
app.use("/community", communityRoutes);
app.use("/video", videoCallingRoutes);
app.get("/api/payment-html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "payment.html"));
});
app.get("/api/paymentMstandard-html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "paymentMstandard.html"));
});
app.get("/api/paymentMpremium-html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "paymentMpremium.html"));
});
app.get("/api/paymentYbasic-html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "paymentYbasic.html"));
});
app.get("/api/paymentYstandard-html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "paymentYstandard.html"));
});
app.get("/api/paymentYpremium-html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "paymentYpremium.html"));
});

module.exports = app;
