const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// gets all of the timesheets for a specific user
router.get('/', rejectUnauthenticated, (req, res) => {

    const queryText = `SELECT * FROM "timesheet"
    INNER JOIN "client"
    ON "timesheet".t_client_id = "client".client_id
    INNER JOIN "user"
    ON "timesheet".t_user_id = "user".id
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

// gets a specific timesheet for a user by timesheet id
router.get('/:timesheetid', rejectUnauthenticated, (req, res)=> {
    const queryText=`
    SELECT * FROM "timesheet"
    JOIN "client"
    ON "client".client_id = "timesheet".t_client_id
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

// updates a specific timesheet by timesheet id
router.put('/:timesheetid', rejectUnauthenticated, (req, res) => {
    const id = req.params.timesheetid
    const queryText = `
        UPDATE "timesheet" 
        SET "t_client_id" = $1,
        "notes" = $2,
        "notification" = TRUE
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