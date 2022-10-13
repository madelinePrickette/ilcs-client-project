import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from "@material-ui/core/";

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import EmployeeDashboard from '../EmployeeDashboard/EmployeeDashboard';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import AdminAddClient from '../AdminAddClient/AdminAddClient';
import AdminAllClients from '../AdminAllClients/AdminAllClients';
import AdminEmployeesView from '../AdminEmployeesView/AdminEmployeesView';
import EmployeeDetails from '../EmployeeDetails/EmployeeDetails';
import EditEmployee from '../EditEmployee/EditEmployee';
import EmployeeClockIn from '../EmployeeClockIn/EmployeeClockIn';
import AdminAllTimesheets from '../AdminAllTimesheets/AdminAllTimesheets';
import EmployeeTimesheetsView from '../EmployeeTimesheetsView/EmployeeTimesheetsView';
import EmployeeSingleTimesheet from '../EmployeeSingleTimesheet/EmployeeSingleTimesheet';
import RegistrationPage from '../RegisterPage/RegistrationPage';
import AdminSingleTimesheet from '../AdminSingleTimesheet/AdminSingleTimesheet';


import './App.css';
// import EmployeeLogIn from '../EmployeeClockIn/EmployeeClockIn';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1FBED6",
      },
      secondary: {
        main: "#ffffff",
      },
    },
    tab: {
      color: "#ffffff",
    },
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div className="appDiv">
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/all-employees"
          >
            <AdminEmployeesView />
          </Route>

          <ProtectedRoute
            // shows AboutPage at all times (logged in or not)
            exact
            path="/employee/:employeeid"
          >
            <EmployeeDetails />
          </ProtectedRoute>

          <ProtectedRoute
            // shows AboutPage at all times (logged in or not)
            exact
            path="/editemployee/:employeeid"
          >
            <EditEmployee />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/user/timesheets"
          >
            <EmployeeTimesheetsView />
          </ProtectedRoute>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/employeeDashboard"
          >
            {/* Dashboard for admins should be all timesheets view */}
            {user.clearance_level > 0 ?
            <AdminAllTimesheets/> : <EmployeeDashboard /> }
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>
          
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/all-clients"
          >
           {user.clearance_level == 1 ? <AdminAllClients /> : <Redirect to='/' /> }
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/employeeClockIn/:id"
          >
            <EmployeeClockIn />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/adminAllTimesheets"
          >
            <AdminAllTimesheets />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/timesheet/:employeeid/:timesheetid"
          >
            
            <EmployeeSingleTimesheet />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/admin/timesheet/:employeeid/:timesheetid"
          >
            {user.clearance_level == 1 ? <AdminSingleTimesheet /> : <Redirect to='/' /> }
            
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/employeeDashboard" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.clearance_level != 1 ?
              // Only admins can register users
              // redirect them to the /user page if not an admin
              <Redirect to="/employeeDashboard" />
              :
              // Otherwise, show the registration page
              // <RegisterPage />
              <RegistrationPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/employeeDashboard" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

                    <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
        
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
