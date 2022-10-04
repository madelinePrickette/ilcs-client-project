import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

function EmployeeDashboard() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  console.log(user);
  return (
    <div className="container">
      <h2>Welcome, {user.first_name} {user.last_name}</h2>
      <p>[CLIENTS HERE]</p>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default EmployeeDashboard;
