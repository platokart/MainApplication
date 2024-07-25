// models/Article.js
const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
});

const Articles = mongoose.model("Article", articleSchema)
module.exports = Articles;
