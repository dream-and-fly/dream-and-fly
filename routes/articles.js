'use strict';

const express = require('express');

const router = express.Router();
const client = require('../server.js');

// Put your routes here

// /articles
router.get('/', function (req, res) {
  // Show all the articles from the DB
  let SQL = `select * from articles inner join articlesforcustmor on articles.id=articlesforcustmor.id;`;
  client
    .query(SQL)
    .then(result => {
      res.render('pages/articles/articles', {
        articlesDataforCustomer: result.rows,
        title: 'Articles',
      });
    })
    .catch(err => {
      res.render('pages/error', { error: err });
    });
});

router.get('/admin', (req, res) => {
  let SQL = `SELECT * FROM articles; select * from articles inner join articlesforcustmor on articles.id=articlesforcustmor.id; `;
  client
    .query(SQL)
    .then(result => {
      res.render('pages/articles/admin', {
        articlesData: result[0].rows,
        addedDataCheck: result[1].rows,
        title: 'Admin',
      });
    })
    .catch(err => {
      res.render('pages/error', { error: err, title: 'results' });
    });
});

router.post('/admin', (req, res) => {
  let { id } = req.body;
  let SQL = `INSERT INTO articlesforcustmor (id) VALUES ($1);`;

  let safeValues = [id];

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
  let safeValues = [image, date, title, author, description, id];

  client
    .query(SQL, safeValues)
    .then(res.redirect('/articles/admin'))
    .catch(err => {
      res.render('pages/error', { error: err });
    });
});

router.delete('/admin', (req, res) => {
  let { deleteN } = req.body;

  let SQL =
    deleteN === 'All'
      ? client.query(`DELETE FROM articlesforcustmor ;`)
      : client.query(`DELETE FROM articlesforcustmor WHERE id=$1;`, [deleteN]);

  SQL.then(res.redirect('/articles/admin'));
});

router.get('/article/:id', (req, res) => {
  let SQL = `select * from articles inner join articlesforcustmor on articles.id=articlesforcustmor.id WHERE articlesforcustmor.id=$1;`;
  client
    .query(SQL, [req.params.id])
    .then(result => {
      res.render('pages/articles/article', {
        oneArticleData: result.rows[0],
        title: 'Article',
      });
    })
    .catch(err => {
      res.render('pages/error', { error: err });
    });
});

module.exports = router;
