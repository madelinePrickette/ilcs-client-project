import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function EmployeeSingleTimesheet(){
  const timesheet = useSelector(store => store.employeeAllTimesheets.employeeSingleTimesheet)
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch({type: 'GET_SINGLE_EMPLOYEE_TIMESHEET', payload: {timesheet: params.timesheetid, employee: params.employeeid}});
  }, []);

  return (
    <div>
    <h3>User ID: {timesheet.t_user_id}</h3>
    <h3>Client ID: {timesheet.t_client_id}</h3>
    <h3>Clock-in time: {timesheet.clock_in}</h3>
    <h3>Clock-out time: {timesheet.clock_out}</h3>
    <h3>Location 1: ({timesheet.loc_1.x}, {timesheet.loc_1.y})</h3>
    <h3>Location 2: ({timesheet.loc_2.x}, {timesheet.loc_2.y})</h3>
    <h3>Work type: {timesheet.work_type}</h3>
    <h3>Notes: {timesheet.notes}</h3>
    </div>
  )
}

export default EmployeeSingleTimesheet;