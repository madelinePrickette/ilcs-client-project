import { combineReducers } from 'redux';


const clientList = (state = [], action)=> {
    switch (action.type){
        case 'SET_CLIENTS':
            return action.payload;
        default:
            return state;
    }
};//end of clientList


export default clientList