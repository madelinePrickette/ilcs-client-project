import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

//Fetches clients an employee is working with.
function* fetchEmployeeClientList(action) {
  try {
    const response = yield axios.get(`/api/clientlist/emplist/${action.payload}`);
    yield put({ type: 'SET_EMPLOYEE_CLIENT_LIST', payload: response.data });
  } catch (error) {
    console.log('Error in fetchEmployeeClientList saga', error);
  }
}

//Fetches list of all active clients
function* fetchClientList() {
  try {
    const response = yield axios.get(`/api/clientlist/`);
    yield put({ type: 'SET_CLIENT_LIST', payload: response.data });
  } catch (error) {
    console.log('Error in fetchClientList saga', error);
  }
}

//Unassign a client from an employee in edit employee component
function* unassignClient(action) {
  try {
    yield axios.post(`/api/clientlist/unassign/`, action.payload);
    yield put({type: 'FETCH_CLIENT_LIST'})
  } catch (error) {
    console.log('Error in unassignClient', error)
  }
}

//Assign a client to an employee in the edit employee component
function* assignClient(action) {
  try {
    yield axios.post(`/api/clientlist/assign/`, action.payload);
    yield put({type: 'FETCH_CLIENT_LIST'})
  } catch (error) {
    console.log('Error in unassignClient', error)
  }
}

function* clientListSaga() {
  yield takeEvery('FETCH_EMPLOYEE_CLIENT_LIST', fetchEmployeeClientList);
  yield takeEvery('FETCH_CLIENT_LIST', fetchClientList);
  yield takeLatest('UNASSIGN_CLIENT', unassignClient);
  yield takeLatest('ASSIGN_CLIENT', assignClient);
}

export default clientListSaga;
