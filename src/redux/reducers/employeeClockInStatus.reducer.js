const emplpoyeeClockInStatus = (state = {}, action) => {
    switch (action.type) {
      case 'SET_USER_STATUS':
        return action.payload;
      case 'UNSET_USER_STATUS':
        return {};
      default:
        return state;
    }
  };
  
  export default emplpoyeeClockInStatus;