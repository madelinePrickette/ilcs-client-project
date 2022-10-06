const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {

    console.log('in get timesheets for employee');

    const queryText = `SELECT * FROM "timesheet"
    JOIN "client"
    ON "timesheet".t_client_id = "client".client_id
    JOIN "user_client"
    ON "user_client".j_client_id = "client".client_id
    WHERE "timesheet".t_user_id = $1
    ORDER BY clock_in DESC;`;
    const queryValues = [ req.user.id ];

    pool.query(queryText, queryValues)
    .then( result => {
        res.send(result.rows);
    }).catch( err => {
        console.log( err );
        res.sendStatus(500);
    })
})

module.exports = router;