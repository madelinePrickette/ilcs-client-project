import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function EditEmployee() {
  const params = useParams();
  const employeeInfo = useSelector((store) => store.employeedetails);
  const clientList = useSelector(store => store.clientlist.clientList)
  const dispatch = useDispatch();

  const unassignClient = (clientID) => {
    dispatch({ type: 'UNASSIGN_CLIENT', payload: {client: Number(clientID), employee: Number(params.employeeid)} })
  }

  const assignClient = (clientID) => {
    dispatch({ type: 'ASSIGN_CLIENT', payload: {client: Number(clientID), employee: Number(params.employeeid)} })
  }

  useEffect(() => {
    dispatch({ type: "FETCH_CURRENT_EMPLOYEE", payload: params.employeeid });
    dispatch({ type: "FETCH_CLIENT_LIST", payload: params.employeeid });
  }, []);

  return (
    <div>
      <div className="clientEditTop">
        <div style={{width: '60%', textAlign: 'center'}}>
          <h1>Employee Info</h1>
          <h2>First Name: {employeeInfo.first_name}</h2>
          <h2>Last Name: {employeeInfo.last_name}</h2>
          <h2>Username: {employeeInfo.username}</h2>
          <h2>Clearance Level: {employeeInfo.clearance_level}</h2>
          <h2>Email: {employeeInfo.email}</h2>
          <h2>Pic URL: {employeeInfo.pic}</h2>
          <h2>Active: {String(employeeInfo.user_active)}</h2>
        </div>
        <div>
          <h1>Client List</h1>
          {clientList.map(client => {
            return (
              <div key={client.client_id}>
                {client.j_user_id == params.employeeid && <h1 onClick={() => {unassignClient(client.client_id)}} style={{backgroundColor: 'red'}}>{client.client_first_name}</h1>}
                {client.j_user_id != params.employeeid && <h1 onClick={() => {assignClient(client.client_id)}}>{client.client_first_name}</h1>}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default EditEmployee;
