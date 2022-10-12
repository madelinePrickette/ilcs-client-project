const express = require('express');
const pool = require('../modules/pool');
const sgMail = require('@sendgrid/mail');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//Moment formating code
const moment = require('moment');
var momentPreciseRangePlugin = require("moment-precise-range-plugin");
const router = express.Router();

/**
 * GET route for sending time sheet submission email
 */
 router.get('/timesheet/:id', rejectUnauthenticated, (req, res) => {
    console.log('timesheet id', req.params.id);
    const queryText = `SELECT * FROM "timesheet"
    JOIN "client"
    ON "timesheet".t_client_id = "client".client_id
    WHERE "timesheet".timesheet_id = $1;`;
    const queryValues = [ req.params.id ];

    pool.query(queryText, queryValues)
    .then( result => {
        res.send(result.rows[0]);
        console.log('this is what we get from send email fetch!', result.rows[0]);
        console.log('this is req.user.email', req.user.email)

        const employeeEmail = req.user.email;
        const employeeName = `${req.user.first_name} ${req.user.last_name}`;
        const hours =  moment(result.rows[0].clock_out).diff(result.rows[0].clock_in, 'hours');
        const minutes = moment(result.rows[0].clock_out).diff(result.rows[0].clock_in, 'minutes') % 60;


        const employeeMessage = `Time Sheet Submitted:
            Clock In: ${moment(result.rows[0].clock_in).format('lll')}
            Clock Out: ${moment(result.rows[0].clock_out).format('lll')}
            Client: ${result.rows[0].client_first_name} ${result.rows[0].client_last_name }
            Type of work: ${result.rows[0].work_type}
            Shift Notes: ${result.rows[0].notes}
            Time Worked: ${hours}:${minutes}
            `; //end of employeeMessage

            const adminMessage = `Time Sheet Submitted:
            Time Sheet # ${result.rows[0].timesheet_id}
            Employee: ${employeeName}
            Clock In: ${moment(result.rows[0].clock_in).format('lll')}
            Clock Out: ${moment(result.rows[0].clock_out).format('lll')}
            Client: ${result.rows[0].client_first_name} ${result.rows[0].client_last_name }
            Type of work: ${result.rows[0].work_type}
            Shift Notes: ${result.rows[0].notes}
            Time Worked: ${hours}:${minutes}
            `; //end of adminMessage

        const emails = [ 
            { //Employee Email Version
            to: employeeEmail,
            from: 'ilcsdevs@gmail.com',
            subject: 'Time Sheet Submitted',
            text: employeeMessage,
            // html: '<p>Hello HTML world!</p>',
            },
            { //Admin Email Version
                to: 'ilcsdevs@gmail.com',
                from: 'ilcsdevs@gmail.com',
                subject: 'Employee Time Sheet Submitted',
                text: adminMessage,
                // html: '<p>Hello HTML world!</p>',
                },
            ];

        sgMail
        .send(emails)
        .then((response)=> console.log('email sent'))
        .catch((error)=> console.log('email not sent. error:', error.message));

        // res.sendStatus(201);
    }).catch( err => {
        console.log( err );
        res.sendStatus(500);
    })
});

/**
 * GET route for sending **EDITED** time sheet submission email
 */
 router.get('/timesheet/edit/:id', rejectUnauthenticated, (req, res) => {
    console.log('timesheet edit id', req.params.id);
    const queryText = `SELECT * FROM "timesheet"
    JOIN "client"
    ON "timesheet".t_client_id = "client".client_id
    WHERE "timesheet".timesheet_id = $1;`;
    const queryValues = [ req.params.id ];

    pool.query(queryText, queryValues)
    .then( result => {
        res.send(result.rows[0]);
        console.log('this is what we get from *EDITED* send email fetch!', result.rows[0]);
        console.log('this is req.user.email', req.user.email)

        const employeeEmail = req.user.email;
        const employeeName = `${req.user.first_name} ${req.user.last_name}`;
        const hours =  moment(result.rows[0].clock_out).diff(result.rows[0].clock_in, 'hours');
        const minutes = moment(result.rows[0].clock_out).diff(result.rows[0].clock_in, 'minutes') % 60;


        const employeeMessage = `Updated Time Sheet Submitted:
            Clock In: ${moment(result.rows[0].clock_in).format('lll')}
            Clock Out: ${moment(result.rows[0].clock_out).format('lll')}
            Client: ${result.rows[0].client_first_name} ${result.rows[0].client_last_name }
            Type of work: ${result.rows[0].work_type}
            Shift Notes: ${result.rows[0].notes}
            Time Worked: ${hours}:${minutes}
            `; //end of employeeMessage

            const adminMessage = `Updated Employee Time Sheet Submitted
            Time Sheet #: ${result.rows[0].timesheet_id}
            employee: ${employeeName}
            Clock In: ${moment(result.rows[0].clock_in).format('lll')}
            Clock Out: ${moment(result.rows[0].clock_out).format('lll')}
            Client: ${result.rows[0].client_first_name} ${result.rows[0].client_last_name }
            Type of work: ${result.rows[0].work_type}
            Shift Notes: ${result.rows[0].notes}
            Time Worked: ${hours}:${minutes}
            `; //end of adminMessage

        const emails = [ 
            { //Employee Email Version
            to: employeeEmail,
            from: 'ilcsdevs@gmail.com',
            subject: 'Updated Time Sheet Submitted',
            text: employeeMessage,
            // html: '<p>Hello HTML world!</p>',
            },
            { //Admin Email Version
                to: 'ilcsdevs@gmail.com',
                from: 'ilcsdevs@gmail.com',
                subject: 'Updated Employee Time Sheet Submitted',
                text: adminMessage,
                // html: '<p>Hello HTML world!</p>',
                },
            ];

        sgMail
        .send(emails)
        .then((response)=> console.log('email sent'))
        .catch((error)=> console.log('email not sent. error:', error.message));

        // res.sendStatus(201);
    }).catch( err => {
        console.log( err );
        res.sendStatus(500);
    })
});


module.exports = router;
