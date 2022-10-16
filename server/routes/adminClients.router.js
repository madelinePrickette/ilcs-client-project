const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route 
 * //this GET route gets all client data from clients table.
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "client" ORDER BY "client".client_id; `;

  pool.query(queryText)
    .then(response => {
      res.send(response.rows)
    }).catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

/**
 * POST route
 * //this post route adds a new client to client table 
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    //const active makes new client active by passing them true boolean. 
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

/**
 * Put route
 * //This Put route takes care of the client soft delete 
 */
 router.put('/delete/:id', rejectUnauthenticated, (req, res) => {
  const id = req.params.id
  console.log('here is params in put, aka soft delete:', id)
  const queryText = `
  UPDATE "client"
  SET "client_active" = FALSE
  WHERE client_id = $1
  ;`;

  pool.query(queryText, [id] )
    .then(response => {
      // console.log(response)
      res.sendStatus(200)})
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

//This Put route edits client info
router.put('/edit/client', rejectUnauthenticated, (req, res) => {
  console.log('here is req.body in edit PUT', req.body);
  const queryText = `
  UPDATE "client" 
  SET "client_first_name" = $1, "client_last_name" = $2, "address" = $3, "city" = $4, "state" = $5, "zip" = $6, "bio" = $7 
  WHERE "client_id" = $8 ;`;

  values = [
    req.body.firstName,
    req.body.lastName,
    req.body.address,
    req.body.city,
    req.body.state,
    req.body.zip,
    req.body.bio,
    req.body.clientId
  ]

  pool.query(queryText, values )
    .then(response => {
      // console.log(response)
      res.sendStatus(200)})
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

/**
 * DELETE route 
 */
//this delete route deletes client rows on user_client table when client is deactivated.
 router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const client_id = req.params.id
  console.log('here is params in delete Junction route:', client_id)  

  const queryText = `
  DELETE FROM "user_client"
  WHERE j_client_id = $1;
  `;

  pool.query(queryText, [client_id] )
    .then(response => {
      res.sendStatus(200)})
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

module.exports = router;
