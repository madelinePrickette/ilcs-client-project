const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/emplist/:id', (req, res) => {
  const id = req.params.id;
  const queryText = `
  SELECT * FROM "client"
  JOIN "user_client" ON j_client_id = client_id
  WHERE j_user_id = $1
;`;
  pool.query(queryText, [id])
    .then(response => {
      res.send(response.rows)
    }).catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

router.get('/', (req, res) => {
  const queryText = `
  SELECT * FROM "client"
  LEFT JOIN "user_client" ON client_id = j_client_id
  WHERE client_active = TRUE
  ;`;
  pool.query(queryText)
    .then(response => {
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
  // POST route code here
});

module.exports = router;