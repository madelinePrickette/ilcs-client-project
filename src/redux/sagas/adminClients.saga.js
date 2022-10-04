import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//worker functions
function* addClient (action) {
    try {
    yield axios.post('api/adminClients', action.payload);

    } catch (error) {
         console.log('Add client post failed', error);
    }
}//end of addClient

function* fetchClients () {
    try {
        const response = yield axios.get('/api/adminClients')
        console.log('this  is payload', response.data);
    } catch (error) {
        console.log('error  in get clients', error);
    }

}//end of fetchClients

function* adminClients (){
    yield takeLatest('ADD_CLIENT', addClient);
    yield takeLatest('FETCH_CLIENTS', fetchClients);

}//end of AdminAddClient saga

export default adminClients;