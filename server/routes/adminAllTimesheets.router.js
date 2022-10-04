const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');  

router.get('/', rejectUnauthenticated, (req, res) => {
    
    const queryText =
    `
    SELECT * FROM "timesheet";
    `

    pool.query(queryText)
    .then( (result) => {
        res.send(result.rows);
    }).catch( (err) => {
        res.sendStatus(500);
        console.error('server error in adminAllTimesheets router', err);
    })
});

module.exports = router;