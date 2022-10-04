const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  const queryText = `
  SELECT * FROM "user"
  WHERE "clearance_level" = 0;
  ;`;

  pool.query(queryText)
    .then(response => {
      res.send(response.rows);
    }).catch(err => {
      res.sendStatus(500)
      console.log(err);
    })
});


router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;