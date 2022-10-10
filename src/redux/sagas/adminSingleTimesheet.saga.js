import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

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

function* adminDeleteTimesheet(action){
    try{
        yield axios.delete(`api/admin/timesheet/${action.payload.timesheet}`)
    }catch (error) {
        console.log('Error in admineDeleteTimesheet', error)
    }
}

function* adminSingleTimesheetSaga() {
    yield takeLatest('GET_ADMIN_SINGLE_TIMESHEET', getAdminSingleTimeSheet);
    yield takeLatest('ADMIN_UPDATE_TIMESHEET', adminTimesheetChanges);
    yield takeEvery('DELETE_TIMESHEET', adminDeleteTimesheet);
  }
  
  export default adminSingleTimesheetSaga;