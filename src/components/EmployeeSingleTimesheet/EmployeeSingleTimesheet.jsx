import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Select, TextField, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

function EmployeeSingleTimesheet() {
  const timesheet = useSelector(
    (store) => store.employeeAllTimesheets.employeeSingleTimesheet
  );
  const dispatch = useDispatch();
  const params = useParams();
  const [editing, setEditing] = useState(false);
  const employeeClients = useSelector(
    (store) => store.clientlist.employeeClientList
  );
  console.log("params", params);
  console.log("employee clients list", employeeClients);

  const clickEdit = () => {
    setEditing(!editing);
  };

  const clickSave = () => {
    setEditing(!editing);
  };

  useEffect(() => {
    dispatch({
      type: "GET_SINGLE_EMPLOYEE_TIMESHEET",
      payload: { timesheet: params.timesheetid, employee: params.employeeid },
    });
    dispatch({
      type: "FETCH_EMPLOYEE_CLIENT_LIST",
      payload: params.employeeid,
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {editing ? (
        <div>
          <h3>User ID: {timesheet.t_user_id}</h3>
          <Select style={{ width: "70%" }} value={timesheet.t_client_id}>
            {employeeClients &&
              employeeClients.map((client) => {
                return (
                  <MenuItem key={client.client_id} value={client.client_id}>
                    {client.client_first_name}
                  </MenuItem>
                );
              })}
          </Select>
          <h3>Clock-in time: {timesheet.clock_in}</h3>
          <h3>Clock-out time: {timesheet.clock_out}</h3>
          <h3>Work type: {timesheet.work_type}</h3>
          <h3>Notes: {timesheet.notes}</h3>
        </div>
      ) : (
        <div className="singleTimeSheetInfoDiv">
          <h3>User ID: {timesheet.t_user_id}</h3>
          <h3>Client ID: {timesheet.t_client_id}</h3>
          <h3>Clock-in time: {timesheet.clock_in}</h3>
          <h3>Clock-out time: {timesheet.clock_out}</h3>
          <h3>Work type: {timesheet.work_type}</h3>
          <h3>Notes: {timesheet.notes}</h3>
        </div>
      )}
      {editing ? (
        <Button onClick={clickSave} variant="contained">
          Save
        </Button>
      ) : (
        <Button onClick={clickEdit} variant="contained">
          Edit
        </Button>
      )}
    </div>
  );
}

export default EmployeeSingleTimesheet;
