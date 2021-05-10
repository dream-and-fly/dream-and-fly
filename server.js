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

function City(serchQuery, items) {
  this.cityName = serchQuery;
  this.videoID = items.id.videoId;
  this.videotitle = items.snippet.title;
  this.cityVideo = items;
}
// results route ------- most IMPORTANT route ---- APIs here
server.get("/results/:search_query", (req, res) => {
  let URLparams = [req.params.search_query];
  async function wait() {
    async function youTubeApi(URLparams) {
      let url = `http://api.positionstack.com/v1/forward?access_key=e68baa4a11e51629e2cee8145488b785&query=${URLparams}`;
      return await superagent.get(url).then((cityData) => {
        return cityData.body;
      });
    }
    async function youTubeApi2(URLparams) {
      let url = `http://api.positionstack.com/v1/forward?access_key=e68baa4a11e51629e2cee8145488b785&query=${URLparams}`;
      return await superagent.get(url).then((cityData) => {
        return cityData.body;
      });
    }
    let x = [];
    await youTubeApi(URLparams).then((result) => {
      x.push(result.data);
    });
    let y = [];
    await youTubeApi2(URLparams).then((result) => {
      y.push(result.data);
    });
    console.log(x);
    console.log(y);
    res.render("pages/results", {
      title: "results",
      youtube: x,
      youtube2: y,
    });
  }
  wait();
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
  res.render("pages/error");
});

//Connect to dataBase then listen to the PORT
// client.connect().then(() => {
//   server.listen(PORT, () =>
//     console.log(`Server running on port: http://localhost:${PORT}`)
//   );
// });
server.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
