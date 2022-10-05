import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import {
  FormGroup,
  useMediaQuery,
  useTheme,
  Select,
  TextField,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

function EditEmployee() {
  useEffect(() => {
    dispatch({ type: "FETCH_CURRENT_EMPLOYEE", payload: params.employeeid });
    dispatch({ type: "FETCH_CLIENT_LIST", payload: params.employeeid });
  }, []);
  const history = useHistory();
  const params = useParams();
  const employeeInfo = useSelector((store) => store.employeedetails);
  const clientList = useSelector((store) => store.clientlist.clientList);
  const [active, setActive] = useState(employeeInfo.user_active);
  const dispatch = useDispatch();

  const unassignClient = (clientID) => {
    dispatch({
      type: "UNASSIGN_CLIENT",
      payload: {
        client: Number(clientID),
        employee: Number(params.employeeid),
      },
    });
  };

  const changeFirstName = (event) => {
    setNewEmployeeInfo({ ...newEmployeeInfo, firstname: event.target.value });
  };

  const changeLastName = (event) => {
    setNewEmployeeInfo({ ...newEmployeeInfo, lastname: event.target.value });
  };

  const changeUsername = (event) => {
    setNewEmployeeInfo({ ...newEmployeeInfo, username: event.target.value });
  };

  const changeClearanceLevel = (event) => {
    setNewEmployeeInfo({ ...newEmployeeInfo, clearancelevel: event.target.value });
  };

  const changeEmail = (event) => {
    setNewEmployeeInfo({ ...newEmployeeInfo, email: event.target.value });
  };

  const changePicture = (event) => {
    setNewEmployeeInfo({ ...newEmployeeInfo, picture: event.target.value });
  };

  const assignClient = (clientID) => {
    dispatch({
      type: "ASSIGN_CLIENT",
      payload: {
        client: Number(clientID),
        employee: Number(params.employeeid),
      },
    });
  };

  const clickCancel = () => {
    history.push(`/employee/${params.employeeid}`);
  };

  const clickSubmit = () => {
    console.log(newEmployeeInfo)
    dispatch({ type: 'SAVE_NEW_EMPLOYEE_INFO', payload: {employeeid: params.employeeid, info: newEmployeeInfo} })
    history.push(`/employee/${params.employeeid}`)
  }

  const clickCheck = () => {
    setActive(!active);
    setNewEmployeeInfo({ ...newEmployeeInfo, active: !active });
   }

  const [newEmployeeInfo, setNewEmployeeInfo] = useState({
    firstname: employeeInfo.first_name,
    lastname: employeeInfo.last_name,
    username: employeeInfo.username,
    clearancelevel: employeeInfo.clearance_level,
    email: employeeInfo.email,
    picture: employeeInfo.pic,
    active: employeeInfo.user_active
  });

  return (
    <div>
      <div className="clientEditTop">
        <div
          className="clientEditTop-Left"
          style={{ width: "60%", paddingLeft: "20px", paddingBottom: '20px' }}
        >
          <FormGroup>
            <div className="inputDiv">
              <label
                style={{ lineHeight: "3", marginRight: "10px", marginBottom: '0px' }}
                className="label"
              >
                First name
              </label>
              <TextField
                fullWidth
                style={{marginTop: '-10px'}}
                variant="outlined"
                defaultValue={employeeInfo.first_name}
                onChange={changeFirstName}
              />

              <label
                style={{ lineHeight: "3", marginRight: "10px" }}
                className="label"
              >
                Last name
              </label>
              <TextField
                fullWidth
                style={{marginTop: '-10px'}}
                variant="outlined"
                defaultValue={employeeInfo.last_name}
                onChange={changeLastName}
              />

              <label
                style={{ lineHeight: "3", marginRight: "10px", marginBottom: '0px' }}
                className="label"
              >
                Username
              </label>
              <TextField
                fullWidth
                style={{marginTop: '-10px'}}
                variant="outlined"
                defaultValue={employeeInfo.username}
                onChange={changeUsername}
              />

              <label
                style={{ lineHeight: "3", marginRight: "10px" }}
                className="label"
              >
                Clearance level
              </label>
              <TextField
                fullWidth
                style={{marginTop: '-10px'}}
                variant="outlined"
                defaultValue={employeeInfo.clearance_level}
                onChange={changeClearanceLevel}
              />

              <label
                style={{ lineHeight: "3", marginRight: "10px" }}
                className="label"
              >
                Email
              </label>
              <TextField
                fullWidth
                style={{marginTop: '-10px'}}
                variant="outlined"
                defaultValue={employeeInfo.email}
                onChange={changeEmail}
              />

              <label
                style={{ lineHeight: "3", marginRight: "10px" }}
                className="label"
              >
                Picture
              </label>
              <TextField
                fullWidth
                style={{marginTop: '-10px'}}
                variant="outlined"
                defaultValue={employeeInfo.pic}
                onChange={changePicture}
              />

              <label
                style={{ lineHeight: "3", marginRight: "10px" }}
                className="label"
              >
                Active
              </label>
                <input type="checkbox" checked={active}
                onChange={clickCheck}
                />
            </div>
          </FormGroup>
        </div>

        <div style={{ width: "60%", paddingRight: "20px", paddingLeft: "20px", paddingBottom: '20px'  }}>
          <div style={{textAlign: 'center'}}>
          <h1>Client List</h1>
          </div>
          {clientList.map((client) => {
            return (
              <div key={client.client_id}>
                {client.j_user_id == params.employeeid && (
                  <h1
                    onClick={() => {
                      unassignClient(client.client_id);
                    }}
                    style={{ backgroundColor: "red" }}
                  >
                    {client.client_first_name}
                  </h1>
                )}
                {client.j_user_id != params.employeeid && (
                  <h1
                    onClick={() => {
                      assignClient(client.client_id);
                    }}
                  >
                    {client.client_first_name}
                  </h1>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ textAlign: "center" }} className="clientEditBottom">
        <Button 
          onClick={clickCancel} 
          variant="contained"
          style={{margin: '10px'}}
        >
          Cancel
        </Button>
        <Button 
          onClick={clickSubmit}
          variant="contained"
          style={{margin: '10px'}}
        >Submit</Button>
      </div>
    </div>
  );
}

export default EditEmployee;
