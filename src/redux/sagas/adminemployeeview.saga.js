import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_EMPLOYEES_LIST", grabs all current employees that are active and not admins.
function* fetchEmployeesList() {
  try {
    const response = yield axios.get('/api/adminemployeesview');
    yield put({ type: 'SET_EMPLOYEES_LIST', payload: response.data });
  } catch (error) {
    console.log('Error in fetchEmployees saga', error);
  }
}

function* adminEmployeeViewSaga() {
  yield takeLatest('FETCH_EMPLOYEES_LIST', fetchEmployeesList);
}

export default adminEmployeeViewSaga;
