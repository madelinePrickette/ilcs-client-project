import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* employeeClockIn(action) {
    try {
        axios.post('/api/employeeClockIn', action.payload)
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
    } catch (error) {
        console.log('Error with user clock in:', error);
    }
}

function* employeeClockInSaga() {
    yield takeEvery('EMPLOYEE_CLOCK_IN', employeeClockIn);
    yield takeEvery('CLIENT_INFO_CLOCK_IN', clientInfoClockIn);
    yield takeEvery('GET_USER_STATUS', checkClockedIn);
    yield takeEvery('EMPLOYEE_CLOCK_OUT', employeeClockOut)
}

export default employeeClockInSaga;