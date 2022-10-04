import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";

function EmployeeDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const employeeInfo = useSelector((store) => store.employeedetails);
  const clientList = useSelector(store => store.clientlist);

  useEffect(() => {
    dispatch({ type: "FETCH_CURRENT_EMPLOYEE", payload: params.employeeid });
    dispatch({ type: "FETCH_CLIENT_LIST", payload: params.employeeid });
  }, []);

  return (
    <div className="employeeDetailsDiv">
      <div key={employeeInfo.id}>
        <img
          className="profilePicDiv"
          src="https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s1100-c50.jpg"
        />
        <div className="employeedetails">
          <h2 style={{ width: "50%", marginLeft: "0px", marginRight: "auto"  }}>
            {employeeInfo.first_name}
            {employeeInfo.last_name}
          </h2>
          <Button variant="contained">Edit Employee</Button>
          <Button variant="contained">View All</Button>
        </div>
        <div className="clientListDiv">
          <h1>Clients</h1>
          {clientList.map(client => {
            return (
              <h3>{client.client_first_name} {client.client_last_name}</h3>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
