import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* createNewUser(action) {
  try { 
    const response = yield axios.post('/api/user/register/newuser', action.payload);
    
    for (let client of action.payload.clients){
      yield put({
        type: "ASSIGN_CLIENT",
        payload: {
          client: Number(client),
          employee: Number(response.data.id),
        },
      });
    }

    yield action.payload.history.push(`/employee/${response.data.id}`)
  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* registrationSaga() {
  // yield takeLatest('REGISTER', registerUser);
  yield takeLatest('CREATE_NEW_USER', createNewUser)
  // yield takeEvery('FETCH_NEW_EMPLOYEE', fetchNewEmployee)
}

export default registrationSaga;
