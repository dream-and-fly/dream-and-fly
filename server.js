"use strict";

// Application Dependencies
require("dotenv").config();
const express = require("express");
const superagent = require("superagent");
const pg = require("pg");
const cors = require("cors");
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
server.use(cors());

// Start you routes here

// Articles route
const articlesRoute = require("./routes/articles.js");
server.use("/articles", articlesRoute);
///// Constructers
function YouTube(items) {
  this.videoID = items.id.videoId;
  this.videotitle = items.snippet.title;
}
function Weather(items) {
  this.cityName = items.name;
  this.lon = items.coord.lon;
  this.lat = items.coord.lat;
  this.temp = items.main.temp;
  this.feelsLike = items.main.feels_like;
  this.minTemp = items.main.temp_min;
  this.maxTemp = items.main.temp_max;
}
function CountryInfo(items) {
  this.flag = items[0].flag;
  this.countryName = items[0].name;
  this.region = items[0].region;
  this.population = items[0].population;
  this.language = items[0].languages[0].name;
  this.currencies = items[0].currencies[0].name;
}
// results route ------- most IMPORTANT route ---- APIs here
server.get("/results/:search_query", (req, res) => {
  let URLparams = req.params.search_query;
  function youTubeApi(URLparams) {
    let key = process.env.YOUTUBE_API_KEY;
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=tourism+in+${URLparams}&type=video&videoCaption=any&videoDefinition=any&videoDimension=2d&videoDuration=medium&videoEmbeddable=true&videoType=any&key=${key}`;

    return superagent.get(url).then((youTubeData) => {
      let gettedData = youTubeData.body.items;
      let threeVideos = gettedData.map((items) => {
        return new YouTube(items);
      });
      return threeVideos;
    });
  }
  function weatherData(URLparams) {
    let key = process.env.WEATHER_API_KEY;
    let url = `api.openweathermap.org/data/2.5/weather?q=${URLparams}&units=metric&appid=${key}`;
    return superagent.get(url).then((wData) => {
      let gettedData = wData.body;
      console.log(gettedData);
      let newweatherData = new Weather(gettedData);
      return newweatherData;
    });
  }
  function countryData(URLparams) {
    let key = process.env.GET_COUNTRY_API;
    let url = `http://api.positionstack.com/v1/forward?access_key=${key}&query=${URLparams}`;
    return superagent.get(url).then((countryData) => {
      let gettedData = countryData.body.data[0].country;
      let url = `https://restcountries.eu/rest/v2/name/${gettedData}?fullText=true`;
      return superagent.get(url).then((capitalData) => {
        let gettedData = capitalData.body;
        let newcapitalData = new CountryInfo(gettedData);
        return newcapitalData;
      });
    });
  }

  Promise.all([
    youTubeApi(URLparams),
    weatherData(URLparams),
    countryData(URLparams),
  ]).then((results) => {
    // console.log(results);
    res.send(results);
    // res.render("pages/results", { title: "results" });
  });
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
  res.render("pages/error", { title: "Error" });
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
