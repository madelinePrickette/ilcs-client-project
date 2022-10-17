import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ClockLoader from "react-spinners/ClockLoader";
import { TextField } from "@material-ui/core";
import './EmployeeClockIn.css';
const moment = require('moment');

function EmployeeClockIn() {

    useEffect( () => {
        getClientInfo(id);
    }, [])

    let {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const clientInfo = useSelector( store => store.clientInfoClockIn);
    const userInfo = useSelector( store => store.employeeClockInStatus);
    const [work_type, setWork_type] = useState('');
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // This gets the client infor that an employee is clocking into and checks if an employee is already clocked in.
    const getClientInfo = (client_id) => {
        console.log("client id", client_id);
        dispatch({
            type: 'CLIENT_INFO_CLOCK_IN',
            payload: client_id
        })
        dispatch({
            type: 'GET_USER_STATUS'
        })
    }
    // this hols selection of work type of PCA or HSA
    const workType = (type) => {
        setWork_type(type);
    }
    // This keeps track of the notes
    const notesSection = (event) => {
        setNotes(event.target.value)
    }

    // this function get location data from a users browser and sends it to the employeeClockIn Reducer.
    const clockIn = () => {
        console.log('clicked');
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            dispatch({
                type: "EMPLOYEE_CLOCK_IN",
                payload: { location: "(" + position.coords.latitude + ", " + position.coords.longitude + ")" , clientId: id, history: history }
            });
          });
    }
    // this function updates the clocked in timesheet with the clock out location, time, notes, and work type
    const clockOut = (timesheet_id) => {
        if (work_type == '') {
            alert('Please select the type of work before submitting');
        } else {
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(function(position) {
            dispatch({
                type: "EMPLOYEE_CLOCK_OUT",
                payload: { loc_2: "(" + position.coords.latitude + ", " + position.coords.longitude + ")" , timesheet_id: timesheet_id, work_type: work_type, notes: notes, history: history }
            });

          });
        }
    }
    // This returns the loading spinner if isLoading is set tyo true
    if (isLoading) {
        return(
            <div className="loading-spinner-container">
                <ClockLoader
                color="#57C148"
                size={'200px'}
                />
            </div>
        )
    }
    // this returns the the clock out screen if a user is clocked into the client seleceted.
    if (userInfo.client_id == clientInfo.client_id) {
        return (
            <div className="clock-in-body-container">
                <br />
                <div className="clocked-in-at-time">
                    <p>Clocked in: {moment(userInfo.clock_in).format('lll')}</p>
                </div>
                <button className={work_type=='PCA - 15.00'?"pca-button pressed-state":"pca-button"} onClick={() => workType('PCA - 15.00')}>PCA</button>
                <button className={work_type=='HSA - 20.00'?"hsa-button pressed-state":"hsa-button"} onClick={() => workType('HSA - 20.00')}>HSA</button>
                <br />
                <TextField
                    multiline
                    style={{ width: "95%", marginBottom: "15px", marginTop: "15px"  }}
                    variant="outlined"
                    onChange={() => notesSection(event)}
                />
                <br />
                <button className="clock-out-button" onClick={() => clockOut(userInfo.timesheet_id)}>Clock Out</button>
                <div className="client-bio-container">
                    <p><strong>CLIENT:</strong> {clientInfo.client_first_name} {clientInfo.client_last_name} </p>
                    <p><strong>ADDRESS:</strong> {clientInfo.address} {clientInfo.city}, {clientInfo.state} {clientInfo.zip} </p>
                    <p><strong>BIO:</strong> {clientInfo.bio}</p>
                </div>
            </div>
        )
        // This returns the clock in screen if a user is not clocked into a client
    } else if (userInfo == '') {
        return (
            <div className="clock-in-body-container">
                <button className="employee-clock-in-button" onClick={() => clockIn()}>Clock In</button>
                <div className="client-bio-container">
                    <p>CLIENT: {clientInfo.client_first_name} {clientInfo.client_last_name} </p>
                    <p>ADDRESS: {clientInfo.address} {clientInfo.city}, {clientInfo.state} {clientInfo.zip} </p>
                    <p>BIO: {clientInfo.bio}</p>
                </div>
            </div>
        )
        // This returns only the client info if a user is clocked into a differnt client than the one selected.
    } else {
        return (
            <div className="clock-in-body-container">
                <div className="client-bio-container">
                    <p>CLIENT: {clientInfo.client_first_name} {clientInfo.client_last_name} </p>
                    <p>ADDRESS: {clientInfo.address} {clientInfo.city}, {clientInfo.state} {clientInfo.zip} </p>
                    <p>BIO: {clientInfo.bio}</p>
                </div>
            </div>
        )
    }
    

}

export default EmployeeClockIn;