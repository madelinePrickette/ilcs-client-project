import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

//post that does a select for the filtering. This was intentional to send the action.payload
//action is the date range and the employee selection.
//This fetches the timesheets that fit the selected requirements.
function* fetchTimesheetFilter(action) {
    try{
        console.log('in fetchTimesheetFilter saga...', action.payload);
        let response = yield axios.post('/api/adminTimesheets', action.payload);
        console.log(response.data);
        yield put ({type: 'SET_ADMIN_TIMESHEETS', payload: response.data});
    }catch(err) {
        console.log('error in fetchTimesheetFilter', err)
    }
}

//this function runs the above saga function when the 'FETCH_FILTER' phrase is called
function* adminTimesheetFilterSaga() {
    yield takeEvery('FETCH_FILTER', fetchTimesheetFilter)
}

export default adminTimesheetFilterSaga;