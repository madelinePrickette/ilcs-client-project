const emplpoyeeClockInReducer = (state = {}, action) => {
    switch (action.type) {
      case 'EMPLOYEE_CLOCK_IN':
        return action.payload;
      case 'UNSET_EMPLOYEE_CLOCK_IN':
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default emplpoyeeClockInReducer;