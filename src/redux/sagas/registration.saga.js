import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//The registration.saga handles employee creation by an admin. Once the employee is created, it takes the array of employees selected from the creation form and assigns them to the newly created employee.
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
    //Once clients are assigned to the new employee, route the admin to the next page.
    yield action.payload.history.push(`/employee/${response.data.id}`)
  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* registrationSaga() {
  yield takeLatest('CREATE_NEW_USER', createNewUser)
}

export default registrationSaga;
