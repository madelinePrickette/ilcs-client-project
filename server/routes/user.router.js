const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const clearance_level = req.body.clearance_level;
  const email = req.body.email;
  const pic = req.body.pic;
  const user_active = req.body.user_active;

  const queryText = `INSERT INTO "user" ("first_name", "last_name", "username", "password", "clearance_level", "email", "pic", "user_active")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;
  pool
    .query(queryText, [ first_name, last_name, username, password, clearance_level, email, pic, user_active ])
    .then(response => res.send(response))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

router.post('/register/newuser', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const clearance_level = req.body.clearance_level;
  const email = req.body.email;
  const pic = req.body.pic;
  const user_active = req.body.user_active;

  const queryText = `INSERT INTO "user" ("first_name", "last_name", "username", "password", "clearance_level", "email", "pic", "user_active")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;
    
    
    `;
  pool
    .query(queryText, [ first_name, last_name, username, password, clearance_level, email, pic, user_active ])
    .then(response => res.send(response.rows[0]))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});


// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
