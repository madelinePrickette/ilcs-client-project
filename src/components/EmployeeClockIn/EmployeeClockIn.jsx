import { useState } from "react";
import { useDispatch } from "react-redux";


function EmployeeClockIn() {

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
          });
    }

    return (
        <div>
            <h1>Employee Log In</h1>
            <button onClick={() => clockIn()}>Clock In</button>
            <p>client name</p>
            <p>client address</p>
            <p>client bio</p>
        </div>
    )
}

export default EmployeeClockIn;