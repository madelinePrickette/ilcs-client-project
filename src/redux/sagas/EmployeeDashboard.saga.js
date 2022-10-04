import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchEmployeeClients() {
    try {
        console.log('in fetchEmployeeClients saga')
        const response = yield axios.get('/api/EmployeeDashboard')
        yield put ({type: 'SET_EMPLOYEES_CLIENTS', payload: response.data})
        console.log('This employees clients:', response.data);
    }catch(err){
        console.error('There was an error in the EmployeeDashboard saga', err);
    }
}

function* EmployeeClientsSaga() {
    yield takeEvery ('FETCH_CLIENT_EMPLOYEES', fetchEmployeeClients);
}

export default EmployeeClientsSaga;