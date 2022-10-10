import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
// import EmployeeTimesheetsView from '../../components/EmployeeTimesheetsView/EmployeeTimesheetsView';

function* employeeClockIn(action) {
    try {
        yield axios.post('/api/employeeClockIn', action.payload)
        yield action.payload.history.push('/employeeDashboard') // tricky tricky
    } catch (error) {
        console.log('Error with user clock in:', error);
    }
}

function* clientInfoClockIn(action) {
    try {
        const response = yield axios.get(`/api/employeeClockIn/client/${action.payload}`);
        yield put({ type: 'SET_CLIENT_INFO_CLOCK_IN', payload: response.data})
    } catch (error) {
        console.log('Error with user clock in:', error);
    }
}

function* checkClockedIn(action) {
    try {
        const response = yield axios.get(`/api/employeeClockIn/user`);
        yield put({ type: 'SET_USER_STATUS', payload: response.data})
    } catch (error) {
        console.log('Error with user clock in:', error);
    }
}

function* employeeClockOut(action) {
    try {
        axios.put('/api/employeeClockIn', action.payload)
        // console.log('this is action.payload.timesheet_id in employee clockout', action.payload.timesheet_id);
    } catch (error) {
        console.log('Error with user clock in:', error);
    }
}

function* employeeClockInSaga() {
    yield takeEvery('EMPLOYEE_CLOCK_IN', employeeClockIn);
    yield takeEvery('CLIENT_INFO_CLOCK_IN', clientInfoClockIn);
    yield takeEvery('GET_USER_STATUS', checkClockedIn);
    yield takeEvery('EMPLOYEE_CLOCK_OUT', employeeClockOut);
}

export default employeeClockInSaga;