'use strict';

// Application Dependencies
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const methodOverride = require('method-override');

// Application Setups
const PORT = process.env.PORT || 3030;
const server = express();
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  // ssl: { rejectUnauthorized: false },
});
server.use(express.urlencoded({ extended: true }));
server.set('view engine', 'ejs');
server.use(express.static('./public'));
server.use(methodOverride('_method'));

// Start you routes here

// Articles route
const articlesRoute = require('./routes/articles.js');
server.use('/articles', articlesRoute);

server.get('/articles/admin', (req, res) => {
  let SQL = `SELECT * FROM articles`;
  client
    .query(SQL)
    .then(result => {
      // console.log(result.rows);
      res.render('pages/articles/admin', { articlesData: result.rows });
    })
    .catch(err => {
      res.render('pages/error', { error: err });
    });
});

server.post('/articles/admin', (req, res) => {
  let { image, date, title, author, description } = req.body;
  console.log(req.body);
  let SQL = `INSERT INTO articlesforcustmor (image, date, title, author, description) VALUES ($1,$2,$3,$4,$5) RETURNING *;`;

  let safeValues = [image, date, title, author, description];

  client
    .query(SQL, safeValues)
    .then(res.redirect('/articles/admin'))
    .catch(err => {
      res.render('pages/error', { error: err });
    });
});
server.put('/articles/admin', (req, res) => {
  let { image, date, title, author, description, id } = req.body;
  // console.log(id);
  let SQL = `UPDATE articles SET image=$1, date=$2, title=$3, author=$4, description=$5 WHERE id=$6;`;
  let safeValues = [image, date, title, author, description, id];
  // console.log(safeValues);
  client
    .query(SQL, safeValues)
    .then(r => {
      // console.log(r);
      res.redirect('/articles/admin');
    })
    .catch(err => {
      res.render('pages/error', { error: err });
    });
});

server.delete('/articles/admin', (req, res) => {
  let { id } = req.body;
  console.log(id);
  let SQL = `DELETE FROM articlesforcustmor WHERE id=$1;`;

  client
    .query(SQL, [id])
    .then(res.redirect('/articles/articles'))
    .catch(err => {
      res.render('pages/error', { error: err });
    });
});

server.get('/articles/articles', (req, res) => {
  let SQL = `SELECT * FROM articlesforcustmor`;
  client
    .query(SQL)
    .then(result => {
      // console.log(result.rows);
      res.render('pages/articles/articles', { articlesData: result.rows });
    })
    .catch(err => {
      res.render('pages/error', { error: err });
    });
});

// results route ------- most IMPORTANT route ---- APIs here
server.get('/results/:search_query', (req, res) => {
  let URLparams = [req.params.search_query]; //Will be used in APIs functions as a search query
  // APIs functions here

  // retreive reviews from DB

  // render data on results/:search_query { title: "results", API1: "results",API2: "results",API3: "results",.......,Data from DB: "results", }
  res.render('pages/results', { title: 'results' });
});

// To insert reviews into the DB
server.post('/results/search_query', (req, res) => {
  let URLparams = [req.params.search_query];
  res.redirect(`/results/${URLparams}`);
});

// HomePage route
server.get('/', (req, res) => {
  res.render('pages/index', { title: 'HomePage' });
});

// For any route that is not specified
server.get('*', (req, res) => {
  res.render('pages/error');
});

//Connect to dataBase then listen to the PORT
client.connect().then(() => {
  server.listen(PORT, () =>
    console.log(`Server running on port: http://localhost:${PORT}`)
  );
});
