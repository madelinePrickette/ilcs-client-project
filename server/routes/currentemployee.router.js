const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/:id', rejectUnauthenticated, (req, res) => {
  const id = req.params.id;
  const queryText = `
  SELECT * FROM "user"
  WHERE "id" = $1;
  ;`;

  pool.query(queryText, [id])
    .then(response => {
      console.log(response.rows);
      res.send(response.rows);
    }).catch(err => {
      res.sendStatus(500)
      console.log(err);
    })
});


router.post('/',  rejectUnauthenticated, (req, res) => {
  // POST route code here
});

router.put('/:id', rejectUnauthenticated, (req, res) =>{
  console.log(req.body.info.firstname)
  const id = req.params.id;
  const queryText = `
    UPDATE "user" 
    SET "first_name" = $1,
      "last_name" = $2,
      "username" = $3,
      "clearance_level" = $4,
      "email" = $5,
      "pic" = $6,
      "user_active" = $7
    WHERE id = $8
  ;`;

  values = [
    req.body.info.firstname,
    req.body.info.lastname,
    req.body.info.username,
    req.body.info.clearancelevel,
    req.body.info.email,
    req.body.info.picture,
    req.body.info.active,
    id
  ]

  pool.query(queryText, values)
    .then(response => {
      res.sendStatus(200)
    }).catch(error => {
      console.log(error)
      res.sendStatus(500)
    })
})


module.exports = router;