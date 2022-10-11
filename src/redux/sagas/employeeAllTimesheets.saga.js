import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* getEmployeeTimesheets() {
    try {
        let response = yield axios.get('/api/timesheets/employeeView');
        yield put({ type: 'SET_EMPLOYEE_TIMESHEETS', payload: response.data })
    } catch (error) {
        console.log('Error with user clock in', error);
    }
}

function* getSingleEmployeeTimeSheet(action){
    try {
        const response = yield axios.get(`/api/timesheets/employeeView/${action.payload.timesheet}`);
        yield put({ type: 'SET_EMPLOYEE_SINGLE_TIMESHEET', payload: response.data[0] })
    } catch (error) {
        console.log('Error in getSingleEmployeeTimeSheet', error)
    }
}

function* employeeTimesheetChanges(action){
    try{
        yield axios.put(`api/timesheets/employeeView/${action.payload.timesheet}`, action.payload)
        yield put ({type: 'GET_SINGLE_EMPLOYEE_TIMESHEET', payload: { timesheet: action.payload.timesheet } })
        yield put ({type: 'SEND_EMAIL_EDITED_TIMESHEET', payload: { timesheet: action.payload.timesheet }})
    }catch (error) {
        console.log('Error in employeeTimesheetChanges', error)
    }
}

function* sendEmailEditedTimesheet(action){
    try{
        const response = yield axios.get(`/api/email/timesheet/edit/${action.payload.timesheet}`);
    }catch (error) {
        console.log('Error in sendEmailEditedTimesheet', error)
    }

}//end of sendEmailEditedTimesheet

function* employeeAllTimesheetsSaga() {
    yield takeEvery('GET_EMPLOYEE_TIMESHEETS', getEmployeeTimesheets);
    yield takeEvery('GET_SINGLE_EMPLOYEE_TIMESHEET', getSingleEmployeeTimeSheet);
    yield takeLatest('EMPLOYEE_TIMESHEET_CHANGES', employeeTimesheetChanges);
    yield takeEvery('SEND_EMAIL_EDITED_TIMESHEET', sendEmailEditedTimesheet);
}

export default employeeAllTimesheetsSaga;