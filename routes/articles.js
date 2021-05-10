'use strict';

const express = require('express');
// const pg = require('pg');
// const client = new pg.Client({
//   connectionString: process.env.DATABASE_URL,
//   // ssl: { rejectUnauthorized: false },
// });
const router = express.Router();
const client = require('../server.js');
// Put your routes here

// /articles
router.get('/', function (req, res) {
  // Show all the articles from the DB
  let SQL = `SELECT * FROM articlesforcustmor`;
  // let SQL = `SELECT * FROM articles`;

  client
    .query(SQL)
    .then(result => {
      res.render('pages/articles/articles', {
        articlesDataforCustomer: result.rows,
      });
    })
    .catch(err => {
      res.render('pages/error', { error: err });
    });
  // res.render('pages/articles/articles', { title: 'articles' });
});

router.get('/admin', (req, res) => {
  let SQL = `SELECT * FROM articles; SELECT * FROM articlesforcustmor; `;
  client
    .query(SQL)
    .then(result => {
      // console.log(result[0].rows);
      res.render('pages/articles/admin', {
        articlesData: result[0].rows,
        addedDataCheck: result[1].rows,
      });
    })
    .catch(err => {
      res.render('pages/error', { error: err });
    });
});

router.post('/admin', (req, res) => {
  let { image, date, title, author, description, id } = req.body;
  let SQL = `INSERT INTO articlesforcustmor (image, date, title, author, description ,id) VALUES ($1,$2,$3,$4,$5 ,$6) RETURNING *;`;

  let safeValues = [image, date, title, author, description, id];

  client
    .query(SQL, safeValues)
    .then(res.redirect('/articles/admin'))
    .catch(err => {
      res.render('pages/error', { error: err });
    });
});

router.put('/admin', (req, res) => {
  let { image, date, title, author, description, id } = req.body;
  let SQL = `UPDATE articles SET image=$1, date=$2, title=$3, author=$4, description=$5 WHERE id=$6;`;
  let SQL2 = `UPDATE articlesforcustmor SET image=$1, date=$2, title=$3, author=$4, description=$5 WHERE id=$6;`;
  let safeValues = [image, date, title, author, description, id];
  client.query(SQL2, safeValues);
  client
    .query(SQL, safeValues)
    .then(res.redirect('/articles/admin'))
    .catch(err => {
      res.render('pages/error', { error: err });
    });
});

router.delete('/admin', (req, res) => {
  let { id } = req.body;
  let SQL = `DELETE FROM articlesforcustmor WHERE id=$1;`;
  client
    .query(SQL, [id])
    .then(res.redirect('/articles/admin'))
    .catch(err => {
      res.render('pages/error', { error: err });
    });
});

router.get('/article/:id', (req, res) => {
  console.log('kkk');
  console.log(req.params.id);
  let SQL = `SELECT * FROM articlesforcustmor WHERE id=$1;`;
  client
    .query(SQL, [req.params.id])
    .then(result => {
      console.log(result.rows[0]);
      res.render('pages/articles/article', { oneArticleData: result.rows[0] });
    })
    .catch(err => {
      res.render('pages/error', { error: err });
    });
});

module.exports = router;
