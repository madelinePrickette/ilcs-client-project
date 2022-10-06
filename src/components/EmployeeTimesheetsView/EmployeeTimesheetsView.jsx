import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const moment = require('moment');
var momentPreciseRangePlugin = require("moment-precise-range-plugin");

function EmployeeTimesheetsView() {

    useEffect( () => {
        getTimesheets();
    }, [])

    const dispatch = useDispatch();
    const timesheets = useSelector( store => store.employeeAllTimesheets.employeeClockInStatus )
    const getTimesheets = () => {
        dispatch({
            type: 'GET_EMPLOYEE_TIMESHEETS'
        })
    }
    
    return(
        <div>
            <h1>Employee Timesheets View</h1>
            {timesheets && timesheets.map(timesheet => {
                let outTime = moment(timesheet.clock_out);
                let inTime = moment(timesheet.clock_in);

                let total = moment.preciseDiff(outTime, inTime, true); 
                // console.log(total);

                return (
                    <div key={timesheet.timesheet_id}>
                        <h1>Client: {timesheet.client_first_name}</h1>
                        <p>Clock in: {moment(timesheet.clock_in).format('lll')}</p>
                        <p>Clock out: {moment(timesheet.clock_out).format('lll')}</p>
                        <p>Time worked: {total.hours}:{total.minutes}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default EmployeeTimesheetsView;