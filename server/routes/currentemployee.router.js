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

module.exports = router;