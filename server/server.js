const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const EmployeeDashboard = require('./routes/EmployeeDashboard.router')
const adminEmployeesViewRouter = require('./routes/adminemployeesview.router');
const currentEmployeeRouter = require('./routes/currentemployee.router');
const clientListRouter = require('./routes/clientlist.router');
const employeeRouter = require('./routes/employee.router')
const adminAllTimesheets = require('./routes/adminAllTimesheets.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/EmployeeDashboard', EmployeeDashboard);
app.use('/api/adminemployeesview', adminEmployeesViewRouter);
app.use('/api/currentemployee', currentEmployeeRouter);
app.use('/api/clientlist', clientListRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/adminAllTimesheets', adminAllTimesheets);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
