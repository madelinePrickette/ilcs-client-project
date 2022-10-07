import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions

function* getAdminSingleTimeSheet(action){
    try {
        const response = yield axios.get(`/api/admin/timesheet/${action.payload.timesheet}`);
        yield put({ type: 'SET_ADMIN_SINGLE_TIMESHEET', payload: response.data[0] })
    } catch (error) {
        console.log('Error in getSingleAdminTimeSheet', error)
    }
}

function* adminTimesheetChanges(action){
    try{
        yield axios.put(`api/admin/timesheet/${action.payload.timesheet}`, action.payload)
        yield put ({type: 'GET_ADMIN_SINGLE_TIMESHEET', payload: { timesheet: action.payload.timesheet } })
    }catch (error) {
        console.log('Error in adminTimesheetChanges', error)
    }
}

function* adminSingleTimesheetSaga() {
    yield takeLatest('GET_ADMIN_SINGLE_TIMESHEET', getAdminSingleTimeSheet);
    yield takeLatest('ADMIN_UPDATE_TIMESHEET', adminTimesheetChanges);
  }
  
  export default adminSingleTimesheetSaga;