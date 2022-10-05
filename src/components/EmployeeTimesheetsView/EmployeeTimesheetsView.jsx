import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";

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

    
    return(
        <div>
            <h1>Employee Timesheets View</h1>
            {timesheets && timesheets.map(timesheet => {
                let total = timesheet.clock_out - timesheet.clock_in;
                return (
                    <div key={timesheet.timesheet_id}>
                        <h1>Client: {timesheet.client_first_name}</h1>
                        <p>{timesheet.clock_in}</p>
                        <p>{timesheet.clock_out}</p>
                        <p>hours worked: {total}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default EmployeeTimesheetsView;