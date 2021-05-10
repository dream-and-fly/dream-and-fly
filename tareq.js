'use strict';


// Application Dependencies
const express = require('express');

const cors = require('cors');
const superagent = require('superagent');

// Environment variables
require('dotenv').config();

// Application Setup
const server = express();
const PORT = process.env.PORT || 3000;
server.use(cors());
server.set('view engine', 'ejs');
// Express middleware
server.use(express.urlencoded({ extended: true })); //put the from data in req.body
// Specify a directory for static resources
server.use(express.static('./public'));
server.use(express.static('./views'));


server.get('/', (req,res)=>{
  // res.send('hi iam on');
  res.render('index');

});

server.get('/show',(req,res)=>{


  let serchQuery =req.query.search;
  let key= process.env.YOUTUBE_API_KEY;

  let url =`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=tourism+in+${serchQuery}&type=video&videoCaption=any&videoDefinition=any&videoDimension=2d&videoDuration=medium&videoEmbeddable=true&videoType=any&key=${key}`;

  superagent.get(url).then(cityData=>{

    let gettedData = cityData.body.items;
    let newcityData = gettedData.map((items)=>{
      return new City(serchQuery, items);
    });
    console.log(newcityData);
    // res.render('index', {video:newcityData});
    res.render('video', {video:newcityData});
  });
});

server.get('/show',(req,res)=>{
  let serchQuery =req.query.search;
  let key= process.env.YOUTUBE_API_KEY;
  let url =`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=tourism+in+${serchQuery}&type=video&videoCaption=any&videoDefinition=any&videoDimension=2d&videoDuration=medium&videoEmbeddable=true&videoType=any&key=${key}`;
  superagent.get(url).then(cityData=>{
    let gettedData = cityData.body.items;
    let newcityData = gettedData.map((items)=>{
      return new City(serchQuery, items);
    });
    console.log(newcityData);
    // res.render('index', {video:newcityData});
    res.render('video', {video:newcityData});
  });
});

server.get('/weather',(req,res)=>{
  let serchQuery =req.query.search;
  let key= process.env.WEATHER_API_KEY;
  let url =`api.openweathermap.org/data/2.5/weather?q=${serchQuery}&units=metric&appid=${key}`;
  superagent.get(url).then(weatherData=>{
    // console.log(weatherData);
    let gettedData = weatherData.body;
    let newweatherData = new Weather( gettedData);
    console.log(newweatherData);
    res.render('video', {weather:newweatherData});
    // res.send(newweatherData);
  });
});

server.get('/info',(req,res)=>{
  let serchQuery =req.query.search;
  let url =`https://restcountries.eu/rest/v2/capital/${serchQuery}`;
  superagent.get(url).then(capitalData=>{
    // console.log(weatherData);
    let gettedData = capitalData.body;
    let newcapitalData = new Capital( gettedData);
    console.log(newcapitalData);
    // res.render('video', {weather:newweatherData});
    res.send(newcapitalData);
  });
});

function City (serchQuery, items){
  this.cityName= serchQuery;
  this.videoID = items.id.videoId;
  this.videotitle = items.snippet.title;
  this.cityVideo = items;
}
function Weather( items){
  this.cityName= items.name;
  this.lon= items.coord.lon;
  this.lat= items.coord.lat;
  this.temp= items.main.temp;
  this.feelsLike= items.main.feels_like;
  this.minTemp= items.main.temp_min;
  this.maxTemp= items.main.temp_max;
}
function Capital(items){
  this.flag = items[0].flag;
  this.countryName = items[0].name;
  this.region = items[0].region;
  this.population = items[0].population;
  this.language = items[0].languages[0].name;
  this.currencies = items[0].currencies[0].name;
}


server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

