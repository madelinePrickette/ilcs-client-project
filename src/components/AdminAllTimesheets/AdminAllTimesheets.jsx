import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';

function AdminAllTimesheets() {

    useEffect(() => {
        fetchAdminAllTimesheets();
        fetchEmployeeList();
    }, []);

    const dispatch = useDispatch();
    const adminAllTimesheets = useSelector((store) => store.adminAllTimesheetsReducer);
    const employeeList = useSelector((store) => store.adminemployeesview)
    const [filter, setFilter] = useState({dateFrom: 'now ', dateTo: 'now', userId: 4});

    const fetchAdminAllTimesheets = () => {
        console.log('dispatching to adminAllTimesheets...')
        dispatch({
            type: 'FETCH_ADMIN_ALL_TIMESHEETS'
        })
    }

    const fetchEmployeeList = () => {
        console.log('fetching employee list...');
        dispatch({
            type: 'FETCH_EMPLOYEES_LIST'
        })
    }

    const handleFilterSubmit = (event) => {
        event.preventDefault();
        console.log('filtering...');

        dispatch({
            type: ' FETCH_FILTER',
            payload: filter
        })
    }

    const handleDateFromSelection = (event) => {
        setFilter({...filter, dateFrom: event.target.value})
    }

    const handleDateToSelection = (event) => {
        setFilter({...filter, dateTo: event.target.value})
    }

    const handleEmployeeSelection = (event) => {
        setFilter({...filter, userId: event.target.value})
    }

    console.log(filter);
    return(
        <div>
            <h1>ADMIN VIEWS ALL TIMEHSHEETS HERE</h1>
            {/* {JSON.stringify(adminAllTimesheets)} */}
            <form onSubmit={handleFilterSubmit}>
                <select onChange={handleDateFromSelection}>
                    <option></option>
                </select>

                <select onChange={handleDateToSelection}>
                    <option></option>
                </select>

                <select onChange={handleEmployeeSelection}>
                        <option value='0'>All Employees</option>
                    {employeeList.map((employee) => 
                        <option value={employee.id} key={employee.id}>{employee.first_name} {employee.last_name}</option>
                    )}
                </select>
                <button>Filter</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Employee Name</th>
                        <th>Client Name</th>
                        <th>Type</th>
                        <th>Clock in time</th>
                        <th>Clock out time</th>
                        <th>Hours worked</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                        {adminAllTimesheets.map((timesheet) => 
                            <tr key={timesheet.timesheet_id}>
                                <td>{timesheet.timesheet_id}</td>
                                <td>{timesheet.first_name} {timesheet.last_name}</td>
                                <td>{timesheet.client_first_name} {timesheet.client_last_name}</td>
                                <td>{timesheet.work_type}</td>
                                <td>{timesheet.clock_in}</td>
                                <td>{timesheet.clock_out}</td>
                                <td>hours worked: ???</td>
                                <td>status: ???</td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    )
}

export default AdminAllTimesheets;