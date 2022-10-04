const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
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

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;