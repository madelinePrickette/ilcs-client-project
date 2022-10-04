import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';

function AdminAllTimesheets() {

    useEffect(() => {
        fetchAdminAllTimesheets();
    }, []);

    const dispatch = useDispatch();
    const adminAllTimesheets = useSelector((store) => store.adminAllTimesheetsReducer)

    const fetchAdminAllTimesheets = () => {
        console.log('dispatching to adminAllTimesheets...')
        dispatch({
            type: 'FETCH_ADMIN_ALL_TIMESHEETS'
        })
    }

    return(
        <div>
            <h1>ADMIN VIEWS ALL TIMEHSHEETS HERE</h1>
            {/* {JSON.stringify(adminAllTimesheets)} */}
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