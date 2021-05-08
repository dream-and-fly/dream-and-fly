"use strict";

// Application Dependencies
require("dotenv").config();
const express = require("express");
const superagent = require("superagent");
const pg = require("pg");
const methodOverride = require("method-override");

// Application Setups
const PORT = process.env.PORT || 3030;
const server = express();
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  // ssl: { rejectUnauthorized: false },
});
server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");
server.use(express.static("./public"));
server.use(methodOverride("_method"));

// Start you routes here

// Articles route
const articlesRoute = require("./routes/articles.js");
server.use("/articles", articlesRoute);

// results route ------- most IMPORTANT route ---- APIs here
server.get("/results/:search_query", (req, res) => {
  let URLparams = [req.params.search_query]; //Will be used in APIs functions as a search query
  // APIs functions here

  // retreive reviews from DB

  // render data on results/:search_query { title: "results", API1: "results",API2: "results",API3: "results",.......,Data from DB: "results", }
  res.render("pages/results", { title: "results" });
});

// To insert reviews into the DB
server.post("/results/search_query", (req, res) => {
  let URLparams = [req.params.search_query];
  res.redirect(`/results/${URLparams}`);
});

// HomePage route
server.get("/", (req, res) => {
  res.render("pages/index", { title: "HomePage" });
});

// For any route that is not specified
server.get("*", (req, res) => {
  res.render("pages/404page");
});

//Connect to dataBase then listen to the PORT
client.connect().then(() => {
  server.listen(PORT, () =>
    console.log(`Server running on port: http://localhost:${PORT}`)
  );
});
