const { response } = require("express");
const Article = require("../models/Article");

exports.addNewArticle = async (req, res, next) => {
  const { title, content, author } = req.body;

  try {
    if (!title || !content || !author) {
      throw new Error("All fields are required.");
    }
    const newArticle = await Article({ title, content, author }).save();
    if (newArticle) {
      res.locals.message = "Saved successfully.";
      next();
    }
  } catch (error) {
    res.locals.error = error.message;
    next();
  }
};

exports.getAllArticles = async (req, res, next) => {
  try {
    const articles = await Article.find();
    if (articles) {
      return res.status(200).json({
        articles,
      });
    }
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

exports.getOneArticle = async (req, res, next) => {
  const id = req.params.id;

  try {
    if (!id) {
      throw new Error("Invalid query.");
    }
    const article = await Article.findById({ _id: id });
    if (article) {
      res.locals.article = article;
      next();
    } else {
      throw new Error("Article Not Found.");
    }
  } catch (error) {
    res.locals.error = error.message;
    next();
  }
};

exports.deleteOneArticle = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new Error("Invalid Query");
    }
    const article = await Article.findByIdAndDelete({ _id: id });
    if (article) {
      return res.status(200).json({ message: "Delete Successful" });
    }
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

exports.homepage = (req, res, next) => {
  Article.find().exec((err, data) => {
    if (err) {
      return next(err);
    } else {
      res.render("home", { title: "Articles", articles: data });
    }
  });
};

exports.addpage = (req, res, next) => {
  res.render("addpage", {
    title: "Add Article",
    message: res.locals.message,
    error: res.locals.error,
  });
};

exports.singleArticlePage = (req, res, next) => {
  res.render("singleArticlePage", {
    title: res.locals.article.title || "Not Found",
    article: res.locals.article,
    error: res.locals.error,
  });
};
