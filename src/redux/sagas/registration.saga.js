import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    yield axios.post('/api/user/register', action.payload);

    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload });

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({ type: 'SET_TO_LOGIN_MODE' });

  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

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

// function* fetchNewEmployee(action) {
//   try {
//     // passes the username and password from the payload to the server
//     const response = yield axios.get('/api/user/register/newuser', action.payload);
//     // yield console.log('new user is', response)
//     // yield action.payload.history.push('/employeesview')
//   } catch (error) {
//     console.log('Error in fetchNewEmployee:', error);
//     yield put({ type: 'REGISTRATION_FAILED' });
//   }
// }

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
  yield takeLatest('CREATE_NEW_USER', createNewUser)
  // yield takeEvery('FETCH_NEW_EMPLOYEE', fetchNewEmployee)
}

export default registrationSaga;
