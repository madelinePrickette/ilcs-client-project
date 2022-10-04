import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';

function EmployeeDashboard() {

  useEffect(() => {
    fetchEmployeeClients();
  }, []);

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const employeesClientList =  useSelector( (store) => store.employeeClientsReducer)

  const fetchEmployeeClients = () => {
    console.log('fetching clients for this employee...');
    dispatch({
      type: 'FETCH_CLIENT_EMPLOYEES'
    })
  }

  console.log(employeesClientList);
  console.log(user);
  return (
    <div className="container">
      <h2>Welcome, {user.first_name} {user.last_name}</h2>
      <ul>
        {employeesClientList.map((client) =>
          <li key={client.client_id}>{client.client_first_name} {client.client_last_name}</li>
        )}
      </ul>
      <LogOutButton className="btn" />
      {/* {JSON.stringify(employeesClientList)} */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default EmployeeDashboard;
