import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import './EmployeeDashboard.css'

function EmployeeDashboard() {

  useEffect(() => {
    fetchEmployeeClients();
  }, []);

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const employeesClientList =  useSelector( (store) => store.employeeClientsReducer)
  const history = useHistory();

  const fetchEmployeeClients = () => {
    console.log('fetching clients for this employee...');
    dispatch({
      type: 'FETCH_CLIENT_EMPLOYEES'
    })
  }

  const goToClockIn = (clientId) => {
    history.push(`/employeeClockIn/${clientId}`)
  }

  console.log(employeesClientList);
  console.log(user);
  return (
    <div className="container">
      <h2>Welcome, {user.first_name} {user.last_name}</h2>
        {employeesClientList.map((client) =>
          <div className='client-listings' key={client.client_id}>
            <p className='client-text' onClick={() => goToClockIn(client.client_id)}>{client.client_first_name} {client.client_last_name}</p>
          </div>
        )}
      {/* <LogOutButton className="btn" /> */}
      {/* {JSON.stringify(employeesClientList)} */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default EmployeeDashboard;
