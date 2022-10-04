import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";


function EmployeeClockIn() {

    const history = useHistory();

    let {id} = useParams();
    console.log(id);
    useEffect( () => {
        getClientInfo(id);
    }, [])

    const getClientInfo = (client_id) => {
        console.log("client id", client_id);
        dispatch({
            type: 'CLIENT_INFO_CLOCK_IN',
            payload: client_id
        })
    }

    const clientInfo = useSelector( store => store.clientInfoClockIn)

    const dispatch = useDispatch();

    // this function get location data from a users browser and sends it to the employeeClockIn Reducer.
    const clockIn = () => {
        console.log('clicked');
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            dispatch({
                type: "EMPLOYEE_CLOCK_IN",
                payload: { location: "(" + position.coords.latitude + ", " + position.coords.longitude + ")" , clientId: 22 }
            });
            history.push('/employeeDashboard')
          });
    }

    return (
        <div>
            <h1>Employee Log In</h1>
            <button onClick={() => clockIn()}>Clock In</button>
            <p>client name: {clientInfo.client_first_name} {clientInfo.client_last_name} </p>
            <p>client address: {clientInfo.address} {clientInfo.city}, {clientInfo.state} {clientInfo.zip} </p>
            <p>client bio: {clientInfo.bio}</p>
        </div>
    )
}

export default EmployeeClockIn;