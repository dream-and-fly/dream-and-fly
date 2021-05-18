"use strict";

// Application Dependencies
require("dotenv").config();
const express = require("express");
const superagent = require("superagent");
const pg = require("pg");
const cors = require("cors");
const methodOverride = require("method-override");

const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

const server = express();
const PORT = process.env.PORT || 3030;
// const app = express();

// const PORT = process.env.PORT || 3000;

/////////////
const LocalStrategy = require("passport-local").Strategy;
function initializePassport(passport) {
  // console.log("Initialized");

  const authenticateUser = (email, password, done) => {
    // console.log(email, password);
    client.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
        // console.log(results.rows);

        if (results.rows.length > 0) {
          const user = results.rows[0];

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              // console.log(err);
            }
            if (isMatch) {
              return done(null, user);
            } else {
              //password is incorrect
              return done(null, false, { message: "Password is incorrect" });
            }
          });
        } else {
          // No user
          return done(null, false, {
            message: "No user with that email address",
          });
        }
      }
    );
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );
  // Stores user details inside session. serializeUser determines which data of the user
  // object should be stored in the session. The result of the serializeUser method is attached
  // to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide
  //   the user id as the key) req.session.passport.user = {id: 'xyz'}
  passport.serializeUser((user, done) => done(null, user.id));

  // In deserializeUser that key is matched with the in memory array / database or any data resource.
  // The fetched object is attached to the request object as req.user

  passport.deserializeUser((id, done) => {
    client.query(`SELECT * FROM users WHERE id = $1`, [id], (err, results) => {
      if (err) {
        return done(err);
      }
      // console.log(`ID is ${results.rows[0].id}`);
      return done(null, results.rows[0]);
    });
  });
}
initializePassport(passport);
////////////

// const initializePassport = require("./passportConfig");
//
// initializePassport(passport);

// Middleware

// Parses details from a form
// app.use(express.urlencoded({ extended: false }));
// app.set("view engine", "ejs");

// Application Setups

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");
server.use(express.static("./public"));
server.use(methodOverride("_method"));
server.use(cors());
module.exports = client;

server.use(
  session({
    // Key we want to keep secret which will encrypt all of our information
    secret: process.env.SESSION_SECRET,
    // Should we resave our session variables if nothing has changes which we dont
    resave: false,
    // Save empty value if there is no vaue which we do not want to do
    saveUninitialized: false,
  })
);
// Funtion inside passport which initializes passport
server.use(passport.initialize());
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
server.use(passport.session());
server.use(flash());

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
function Covid(items) {
  this.confirmed = items.confirmed;
  this.recovered = items.recovered;
  this.now = Number(this.confirmed) - Number(this.recovered);
  this.deaths = items.deaths;
}
// results route ------- most IMPORTANT route ---- APIs here
server.get("/results", (req, res) => {
  // console.log("sdf");
  let URLparams = req.query.search_query;
  // console.log(URLparams);
  function countryNameFromCity(URLparams) {
    let key = process.env.GET_COUNTRY_API;
    let url = `http://api.positionstack.com/v1/forward?access_key=${key}&query=${URLparams}`;
    return superagent.get(url).then((countryData) => {
      let gettedData = countryData.body.data[0].country;
      return gettedData;
    });
  }
  let countryApi = countryNameFromCity(URLparams).then((results) => {
    let url = `https://restcountries.eu/rest/v2/name/${results}?fullText=true`;
    return superagent.get(url).then((capitalData) => {
      let gettedData = capitalData.body;
      let newcapitalData = new CountryInfo(gettedData);
      return newcapitalData;
    });
  });
  let covidApi = countryNameFromCity(URLparams).then((results) => {
    let url = `https://covid-api.mmediagroup.fr/v1/cases?country=${
      results[0].toUpperCase() + results.slice(1)
    }`;
    return superagent.get(url).then((covidData) => {
      let Data = covidData.body.All;
      console.log(Data);
      let CovidObjects = new Covid(Data);
      return CovidObjects;
    });
  });
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
  function weatherApi(URLparams) {
    let key = process.env.WEATHER_API_KEY;
    let url = `api.openweathermap.org/data/2.5/weather?q=${URLparams}&units=metric&appid=${key}`;
    return superagent.get(url).then((wData) => {
      let gettedData = wData.body;
      // console.log(gettedData);
      let newweatherData = new Weather(gettedData);
      return newweatherData;
    });
  }
  function getRevies(URLparams) {
    let safeValues = [URLparams.toLowerCase()];
    let SQL = `SELECT * FROM reviews WHERE city=$1;`;

    return client.query(SQL, safeValues).then((results) => {
      // console.log(results.rows);
      // res.render("pages/results", { title: "sds", DBresults: results.rows });
      return results.rows;
    });
  }
  Promise.all([
    youTubeApi(URLparams),
    weatherApi(URLparams),
    countryApi,
    covidApi,
    getRevies(URLparams),
  ])
    .then((results) => {
      // console.log(results[4]);
      res.render("pages/results", {
        title: "results",
        youTubeApi: results[0],
        weatherApi: results[1],
        countryApi: results[2],
        covidApi: results[3],
        DBresults: results[4],
        city: URLparams,
      });
    })
    .catch((error) => {
      // console.log(error);
      res.send(error);
      // res.render("./pages/error", { error: error });
    });
});

// To insert reviews into the DB
server.post("/results", (req, res) => {
  // let URLparams = [req.params.search_query];
  // console.log(req.body);
  let SQL = `INSERT INTO reviews (city, date, title, author, description,rating) VALUES($1,$2,$3,$4,$5,$6); `;
  let safeValues = [
    req.body.city,
    req.body.date,
    req.body.title,
    req.body.author,
    req.body.description,
    req.body.rating,
  ];
  client.query(SQL, safeValues).then((results) => {
    res.redirect(`/results/?search_query=${req.body.city}`);
  });
});

// AboutUs route
server.get("/about-us", (req, res) => {
  res.render("pages/about-us", { title: "About-Us" });
});

// Users route
// server.get("/users", (req, res) => {
//   res.render("pages/auth/index", { title: "Register" });
// });
server.get("/users/register", checkAuthenticated, (req, res) => {
  res.render("pages/auth/register.ejs", { title: "Register" });
});
server.get("/users/login", checkAuthenticated, (req, res) => {
  // flash sets a messages variable. passport sets the error message
  // console.log(req.session.flash.error);
  res.render("pages/auth/login.ejs", { title: "Login" });
});
// server.get("/users/dashboard", checkNotAuthenticated, (req, res) => {
//   // console.log(req.isAuthenticated());
//   res.render("pages/auth/dashboard", { user: req.user.name });
// });

server.get("/users/logout", (req, res) => {
  req.logout();
  res.render("pages/auth/index", {
    title: "Logout",
    message: "You have logged out successfully",
  });
});
server.post("/users/register", async (req, res) => {
  let { name, email, password, password2 } = req.body;

  let errors = [];

  // console.log({
  //   name,
  //   email,
  //   password,
  //   password2,
  // });

  if (!name || !email || !password || !password2) {
    errors.push({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    errors.push({ message: "Password must be a least 6 characters long" });
  }

  if (password !== password2) {
    errors.push({ message: "Passwords do not match" });
  }

  if (errors.length > 0) {
    res.render("pages/auth/register", {
      title: "Register",
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    let hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);
    // Validation passed
    client.query(
      `SELECT * FROM users
        WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          console.log(err);
        }
        // console.log(results.rows);

        if (results.rows.length > 0) {
          return res.render("pages/auth/register", {
            title: "Register",
            message: "Email already registered",
          });
        } else {
          client.query(
            `INSERT INTO users (name, email, password)
                VALUES ($1, $2, $3)
                RETURNING id, password`,
            [name, email, hashedPassword],
            (err, results) => {
              if (err) {
                throw err;
              }
              // console.log(results.rows);
              req.flash("success_msg", "You are now registered. Please log in");
              res.redirect("/users/login");
            }
          );
        }
      }
    );
  }
});

server.post(
  "/users/login",
  passport.authenticate("local", {
    // successRedirect: "/users/dashboard",
    successRedirect: "/articles/admin",
    failureRedirect: "/users/login",
    failureFlash: true,
  })
);
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // return res.redirect("/users/dashboard");
    return res.redirect("/articles/admin");
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/users/login");
}

// HomePage route
server.get("/", (req, res) => {
  let SQL = `select * from articles inner join articlesforcustmor on articles.id=articlesforcustmor.id ORDER BY articlesforcustmor.id DESC LIMIT 3;`;
  client.query(SQL).then((result) => {
    // console.log(result.rows);
    res.render("pages/index", { title: "HomePage", posts: result.rows });
  });
});

// For any route that is not specified
server.get("*", (req, res) => {
  res.render("pages/error", {
    error: "You are requsting a page that is not on this website",
    title: "Error",
  });
});

// Connect to dataBase then listen to the PORT
client.connect().then(() => {
  server.listen(PORT, () =>
    console.log(`Server running on port: http://localhost:${PORT}`)
  );
});
// server.listen(PORT, () =>
//   console.log(`Server running on port: http://localhost:${PORT}`)
// );
