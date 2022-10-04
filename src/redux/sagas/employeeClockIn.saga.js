import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* employeeClockIn(action) {
    try {
        axios.post('/api/employee/clockIn', action.payload)
    } catch (error) {
        console.log('Error with user clock in:', error);
    }
} 

function* employeeClockInSaga() {
    yield takeEvery('EMPLOYEE_CLOCK_IN', employeeClockIn)
}

export default employeeClockInSaga;