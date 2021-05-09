'use strict';

const express = require('express');
const pg = require('pg');
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  // ssl: { rejectUnauthorized: false },
});
const router = express.Router();

// Put your routes here

// /articles
router.get('/', function (req, res) {
  res.render('pages/articles/articles', { title: 'articles' });
});

// router.get('/admin', function (req, res) {
//   let SQL = `SELECT * FROM articles`;
//   console.log('dddd');
//   client
//     .query(SQL)
//     .then(result => {
//       console.log(result);
//       res.render('pages/articles/admin', { ArticlesData: result.row[0] });
//     })
//     .catch(err => {
//       res.render('pages/error', { error: err });
//     });
// });

//function Articles(data_Artc) {}

// export router;
module.exports = router;
