const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "client"`;

  pool.query(queryText)
    .then(response => {
      console.log('get client data from server is', response.rows)
      res.send(response.rows)
    }).catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('req.body in post', req.body);
    //make new client active by passing them 
    const active = true;
  queryText=`INSERT INTO "client" ("client_first_name", "client_last_name", "address", "city", "state", "zip", "bio", "client_active")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
  values = [
    req.body.firstName,
    req.body.lastName,
    req.body.address,
    req.body.city,
    req.body.state,
    req.body.zip,
    req.body.bio,
    active
  ];

  pool.query(queryText, values)
    .then(response => {
      res.sendStatus(200)
    }).catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

module.exports = router;
