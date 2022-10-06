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

function* employeeAllTimesheetsSaga() {
    yield takeEvery('GET_EMPLOYEE_TIMESHEETS', getEmployeeTimesheets);
    yield takeEvery('GET_SINGLE_EMPLOYEE_TIMESHEET', getSingleEmployeeTimeSheet)
}

export default employeeAllTimesheetsSaga;