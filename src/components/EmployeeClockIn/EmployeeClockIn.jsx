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

    let {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [work_type, setWork_type] = useState('');
    const [notes, setNotes] = useState('');
    const clientInfo = useSelector( store => store.clientInfoClockIn);
    const userInfo = useSelector( store => store.employeeClockInStatus);
    const [isLoading, setIsLoading] = useState(false);

    useEffect( () => {
        getClientInfo(id);
    }, [])

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

    const workType = (type) => {
        setWork_type(type);
    }

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