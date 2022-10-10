const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/:timesheetid', rejectUnauthenticated, (req, res)=> {
    const queryText=`
    SELECT * FROM "timesheet"
    JOIN "user"
    ON "user".id = "timesheet".t_user_id
    JOIN "client"
    ON "client".client_id = "timesheet".t_client_id
    WHERE timesheet_id = $1
    ;`;

    pool.query(queryText, [req.params.timesheetid])
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
        SET "t_client_id" = $2,
        "notes" = $3,
        "work_type" = $4,
        "clock_in" = $5,
        "clock_out" = $6
        WHERE "timesheet_id" = $1;
    ;`;

    pool.query( queryText, [ id, req.body.client, req.body.notes, req.body.work_type, req.body.clock_in, req.body.clock_out ])
        .then(response => {
            res.sendStatus(200)
        }).catch( err => {
            console.log(err)
            res.sendStatus(500)
        })
})

module.exports = router;