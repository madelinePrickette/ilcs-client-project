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

//This component is only accessible by admins when clicking on the "Add new employee" button from the employees list view. Admins can enter information of the new employee as well as assign clients right away. Users who are created are automatically set to be active.

function NewEmployee() {

  useEffect(() => {
    dispatch({ type: "FETCH_CLIENTS" });
  }, []);

  //Const variables

  const history = useHistory();
  const params = useParams();
  const clientList = useSelector((store) => store.adminClients);
  const dispatch = useDispatch();
  const [activeClients, setActiveClients] = useState([]);
  const [newEmployeeInfo, setNewEmployeeInfo] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    clearancelevel: 0,
    email: "",
    picture: "",
    active: true,
  });

  //Const functions

  const changeFirstName = (event) => {
    setNewEmployeeInfo({ ...newEmployeeInfo, firstname: event.target.value });
  };

  const changeLastName = (event) => {
    setNewEmployeeInfo({ ...newEmployeeInfo, lastname: event.target.value });
  };

  const changeUsername = (event) => {
    setNewEmployeeInfo({ ...newEmployeeInfo, username: event.target.value });
  };

  const changePassword = (event) => {
    setNewEmployeeInfo({ ...newEmployeeInfo, password: event.target.value });
  };

  const changeClearanceLevel = (event) => {
    setNewEmployeeInfo({
      ...newEmployeeInfo,
      clearancelevel: event.target.value,
    });
  };

  const changeEmail = (event) => {
    setNewEmployeeInfo({ ...newEmployeeInfo, email: event.target.value });
  };

  const changePicture = (event) => {
    setNewEmployeeInfo({ ...newEmployeeInfo, picture: event.target.value });
  };

  const clickCancel = () => {
    history.push(`/employee/${params.employeeid}`);
  };

  const clickSubmit = () => {
    if (newEmployeeInfo.username === "" || newEmployeeInfo.password === "") {
      alert("Please fill all required fields.");
      return 0;
    } else {
      dispatch({
        type: "CREATE_NEW_USER",
        payload: {
          username: newEmployeeInfo.username,
          password: newEmployeeInfo.password,
          first_name: newEmployeeInfo.firstname,
          last_name: newEmployeeInfo.lastname,
          clearance_level: newEmployeeInfo.clearancelevel,
          email: newEmployeeInfo.email,
          pic: newEmployeeInfo.picture,
          user_active: true,
          clients: activeClients,
          history: history,
        },
      });
    }
  };

  const assignClient = (clientid) => {
    setActiveClients([...activeClients, clientid]);
  };

  const unassignClient = (clientid) => {
    setActiveClients((current) =>
      current.filter((id) => {
        return id !== clientid;
      })
    );
  };

  return (
    <div>
      <div className="clientEditTop">
        <div
          className="clientEditTop-Left"
          style={{ width: "60%", paddingLeft: "20px", paddingBottom: "20px" }}
        >
          <FormGroup>
            <div className="inputDiv">
              <label
                style={{
                  lineHeight: "3",
                  marginRight: "10px",
                  marginBottom: "0px",
                }}
                className="label"
              >
                First name
              </label>
              <TextField
                fullWidth
                style={{ marginTop: "-10px" }}
                variant="outlined"
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
                style={{ marginTop: "-10px" }}
                variant="outlined"
                onChange={changeLastName}
              />

              <label
                style={{
                  lineHeight: "3",
                  marginRight: "10px",
                  marginBottom: "0px",
                }}
                className="label"
              >
                Username
              </label>
              <TextField
                fullWidth
                style={{ marginTop: "-10px" }}
                variant="outlined"
                onChange={changeUsername}
              />

              <label
                style={{
                  lineHeight: "3",
                  marginRight: "10px",
                  marginBottom: "0px",
                }}
                className="label"
              >
                Password
              </label>
              <TextField
                fullWidth
                type="password"
                style={{ marginTop: "-10px" }}
                variant="outlined"
                onChange={changePassword}
              />

              <label
                style={{ lineHeight: "3", marginRight: "10px" }}
                className="label"
              >
                Clearance level
              </label>
              <p></p>

              <Select
                style={{ width: "40%", marginTop: "0px" }}
                defaultValue={0}
                onChange={changeClearanceLevel}
              >
                <MenuItem value={0}>Employee</MenuItem>
                <MenuItem value={1}>Admin</MenuItem>
              </Select>

              <p></p>
              <label
                style={{ lineHeight: "3", marginRight: "10px" }}
                className="label"
              >
                Email
              </label>
              <TextField
                fullWidth
                style={{ marginTop: "-10px" }}
                variant="outlined"
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
                style={{ marginTop: "-10px" }}
                variant="outlined"
                onChange={changePicture}
              />
            </div>
          </FormGroup>
        </div>

        <div
          style={{
            width: "60%",
            paddingRight: "20px",
            paddingLeft: "20px",
            paddingBottom: "20px",
          }}
        >
          <div style={{ marginBottom: '5px', textAlign: 'left'}}>
            <p>Client List</p>
          </div>
          <div
            className="activeClients"
            style={{ border: "1px black solid", padding: "10px", border: "1px #C4C4C4 solid", padding: "10px", borderRadius: '5px', paddingLeft: '30px',  paddingRight: '30px'}}
          >
            <p>Assign Clients:</p>
            {clientList.map((client) => {
              if (
                activeClients.includes(client.client_id) == 0 &&
                client.client_active === true
              ) {
                return (
                  <p
                    key={client.client_id}
                    onClick={() => {
                      assignClient(client.client_id);
                    }}
                  >
                    {client.client_first_name}
                  </p>
                );
              } else if (client.client_active === true) {
                return (
                  <p
                    key={client.client_id}
                    style={{ borderRadius: '80px', backgroundColor: "#59CF76", paddingLeft: '8px' }}
                    onClick={() => {
                      unassignClient(client.client_id);
                    }}
                  >
                    {client.client_first_name}
                  </p>
                );
              }
            })}
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center" }} className="clientEditBottom">
        <Button
          onClick={clickCancel}
          variant="contained"
          style={{ margin: "10px" }}
        >
          Cancel
        </Button>
        <Button
          onClick={clickSubmit}
          variant="contained"
          style={{ margin: "10px" }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default NewEmployee;
