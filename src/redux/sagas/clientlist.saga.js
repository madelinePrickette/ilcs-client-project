import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchClientList(action) {
  try {
    const response = yield axios.get(`/api/clientlist/${action.payload}`);
    yield console.log('response is', response)
    yield put({ type: 'SET_CLIENT_LIST', payload: response.data });
  } catch (error) {
    console.log('Error in fetchClientList saga', error);
  }
}

function* clientListSaga() {
  yield takeEvery('FETCH_CLIENT_LIST', fetchClientList);
}

export default clientListSaga;
