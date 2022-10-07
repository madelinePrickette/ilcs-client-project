const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {

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

router.get('/:timesheetid', rejectUnauthenticated, (req, res)=> {
    const queryText=`
    SELECT * FROM "timesheet"
    WHERE timesheet_id = $1 AND t_user_id = $2;
    ;`;

    pool.query(queryText, [req.params.timesheetid, req.user.id])
        .then(response => {
            res.send(response.rows)
        }).catch(error =>{
            console.log(error)
            res.sendStatus(500)
        })
})

router.put('/:timesheetid', rejectUnauthenticated, (req, res) => {
    const id = req.params.timesheetid
    const queryText = `
        UPDATE "timesheet" 
        SET "t_client_id" = $1,
        "notes" = $2
        WHERE "timesheet_id" = $3;
    ;`;

    pool.query( queryText, [req.body.client, req.body.notes, id])
        .then(response => {
            res.sendStatus(200)
        }).catch( err => {
            console.log(err)
            res.sendStatus(500)
        })
})

module.exports = router;