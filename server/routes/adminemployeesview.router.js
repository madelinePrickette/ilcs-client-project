const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route 
 */
//Serves as the main route to retrieve all active employees that are not admins. This data populates the admin employees view.
router.get('/', rejectUnauthenticated, (req, res) => {
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