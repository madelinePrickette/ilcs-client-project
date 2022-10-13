import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Select, TextField, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import './AdminSingleTimesheet.css'
const moment = require('moment');

function AdminSingleTimesheet() {
  useEffect(() => {
    dispatch({
      type: "GET_ADMIN_SINGLE_TIMESHEET",
      payload: { timesheet: params.timesheetid },
    });
    dispatch({
      type: "FETCH_EMPLOYEE_CLIENT_LIST",
      payload: params.employeeid,
    });
  }, []);

  const timesheet = useSelector(
    (store) => store.adminSingleTimesheet
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const [editing, setEditing] = useState(false);
  const [clientSelect, setClientSelect] = useState(timesheet.t_client_id)
  const [newNotes, setNewNotes] = useState(timesheet.notes)
  const [newWorkType, setNewWorkType] = useState(timesheet.work_type)
  const [clockInValue, setClockInValue] = useState(moment(timesheet.clock_in).format('YYYY-MM-DD HH:mm:00.000000'));
  const [clockOutValue, setClockOutValue] = useState(moment(timesheet.clock_out).format('YYYY-MM-DD HH:mm:00.000000'));
  const location_1 = timesheet.loc_1;
  const location_2 = timesheet.loc_2;
  const employeeClients = useSelector(
    (store) => store.clientlist.employeeClientList
  );

  let outTime = moment(timesheet.clock_out);
  let inTime = moment(timesheet.clock_in);
  let total = moment.duration(outTime.diff(inTime)).asMinutes();
  let hours =  Math.floor(total / 60)
  let minutes = Math.floor(total % 60);

  const clickEdit = () => {
    setClockInValue(moment(timesheet.clock_in).format('YYYY-MM-DD HH:mm:00.000000'));setClockOutValue(moment(timesheet.clock_out).format('YYYY-MM-DD HH:mm:00.000000'));
    setEditing(!editing);
    setClockInValue(moment(timesheet.clock_in).format('YYYY-MM-DD HH:mm:00.000000'));
    setClockOutValue(moment(timesheet.clock_out).format('YYYY-MM-DD HH:mm:00.000000'));
    setClientSelect(timesheet.t_client_id);
    setNewWorkType(timesheet.work_type);
  };

  const clickDelete = () => {
    dispatch({ type: 'DELETE_TIMESHEET', payload: {timesheet: params.timesheetid}})
    history.push('/adminAllTimesheets');
  };

  const clickSave = () => {
    dispatch({ type: 'ADMIN_UPDATE_TIMESHEET', payload: { timesheet: params.timesheetid, client: clientSelect, notes: newNotes, work_type: newWorkType, clock_in: clockInValue, clock_out: clockOutValue } })
    setEditing(!editing);
  };

  const clickRead = () => {
    dispatch({type: 'MARK_AS_READ', payload: {timesheetid: params.timesheetid, history: history} })
  }

  const changeClient = (event) => {
    setClientSelect(event.target.value)
  }

  const changeNotes = (event) => {
    setNewNotes(event.target.value);
  }

  const changeWorkType = (event) => {
    setNewWorkType(event.target.value);
  }

  const changeClockIn = (newValue) => {
    console.log(moment(newValue).format('YYYY-MM-DD HH:mm:00.000000'));
    setClockInValue(moment(newValue).format('YYYY-MM-DD HH:mm:00.000000'));
  }

  const changeClockOut = (newValue) => {
    console.log(moment(newValue).format('YYYY-MM-DD HH:mm:00.000000'));
    setClockOutValue(moment(newValue).format('YYYY-MM-DD HH:mm:00.000000'));
  }


  return (
    <div className="single-timesheet-container" style={{ padding: "20px" }}>
      {editing ? (
        <div>
          <h3>Employee: {timesheet.first_name} {timesheet.last_name}</h3>
          <Select style={{ width: "100%" }} defaultValue={timesheet.t_client_id} onChange={changeClient}>
            <MenuItem value={0}>Select a client</MenuItem>
            {employeeClients &&
              employeeClients.map((client) => {
                return (
                  <MenuItem key={client.client_id} value={client.client_id}>
                    {client.client_first_name}
                  </MenuItem>
                );
              })}
          </Select>
          <br/>
          <br/>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Clock-in time:"
                    value={clockInValue}
                    onChange={(newValue) => {
                    changeClockIn(newValue);
                    }}
                />
            </LocalizationProvider>
          <br/>
          <br/>
          <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Clock-out time:"
                    value={clockOutValue}
                    onChange={(newValue) => {
                    changeClockOut(newValue);
                    }}
                />
            </LocalizationProvider>
          <h3>Work type:</h3>
          <Select style={{ width: "100%" }} defaultValue={timesheet.work_type} onChange={changeWorkType}>
            <MenuItem value={0}>Select a Work Type</MenuItem>
            <MenuItem value={'HSA - 20.00'}>HSA - 20.00</MenuItem>
            <MenuItem value={'PCA - 15.00'}>PCA - 15.00</MenuItem>
          </Select>
          <h3>Notes:</h3>
          <TextField 
            defaultValue={timesheet.notes}
            multiline
            style={{ width: "100%", marginBottom: '15px'}}
            variant="outlined"
            onChange={changeNotes}
          />
        </div>
      ) : (
        <div className="singleTimeSheetInfoDiv">
          <h3>Employee: {timesheet.first_name} {timesheet.last_name}</h3>
          <h3>Client Name: {timesheet.client_first_name} {timesheet.client_last_name}</h3>
          <h3>Clock-in time: {moment(timesheet.clock_in).format('lll')}</h3>
          {timesheet.clock_out ? <h3>Clock-out time: {moment(timesheet.clock_out).format('lll')}</h3>
          :
          <h3>Clock-out time: Pending</h3>
          }
          {timesheet.clock_out ?
          <h3>Time worked: {hours}:{minutes>9 ? minutes : '0'+minutes}</h3>
          :
          <h3>Time worked: Pending</h3>
          }
          <h3>Clock-in location: {location_1}</h3>
          <h3>Clock-out location: {location_2}</h3>
          <h3>Work type: {timesheet.work_type}</h3>
          <h3>Notes: {timesheet.notes}</h3>
        </div>
      )}
      {editing ? (
        <div>
        <Button variant='contained' onClick={() => {setEditing(!editing)}}>Cancel</Button> 
        
        <Button onClick={clickSave} variant="contained">
          Save
        </Button>
        </div>
      ) : (
        <div>
            <Button onClick={clickEdit} variant="contained">
            Edit
            </Button>
            <Button onClick={clickDelete} variant="contained">
            Delete
            </Button>
            {timesheet.notification ? 
            <Button onClick={clickRead} style={{border: '2px solid #57C148'}} variant="contained">
            Mark as read
            </Button> : <></>}
        </div>
      )}
    </div>
  );
}

export default AdminSingleTimesheet;
