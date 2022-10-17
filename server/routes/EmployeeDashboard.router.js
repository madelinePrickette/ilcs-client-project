const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// Gets all of the clients that are assigned to a user
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText =
  `
  SELECT "client".client_first_name, "client".client_last_name, "client".client_id FROM "client"
  JOIN "user_client"
  ON "client".client_id = "user_client".j_client_id
  JOIN "user"
  ON "user_client".j_user_id = "user".id
  WHERE "user".id = $1;
  `;

  pool.query(queryText, [req.user.id])
  .then( (result) => {
    res.send(result.rows)
  }).then( (err) => {
    console.log('error in EmployeeDashboard.jsx', err);
  });

});

module.exports = router;