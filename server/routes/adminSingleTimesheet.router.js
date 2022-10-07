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
    WHERE timesheet_id = $1;
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