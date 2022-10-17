import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_CURRENT_EMPLOYEE" actions
function* fetchCurrentEmployee(action) {
  try {
    const response = yield axios.get(`/api/currentemployee/${action.payload}`);
    yield put({ type: 'SET_CURRENT_EMPLOYEE', payload: response.data[0] });
  } catch (error) {
    console.log('Error in fetchEmployees saga', error);
  }
}

//Tied to editing an employee. Updates the employee with the information in payload, then fetches the employee with the new data.
function* saveNewEmployeeInfo(action) {
  try {
    yield axios.put(`/api/currentemployee/${action.payload.employeeid}`, action.payload);
    yield put({type: 'FETCH_CURRENT_EMPLOYEE', payload: action.payload.employeeid})
  } catch (error) {
      console.log('Error in saveNewEmployeeInfo', error)
  }
}

function* employeeDetailsSaga() {
  yield takeEvery('FETCH_CURRENT_EMPLOYEE', fetchCurrentEmployee);
  yield takeLatest('SAVE_NEW_EMPLOYEE_INFO', saveNewEmployeeInfo)
}

export default employeeDetailsSaga;
