import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
const moment = require('moment');

//mui dot icon
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

//mui for table
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
    FormGroup,
    useMediaQuery,
    useTheme,
    Button,
    Select,
    TextField,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from "@material-ui/core";

//mui for calendar
import { makeStyles } from '@material-ui/core/styles';

function AdminAllTimesheets() {

    //SUBTRACTING 14 DAYS
    //These are all global so they can be accessed by the useState right away. 
    //When they were in a function, they were locked by their scope and useState could not access them.
    //So I tries updating state, but it caused async problems. The solution is to do this:
        //getting now
        const now = Date.now()
        //make it look nice
        const nowFormat = moment(now).format();
        //split the string at T
        const nowFormatSplit = nowFormat.split("T");
        //take the first value in the array
        const sqlNow = nowFormatSplit[0];
        console.log('DATE TO', sqlNow);

        //getting 14 days ago
        const minus14Days = moment(nowFormat).subtract(14, 'days');
        //make it look nice
        const minus14DaysFormat = moment(minus14Days).format();
        //split the string at T
        const minus14DaysFormatSplit = minus14DaysFormat.split("T");
        //take the first value in the array
        const sql14DaysAgo = minus14DaysFormatSplit[0];
        console.log('DATE FROM', sql14DaysAgo);

        //hours worked variables:
        const minutesSum = 0;

    useEffect(() => {
        fetchEmployeeList(); //populates employee list dropdown
        handleFilterSubmit(); //runs right away to get the current date and 14 days prior.
    }, []);

    const history = useHistory();
    const dispatch = useDispatch();
    const employeeList = useSelector((store) => store.adminemployeesview); //getting employees to populate the dropdown
    const timesheetList = useSelector((store) => store.adminTimesheetsReducer); //getting specific timesheets to display.
    const [filter, setFilter] = useState({dateFrom: `${sql14DaysAgo} 00:00:00.000000`, dateTo: `${sqlNow} 23:59:59.000000`, userId: 0});
    const [beginDate, setBeginDate] = useState(`${sqlNow}T23:59:59.000000`);
    const [endDate, setEndDate] = useState(`${sql14DaysAgo}T00:00:00.000000`);
    //this useState is what is quickly sent into a query in order to show all timesheets within the last 14 days on load.

    const handleFilterSubmit = () => {
        //this handles all timesheet displaying by dates. Wether it be by onLoad or by the user.
        console.log('getting timesheets...');
        dispatch({
            type: 'FETCH_FILTER',
            payload: filter
        })
    }
    const fetchEmployeeList = () => {
        console.log('fetching employee list...');
        dispatch({
            type: 'FETCH_EMPLOYEES_LIST'
        })
    }

    const handleDateFromSelection = (event) => {
        setFilter({...filter, dateFrom: `${event.target.value} 00:00:00.000000`})
        setEndDate(`${event.target.value}T00:00:00.000000`);
    }
    const handleDateToSelection = (event) => {
        setFilter({...filter, dateTo: `${event.target.value} 23:59:59.000000`})
        setBeginDate(`${event.target.value}T23:59:59.000000`);

    }
    const handleEmployeeSelection = (event) => {
        console.log('employee id chosen:', event.target.value);
        setFilter({...filter, userId: event.target.value});
    }

    //MUI CALENDAR NECESSARY STYLES
    const useStyles = makeStyles((theme) => ({
        container: {
          display: 'inline',
          flexWrap: 'wrap',
        },
        textField: {
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          width: 200,
        },
      }));
    const classes = useStyles();
    //END OF MUI CALENDAR STYLES
    
    //MUI TABLE STYLES
    const useStylesForTable = makeStyles({
        root: {
          width: '100%',
        },
        container: {
          maxHeight: 540,
        },
    });
        const tableClasses = useStylesForTable();

    //END MUI TABLE STYLES

    const goToTimesheet = (t_id, e_id) => {
        history.push(`/admin/timesheet/${e_id}/${t_id}`)
    }

    console.log(filter); // just to check what is in our payload
    return(
        <div>

            <h1 style={{marginLeft: '10px'}}>Employee Timesheets</h1>


                {/* MUI CALENDAR DATE FROM */}
                    <form className={classes.container}  noValidate onChange={handleDateFromSelection}>
                        <TextField
                            id="dateFrom"
                            label="Begin Date"
                            type="date"
                            defaultValue={moment(moment(moment(Date.now()).format()).subtract(14, 'days')).format().split("T")[0]}
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </form>
                {/* EMD OF MUI CALENDAR DATE FROM */}

                {/* MUI CALENDAR DATE TO */}
                <div style={{marginBottom: '5px', display: 'inline-flex'}}>
                <form className={classes.container} noValidate onChange={handleDateToSelection}>
                        <TextField
                            id="dateTo"
                            label="End Date"
                            type="date"
                            defaultValue={moment(Date.now()).format().split("T")[0]}
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </form>
                {/* END OF MUI CALENDAR DATE TO */}
   
                <Select onChange={handleEmployeeSelection} defaultValue={0} style={{marginLeft: '10px'}} label="Employee">
                        <MenuItem value='0'>All Employees</MenuItem>
                    {employeeList.map((employee) => 
                        <MenuItem value={employee.id} key={employee.id}>{employee.first_name} {employee.last_name}</MenuItem>
                    )}
                </Select>

                <Button variant="contained" onClick={handleFilterSubmit} style={{marginLeft: '10px'}}>Filter</Button>

                </div>

            <Paper className={tableClasses.root}>
            <TableContainer className={tableClasses.container}>   
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Timesheet No.</TableCell>
                        <TableCell>Employee Name</TableCell>
                        <TableCell>Client Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Clock in time</TableCell>
                        <TableCell>Clock out time</TableCell>
                        <TableCell>Hours worked</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        {timesheetList.map((timesheet) => {

                            let outTime = moment(timesheet.clock_out);
                            let inTime = moment(timesheet.clock_in);
                            let total = moment.duration(outTime.diff(inTime)).asMinutes();
                            let hours =  Math.floor(total / 60)
                            let minutes = Math.floor(total % 60);
                            // minutesSum = minutesSum + total;
                                {/* {timesheetList && timesheetList.map(timesheet => { */}
                                    if (moment(timesheet.clock_in).format() > endDate && moment(timesheet.clock_in).format() < beginDate) {
                                        if (minutes < 10){
                                            minutes = "0"+minutes
                                                return(
                                                    <TableRow hover onClick={() => goToTimesheet(timesheet.timesheet_id, timesheet.t_user_id)} key={timesheet.timesheet_id}>
                                                        <TableCell>{timesheet.timesheet_id}</TableCell>
                                                        <TableCell>{timesheet.first_name} {timesheet.last_name}</TableCell>
                                                        <TableCell>{timesheet.client_first_name} {timesheet.client_last_name}</TableCell>
                                                        <TableCell>{timesheet.work_type}</TableCell>
                                                        <TableCell>{moment(timesheet.clock_in).format('MMM Do YYYY, h:mm a')}</TableCell>
                                                        <TableCell>{moment(timesheet.clock_out).format('MMM Do YYYY, h:mm a')}</TableCell>
                                                        <TableCell>{hours}:{minutes}</TableCell>
                                                        {timesheet.notification ?
                                                        <TableCell><FiberManualRecordIcon color="primary" /></TableCell>
                                                        :
                                                        <TableCell></TableCell>
                                                        }
                                                        
                                                    </TableRow>
                                                )
                                        }else{
                                            return(
                                                <TableRow onClick={() => goToTimesheet(timesheet.timesheet_id, timesheet.t_user_id)} key={timesheet.timesheet_id}>
                                                        <TableCell>{timesheet.timesheet_id}</TableCell>
                                                        <TableCell>{timesheet.first_name} {timesheet.last_name}</TableCell>
                                                        <TableCell>{timesheet.client_first_name} {timesheet.client_last_name}</TableCell>
                                                        <TableCell>{timesheet.work_type}</TableCell>
                                                        <TableCell>{moment(timesheet.clock_in).format('MMM Do YYYY, h:mm:ss a')}</TableCell>
                                                        <TableCell>{moment(timesheet.clock_out).format('MMM Do YYYY, h:mm:ss a')}</TableCell>
                                                        <TableCell>{hours}:{minutes}</TableCell>
                                                        {timesheet.notification ?
                                                        <TableCell><FiberManualRecordIcon color="primary" /></TableCell>
                                                        :
                                                        <TableCell></TableCell>
                                                        }
                                                        
                                                </TableRow>
                                            )
                                    }
                                }else{
                                    console.log(moment(timesheet.clock_in).format());
                                }
                            {/* })} */} 
                        })}
                </TableBody>
            </Table>
            </TableContainer>
            </Paper>
        </div>
    )
}

export default AdminAllTimesheets;