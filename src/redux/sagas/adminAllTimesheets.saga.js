import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* adminAllTimesheetsSaga() {
    try{
        console.log('in adminAllTimesheets saga');
        const response = yield axios.get(`/api/adminAllTimesheets`)
        yield put ({type: 'SET_ADMIN_ALL_TIMESHEETS', payload: response.data})
    }catch(err){
        console.error('error in adminAllTimesheets saga', err);
    }
}

export default adminAllTimesheetsSaga;