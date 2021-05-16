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
      res.render('pages/error', { error: err, title: 'Error' });
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
      res.render('pages/error', { error: err, title: 'Error' });
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
      res.render('pages/error', { error: err, title: 'Error' });
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
      res.render('pages/error', { error: err, title: 'Error' });
    });
});

router.delete('/admin', (req, res) => {
  let { deleteN } = req.body;
  let { Delete_root_articles_id } = req.body;

  let SQL = deleteN
    ? deleteN === 'All'
      ? client.query(`DELETE FROM articlesforcustmor ;`)
      : client.query(`DELETE FROM articlesforcustmor WHERE id=$1;`, [deleteN])
    : client.query(`DELETE FROM articles WHERE id=$1;`, [
        Delete_root_articles_id,
      ]);

  SQL.then(() => {
    // console.log(SQL);
    res.redirect('/articles/admin');
  }).catch(err => {
    res.render('pages/error', { error: err, title: 'Error' });
  });
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
      res.render('pages/error', { error: err, title: 'Error' });
    });
});

router.get('/admin/new-post', (req, res) => {
  let SQL = `SELECT * FROM articles ORDER BY id DESC LIMIT 3; select * from articles inner join articlesforcustmor on articles.id=articlesforcustmor.id ;`;
  client
    .query(SQL)
    .then(result => {
      res.render('pages/articles/newPost', {
        newArticlesAddes: result[0].rows,
        addedDataCheck: result[1].rows,
        title: 'New Post',
      });
    })
    .catch(err => {
      res.render('pages/error', { error: err, title: 'Error' });
    });
});

router.post('/admin/new-post', (req, res) => {
  let { image, title, author, description } = req.body;
  let { add } = req.body;

  let date = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());
  let safeValues = [date, image, title, author, description];

  let SQL = add
    ? client.query(`INSERT INTO articlesforcustmor (id) VALUES ($1);`, [add])
    : client.query(
        `INSERT INTO articles (date ,image, title, author, description) VALUES ($1,$2,$3,$4,$5) RETURNING *; `,
        safeValues
      );

  SQL.then(result => {
    res.redirect('/articles/admin/new-post');
  });
});

router.put('/admin/new-post', (req, res) => {
  let { image, date, title, author, description, id } = req.body;
  let SQL = `UPDATE articles SET image=$1, date=$2, title=$3, author=$4, description=$5 WHERE id=$6;`;
  let safeValues = [image, date, title, author, description, id];

  client
    .query(SQL, safeValues)
    .then(res.redirect('/articles/admin/new-post'))
    .catch(err => {
      res.render('pages/error', { error: err, title: 'Error' });
    });
});

router.delete('/admin/new-post', (req, res) => {
  // let SQL = `DELETE FROM articles WHERE id =$1;`;
  // let safeValues = [req.body.deleteN];
  // client
  //   .query(SQL, safeValues)
  //   .then(res.redirect('/articles/admin/new-post'))
  //   .catch(err => {
  //     res.render('pages/error', { error: err, title: 'Error' });
  //   });

  let { deleteN } = req.body;
  let { deletefromCustmorpage } = req.body;

  let SQL = deleteN
    ? client.query(`DELETE FROM articles WHERE id =$1;`, [deleteN])
    : client.query(`DELETE FROM articlesforcustmor WHERE id=$1;`, [
        deletefromCustmorpage,
      ]);

  SQL.then(() => {
    res.redirect('/articles/admin/new-post');
  }).catch(err => {
    res.render('pages/error', { error: err, title: 'Error' });
  });
});

module.exports = router;
