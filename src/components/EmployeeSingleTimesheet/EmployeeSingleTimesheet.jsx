import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Select, TextField, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./EmployeeSingleTimesheet.css";
import moment from "moment";

//This component is reached from the employee side of the app. Employees can edit the client and the notes of a single timesheet after clicking the edit button.

function EmployeeSingleTimesheet() {
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

  //Const variables
  const employeeClients = useSelector(
    (store) => store.clientlist.employeeClientList
  );
  const timesheet = useSelector(
    (store) => store.employeeAllTimesheets.employeeSingleTimesheet
  );

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  //Check to see if the edit button has been clicked, if so, set editing to true.
  const [editing, setEditing] = useState(false);
  const [clientSelect, setClientSelect] = useState(timesheet.t_client_id);
  const [newNotes, setNewNotes] = useState(timesheet.notes);
  //Store that contains the clients the employee is currently working with.

  let outTime = moment(timesheet.clock_out);
  let inTime = moment(timesheet.clock_in);
  let total = moment.duration(outTime.diff(inTime)).asMinutes();
  let hours = Math.floor(total / 60);
  let minutes = Math.floor(total % 60);

  //Const functions

  const clickEdit = () => {
    setClientSelect(timesheet.t_client_id);
    setEditing(!editing);
  };

  const clickSave = () => {
    dispatch({
      type: "EMPLOYEE_TIMESHEET_CHANGES",
      payload: {
        timesheet: params.timesheetid,
        client: clientSelect,
        notes: newNotes,
      },
    });
    setEditing(!editing);
  };

  const changeClient = (event) => {
    setClientSelect(event.target.value);
  };

  const changeNotes = (event) => {
    setNewNotes(event.target.value);
  };

  return (
    <div
      className="mobile-single-timesheet-container"
      style={{ padding: "20px" }}
    >
      {editing ? (
        <div>
          <Select
            style={{ width: "95%" }}
            defaultValue={clientSelect}
            onChange={changeClient}
          >
            {employeeClients &&
              employeeClients.map((client) => {
                return (
                  <MenuItem key={client.client_id} value={client.client_id}>
                    {client.client_first_name} {client.client_last_name}
                  </MenuItem>
                );
              })}
          </Select>
          <h3>
            Clock-in: {moment(timesheet.clock_in).format("DD/MM/YYYY LT")}
          </h3>
          <h3>
            Clock-out: {moment(timesheet.clock_out).format("DD/MM/YYYY LT")}
          </h3>
          <h3>
            Time worked: {hours}:{minutes > 9 ? minutes : "0" + minutes}
          </h3>
          <h3>Work type: {timesheet.work_type}</h3>
          <h3>Notes:</h3>
          <TextField
            defaultValue={timesheet.notes}
            multiline
            style={{ width: "95%", marginBottom: "15px" }}
            variant="outlined"
            onChange={() => changeNotes(event)}
          />
        </div>
      ) : (
        <div className="singleTimeSheetInfoDiv">
          <h3>
            Client: {timesheet.client_first_name} {timesheet.client_last_name}
          </h3>
          <h3>
            Clock-in: {moment(timesheet.clock_in).format("DD/MM/YYYY LT")}
          </h3>
          {timesheet.clock_out? 
          <div>
            <h3>
              Clock-out: {moment(timesheet.clock_out).format("DD/MM/YYYY LT")}
            </h3>
            <h3>
              Time worked: {hours}:{minutes > 9 ? minutes : "0" + minutes}
            </h3>
          </div>
          :
          <div>
            <h3>
              Clock-out: Pending
            </h3>
            <h3>
              Time worked: Pending
            </h3>
          </div>
          }
          <h3>Work type: {timesheet.work_type}</h3>
          <h3>Notes: {timesheet.notes}</h3>
        </div>
      )}
      {editing ? (
        <div>
          <Button
            variant="contained"
            onClick={() => {
              setEditing(!editing);
            }}
          >
            Cancel
          </Button>

          <Button onClick={clickSave} variant="contained">
            Save
          </Button>
        </div>
      ) : (
        //Show edit button only if timesheet isn't older than 7 days.
        <div>
          {moment().diff(timesheet.clock_out, 'days') < 7 ? 
          <Button onClick={clickEdit} variant="contained">
            Edit
          </Button> : <></> }
        </div>
      )}
    </div>
  );
}

export default EmployeeSingleTimesheet;
