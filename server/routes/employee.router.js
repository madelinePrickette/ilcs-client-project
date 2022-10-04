const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.post('/', (req, res) => {
    const queryText = `INSERT INTO "timesheet" ( "t_user_id", "t_client_id", "clock_in", "loc_1", "is_clocked_in", "notification")
    VALUES ($1, $2, current_timestamp, $3, true, false);`;
    const queryValues = [req.user.id, req.body.clientId, req.body.location];
    // 27 needs to be emnployee id
    pool.query(queryText, queryValues)
        .then( result => {
            res.sendStatus(201);
        }).catch( err => {
            console.log( err );
            res.sendStatus(500);
        })
})

router.post('/client', (req, res) => {
    console.log('server client id', req.body.clientId);
    const queryText = `SELECT * FROM "client"
    WHERE client_id = $1;`;
    const queryValues = [ req.body.clientId ];

    pool.query(queryText, queryValues)
    .then( result => {
        res.send(result.rows[0]);
        console.log('results!', result.rows[0]);
        // res.sendStatus(201);
    }).catch( err => {
        console.log( err );
        res.sendStatus(500);
    })
})


module.exports = router;