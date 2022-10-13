import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";

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
    <div className="employeeDetailsDiv">
      <div key={employeeInfo.id}>
        <img className="profilePicDiv" src={employeeInfo.pic} />
        <div className="employeedetails">
          <h2 style={{ width: "50%", marginLeft: "0px", marginRight: "auto" }}>
            {employeeInfo.first_name}
            {employeeInfo.last_name}
          </h2>
          <Button onClick={clickEdit} variant="contained">
            Edit Employee
          </Button>
        </div>
        <div className="clientListDiv">
          <h1>Clients</h1>
          {employeeClientList.map((client) => {
            return (
              <h3 key={client.client_id}>
                {client.client_first_name} {client.client_last_name}
              </h3>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
