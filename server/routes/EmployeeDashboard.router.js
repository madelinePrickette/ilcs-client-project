const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  const queryText =
  `
  SELECT * FROM "client"
  JOIN "user_client"
  ON "client".client_id = "user_client".j_client_id
  JOIN "user"
  ON "user_client".j_user_id = "user".id
  WHERE "user".id = 4;
  `;

  pool.query(queryText)
  .then( (result) => {
    console.log('Getting this employee clients...', result.rows)
    res.send(result.rows)
  }).then( (err) => {
    console.log('error in EmployeeDashboard.jsx', err);
  });

});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;