import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//worker functions
function* addClient (action) {
    try {
    yield axios.post('api/AdminAddClient', action.payload);

    } catch (error) {
        // console.log('User get request failed', error);
      }

}//end of addClient

function* AdminAddClient (){
    yield takeLatest('ADD_CLIENT', addClient);

}//end of AdminAddClient saga

export default AdminAddClient;