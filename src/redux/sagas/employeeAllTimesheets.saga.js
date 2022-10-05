import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* getEmployeeTimesheets() {
    try {
        let response = yield axios.get('/api/timesheets/employeeView');
        yield put({ type: 'SET_EMPLOYEE_TIMESHEETS', payload: response.data })
    } catch (error) {
        console.log('Error with user clock in:', error);
    }
}

function* employeeAllTimesheetsSaga() {
    yield takeEvery('GET_EMPLOYEE_TIMESHEETS', getEmployeeTimesheets);
}

export default employeeAllTimesheetsSaga;