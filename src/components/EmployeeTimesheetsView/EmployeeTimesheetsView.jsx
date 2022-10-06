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
    const timesheets = useSelector( store => store.employeeAllTimesheets )
    console.log(timesheets)
    const getTimesheets = () => {
        dispatch({
            type: 'GET_EMPLOYEE_TIMESHEETS'
        })
    }

    let minutesSum = 0;

    return(
        <div>
            <h1>Employee Timesheets View</h1>
            {timesheets && timesheets.map(timesheet => {
                let outTime = moment(timesheet.clock_out);
                let inTime = moment(timesheet.clock_in);
                let total = moment.duration(outTime.diff(inTime)).asMinutes();
                let hours =  Math.floor(total / 60)
                let minutes = Math.floor(total % 60);
                if (minutes < 10){minutes = "0"+minutes};

                if (total > 0) {
                    minutesSum = minutesSum + total;
                }
               
                return (
                    <div key={timesheet.timesheet_id}>
                        <h1>Client: {timesheet.client_first_name}</h1>
                        <p>Clock in: {moment(timesheet.clock_in).format('lll')}</p>
                        <p>Clock out: {moment(timesheet.clock_out).format('lll')}</p>
                        <p>Time worked: {hours}:{minutes}</p>
                    </div>
                )
            })}

        {Math.floor(minutesSum % 60) < 10 ? 
        <h1>Total = {Math.floor(minutesSum / 60)}:0{Math.floor(minutesSum % 60)}</h1>
        :
        <h1>Total = {Math.floor(minutesSum / 60)}:{Math.floor(minutesSum % 60)}</h1>
        }
            
        </div>
    )
}

export default EmployeeTimesheetsView;