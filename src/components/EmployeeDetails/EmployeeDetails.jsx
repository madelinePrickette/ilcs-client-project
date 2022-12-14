import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Box, Paper } from "@material-ui/core";

//This component can be reached from the Admin side by click on an employee from viewing the employees list. The component displays an employee's name and current clients assigned to them. Contains two buttons, one to edit the employee's information and clients, and one to view all timesheets submitted by the current employee.

function EmployeeDetails() {
  useEffect(() => {
    dispatch({ type: "FETCH_CURRENT_EMPLOYEE", payload: params.employeeid });
    dispatch({
      type: "FETCH_EMPLOYEE_CLIENT_LIST",
      payload: params.employeeid,
    });
  }, []);

  //Const variables

  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const employeeInfo = useSelector((store) => store.employeedetails);
  const employeeClientList = useSelector(
    (store) => store.clientlist.employeeClientList
  );

  //Const functions

  const clickEdit = () => {
    history.push(`/editemployee/${params.employeeid}`);
  };

  return (
    <div>
      <Box>
        <Paper
          elevation={1}
          style={{ width: "800px", marginLeft: "auto", marginRight: "auto" }}
        >
           <Button style={{margin: '10px', float: 'right'}} onClick={clickEdit} variant="contained">
                Edit Employee
              </Button>
          <div style={{textAlign: 'center', backgroundColor: "#d3d3d3" }}>
            <h1 style={{ margin: "0px", padding: "10px", width: '50%' }}>Employee Info</h1>
          </div>
          <div style={{ display: "flex", backgroundColor: "#ffffff" }}>
            <img
              className="profilePicDiv"
              src={employeeInfo.pic}
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                border: "10px solid #000000",
                marginLeft: "40px",
                marginRight: "40px",
                marginTop: "20px",
                marginBottom: "20px",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                width: "50%",
                float: "right",
                padding: "20px",
                backgroundColor: "#3768adce",
              }}
            >
                           
              <h1 style={{ margin: "0px", color: "white" }}>
                {employeeInfo.first_name} {employeeInfo.last_name}
              </h1>

              <a
                style={{ color: "white" }}
                href={`mailto:${employeeInfo.email}`}
              >
                {employeeInfo.email}
              </a>
              {/* <Paper style={{marginTop: '50px', padding: '10px'}}>

            </Paper> */}
              <div
                style={{
                  height: "2px",
                  backgroundColor: "white",
                  marginTop: "30px",
                  marginBottom: "30px",
                  width: "80%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              ></div>
              <h1 style={{ color: "white" }}>Clients</h1>
              {employeeClientList.map((client) => {
                return (
                  <h4 key={client.client_id} style={{ color: "white" }}>
                    {client.client_first_name} {client.client_last_name}
                  </h4>
                );
              })}
            </div>
          </div>
        </Paper>
      </Box>
    </div>
  );
}

export default EmployeeDetails;
