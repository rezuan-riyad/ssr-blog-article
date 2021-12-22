const express = require("express");
const router = express.Router();
const {
  addNewArticle,
  homepage,
  addpage,
  getOneArticle,
  singleArticlePage,
  deleteOneArticle,
  getAllArticles,
} = require("../controllers/article.controller");

router.post("/api/add", addNewArticle);
router.get("/api/getall", getAllArticles);

router.get("/", homepage);
router.get("/article/:id", getOneArticle, singleArticlePage);
router.delete("/article/:id", deleteOneArticle);

router.get("/add-article", addpage);
router.post("/add-article", addNewArticle, addpage);

module.exports = router;
