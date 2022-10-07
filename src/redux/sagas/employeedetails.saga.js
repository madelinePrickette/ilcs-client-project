import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchCurrentEmployee(action) {
  try {
    const response = yield axios.get(`/api/currentemployee/${action.payload}`);
    yield put({ type: 'SET_CURRENT_EMPLOYEE', payload: response.data[0] });
  } catch (error) {
    console.log('Error in fetchEmployees saga', error);
  }
}

function* saveNewEmployeeInfo(action) {
  try {
    yield axios.put(`/api/currentemployee/${action.payload.employeeid}`, action.payload);
    yield put({type: 'FETCH_CURRENT_EMPLOYEE', payload: action.payload.employeeid})
  } catch (error) {
      console.log('Error in saveNewEmployeeInfo', error)
  }
}

function* createNewEmployee(action){
  try {
    yield console.log('info is', action.payload.info, 'clients are', action.payload.clients)
    yield axios.post(`/api/currentemployee/`, action.payload.info)
  } catch (error) {
    console.log('Error in createNewEmployee', error)
  }
}

function* employeeDetailsSaga() {
  yield takeEvery('FETCH_CURRENT_EMPLOYEE', fetchCurrentEmployee);
  yield takeLatest('SAVE_NEW_EMPLOYEE_INFO', saveNewEmployeeInfo)
  yield takeLatest('CREATE_NEW_EMPLOYEE', createNewEmployee)
}

export default employeeDetailsSaga;
