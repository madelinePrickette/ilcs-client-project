const clientInfoClockInReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_CLIENT_INFO_CLOCK_IN':
        console.log('payload is', action.payload);
        return action.payload;
      case 'UNSET_CLIENT_INFO_CLOCK_IN':
        return {};
      default:
        return state;
    }
  };

  export default clientInfoClockInReducer;