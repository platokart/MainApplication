const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!!! Shutting down....");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require("./app");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    //useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("dB connection..... ");
  });

// console.log(process.env);
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running... on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLER REJECTION!!! Shutting down....");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!!! Shutting down....");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
