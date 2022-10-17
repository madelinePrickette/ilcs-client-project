import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//Handles grabbing the clients for the currently logged in employee. Each client will be displayed as a clickable object on the employee dashboard.
function* fetchEmployeeClients() {
    try {
        const response = yield axios.get('/api/EmployeeDashboard')
        yield put ({type: 'SET_EMPLOYEES_CLIENTS', payload: response.data})
    }catch(err){
        console.error('There was an error in the EmployeeDashboard saga', err);
    }
}

function* EmployeeClientsSaga() {
    yield takeEvery ('FETCH_EMPLOYEE_CLIENTS', fetchEmployeeClients);
}

export default EmployeeClientsSaga;