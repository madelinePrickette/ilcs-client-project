import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//Adds new client to database, then fetches all clients from database.
function* addClient (action) {
    try {
    const response = yield axios.post('api/adminClients', action.payload);
    yield put({ type: 'FETCH_CLIENTS', payload: response.data });

    } catch (error) {
         console.log('Add client post failed', error);
    }
}//end of addClient

//Soft Delete Client: Updates the client's client_active status to false in database.
//Then deletes any row in the user_client table that includes the inactive client.
//Lastly, fetches all clients from database.
function* deleteClient (action) {
    try{
        console.log('this is delete payload:', action.payload);
        yield axios.put( `/api/adminClients/delete/${action.payload}`);
        yield axios.delete(`/api/adminClients/${action.payload}`);
        yield put({ type: 'FETCH_CLIENTS' });
    } catch (error) {
        console.log('error in client delete', error);
    }
}//end of delete client

//Fetches all clients from the database. 
//Then, sends dispatch with the client data as payload to be rendered on DOM.
function* fetchClients () {
    try {
        const response = yield axios.get('/api/adminClients');
        yield put({ type: 'SET_CLIENTS', payload: response.data });
        
    } catch (error) {
        console.log('error  in get clients', error);
    }
}//end of fetchClients

//Updates client table with edited client information.
//Fetches all clients from database.
function* editClient (action){
    try{
        yield axios.put( `/api/adminClients/edit/client`, action.payload);
        yield put({ type: 'FETCH_CLIENTS' });
    } catch (error) {
        console.log('error  in edit Clients', error);
    }

}//end of editClient

function* adminClients (){
    yield takeEvery('FETCH_CLIENTS', fetchClients);
    yield takeEvery('ADD_CLIENT', addClient);
    yield takeEvery('DELETE_CLIENT', deleteClient);
    yield takeEvery('EDIT_CLIENT', editClient);
}//end of AdminAddClient saga

export default adminClients;