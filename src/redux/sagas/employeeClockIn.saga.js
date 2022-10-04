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
        console.log('action payload in reducer before server', action.payload);
        const response = yield axios.post(`/api/employeeClockIn/client`, action.payload );
        console.log('response is', response)
        yield put({ type: 'SET_CLIENT_INFO_CLOCK_IN', payload: response.data})
    } catch (error) {
        console.log('Error with user clock in:', error);
    }
}

function* employeeClockInSaga() {
    yield takeEvery('EMPLOYEE_CLOCK_IN', employeeClockIn)
    yield takeEvery('CLIENT_INFO_CLOCK_IN', clientInfoClockIn)
}

export default employeeClockInSaga;