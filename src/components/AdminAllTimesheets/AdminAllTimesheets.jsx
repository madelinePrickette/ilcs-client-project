import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';

//mui for calendar
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

function AdminAllTimesheets() {

    useEffect(() => {
        initialTimesheetDisplay();
        fetchEmployeeList();
    }, []);

    const dispatch = useDispatch();
    const employeeList = useSelector((store) => store.adminemployeesview);
    const timesheetList = useSelector((store) => store.adminTimesheetsReducer);
    const [filter, setFilter] = useState({dateFrom: '', dateTo: '', userId: 0});

    const fetchEmployeeList = () => {
        console.log('fetching employee list...');
        dispatch({
            type: 'FETCH_EMPLOYEES_LIST'
        })
    }

    const initialTimesheetDisplay = () => {
        //this does the first post with the 14 days prior to today, and all employees on load.
        //0 means all employees, conditional query in the router
        console.log('initial timesheets displaying...')
        dispatch({
            type: 'FETCH_FILTER',
            payload: {dateFrom: '2022-09-25', dateTo: '2022-10-08', userId: 0}
        })
    }

    const handleFilterSubmit = (event) => {
        //this handles all filtering decisions made from the admin after the initial page load.
        event.preventDefault();
        console.log('filtering...');
        dispatch({
            type: 'FETCH_FILTER',
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

    //MUI CALENDAR NECESSARY STYLES
    const useStyles = makeStyles((theme) => ({
        container: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        textField: {
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          width: 200,
        },
      }));
    const classes = useStyles();
    //END OF MUI CALENDAR STYLES

    console.log(filter);
    return(
        <div>
            <h1>ADMIN VIEWS ALL TIMESHEETS HERE</h1>
            <form onSubmit={handleFilterSubmit}>
                {/* MUI CALENDAR DATE FROM */}
                    <form className={classes.container} noValidate onChange={handleDateFromSelection}>
                        <TextField
                            id="dateFrom"
                            label="Date From"
                            type="date"
                            defaultValue="2022-10-01"
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </form>
                {/* EMD OF MUI CALENDAR DATE FROM */}

                {/* MUI CALENDAR DATE TO */}
                    <form className={classes.container} noValidate onChange={handleDateToSelection}>
                        <TextField
                            id="dateTo"
                            label="Date To"
                            type="date"
                            defaultValue="2022-10-05"
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </form>
                {/* END OF MUI CALENDAR DATE TO */}

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
                        {timesheetList.map((timesheet) => 
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