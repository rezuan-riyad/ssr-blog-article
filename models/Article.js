const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  content: {
    type: String,
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Article", ArticleSchema);
