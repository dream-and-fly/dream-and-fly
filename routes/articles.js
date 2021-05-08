const express = require("express");

const router = express.Router();

// Put your routes here

// /articles
router.get("/", function (req, res) {
  res.render("pages/articles/articles", { title: "articles" });
});

// export router;
module.exports = router;
