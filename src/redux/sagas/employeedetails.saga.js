import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchCurrentEmployee(action) {
  try {
    console.log('fetching employee');
    const response = yield axios.get(`/api/currentemployee/${action.payload}`);
    yield console.log('response is', response)
    yield put({ type: 'SET_CURRENT_EMPLOYEE', payload: response.data[0] });
  } catch (error) {
    console.log('Error in fetchEmployees saga', error);
  }
}

function* employeeDetailsSaga() {
  yield takeEvery('FETCH_CURRENT_EMPLOYEE', fetchCurrentEmployee);
}

export default employeeDetailsSaga;
