import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
// will get a single timesheet to view on admin side.
function* getAdminSingleTimeSheet(action){
    try {
        const response = yield axios.get(`/api/admin/timesheet/${action.payload.timesheet}`);
        yield put({ type: 'SET_ADMIN_SINGLE_TIMESHEET', payload: response.data[0] })
    } catch (error) {
        console.log('Error in getSingleAdminTimeSheet', error)
    }
}

// updates a specific timesheet on edit submission of admin side
function* adminTimesheetChanges(action){
    try{
        yield axios.put(`api/admin/timesheet/${action.payload.timesheet}`, action.payload)
        yield put ({type: 'GET_ADMIN_SINGLE_TIMESHEET', payload: { timesheet: action.payload.timesheet } })
    }catch (error) {
        console.log('Error in adminTimesheetChanges', error)
    }
}

// deletes a specific timesheet in admin view
function* adminDeleteTimesheet(action){
    try{
        yield axios.delete(`api/admin/timesheet/${action.payload.timesheet}`)
    }catch (error) {
        console.log('Error in admineDeleteTimesheet', error)
    }
}

// updates timesheet in the notification section by making it false
function* markAsRead(action){
    try{
        yield axios.put(`api/admin/timesheet/notification/${action.payload.timesheetid}`)
        yield action.payload.history.go(0); //Refresh page once column is updated
    } catch (error) {
        console.log('Error in markAsRead', error)
    }
}

function* adminSingleTimesheetSaga() {
    yield takeLatest('GET_ADMIN_SINGLE_TIMESHEET', getAdminSingleTimeSheet);
    yield takeLatest('ADMIN_UPDATE_TIMESHEET', adminTimesheetChanges);
    yield takeEvery('DELETE_TIMESHEET', adminDeleteTimesheet);
    yield takeEvery('MARK_AS_READ', markAsRead)
  }
  
  export default adminSingleTimesheetSaga;