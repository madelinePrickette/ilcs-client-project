import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import './EmployeeTimesheets.css';
const moment = require('moment');
var momentPreciseRangePlugin = require("moment-precise-range-plugin");

//mui for calendar
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useState } from "react";

function EmployeeTimesheetsView() {

    useEffect( () => {
        getTimesheets();
    }, [])

    const user = useSelector(store => store.user)
    const history = useHistory();
    const dispatch = useDispatch();
    const timesheets = useSelector( store => store.employeeAllTimesheets.employeeClockInStatus )
    const getTimesheets = () => {
        dispatch({
            type: 'GET_EMPLOYEE_TIMESHEETS'
        })
    }

    const goToTimesheet = (timesheet_id, user_id) => {
        history.push('/timesheet/' + user_id + '/' + timesheet_id);
    }

    let minutesSum = 0;

    const [fromDate, setFromDate] = useState(moment(Date.now()).format().split("T")[0] + 'T23:59:59:000000');
    const [toDate, setToDate] = useState(moment(moment(moment(Date.now()).format()).subtract(7, 'days')).format().split("T")[0] + 'T00:00:00.000000');

    const handleDateFromSelection = (event) => {
        setFromDate(event.target.value + 'T23:59:59:000000')
    }

    const handleDateToSelection = (event) => {
        setToDate(event.target.value + 'T00:00:00.000000')
    }

    //MUI CALENDAR NECESSARY STYLES
    const useStyles = makeStyles((theme) => ({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '95%',
        },
        }));
    const classes = useStyles();
    //END OF MUI CALENDAR STYLES

    console.log(fromDate);
    console.log(toDate);

    return(
        <div>
            <div className="timesheet-filter-dropdown">
                <form className={classes.container} noValidate onChange={handleDateToSelection}>
                    <TextField
                        id="dateTo"
                        label="Date From"
                        type="date"
                        defaultValue={moment(moment(moment(Date.now()).format()).subtract(7, 'days')).format().split("T")[0]}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </form>
                <form className={classes.container} noValidate onChange={handleDateFromSelection}>
                    <TextField
                        id="dateFrom"
                        label="Date To"
                        type="date"
                        defaultValue={moment(Date.now()).format().split("T")[0]}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </form>
            </div>
            {timesheets && timesheets.map(timesheet => {
                let outTime = moment(timesheet.clock_out);
                let inTime = moment(timesheet.clock_in);
                let total = moment.duration(outTime.diff(inTime)).asMinutes();
                let hours =  Math.floor(total / 60)
                let minutes = Math.floor(total % 60);

            if (moment(timesheet.clock_in).format() > toDate && moment(timesheet.clock_in).format() < fromDate) {
                if (minutes < 10){minutes = "0"+minutes};

                if (total > 0) {
                    minutesSum = minutesSum + total;
                }
               
                return (
                    <div className="timesheet-listing-container" onClick={() => goToTimesheet(timesheet.timesheet_id, user.id)} key={timesheet.timesheet_id}>
                        <p className="client-in-listing">{timesheet.client_first_name} {timesheet.client_last_name}</p>
                        <p className="date-in-listing">{moment(timesheet.clock_in).format('LL')}</p>
                        {/* <p>Clock out: {moment(timesheet.clock_out).format('lll')}</p> */}
                        {timesheet.clock_out ? 
                        <p className="time-in-listing">Hours: <strong>{hours}:{minutes}</strong></p>
                        :
                        <p className="time-in-listing">Pending</p>
                        }
                    </div>
                )}
            })}

        <div className="total-hours-footer ">
            {Math.floor(minutesSum % 60) < 10 ? 
            <h1 className="total-text">Total = {Math.floor(minutesSum / 60)}:0{Math.floor(minutesSum % 60)}</h1>
            :
            <h1 className="total-text">Total = {Math.floor(minutesSum / 60)}:{Math.floor(minutesSum % 60)}</h1>
            }
        </div>
            
        </div>
    )
}

export default EmployeeTimesheetsView;