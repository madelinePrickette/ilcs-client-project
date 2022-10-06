const employeeClockInStatus = (state = [], action) => {
    switch (action.type) {
      case 'SET_EMPLOYEE_TIMESHEETS':
        return action.payload;
      case 'UNSET_EMPLOYEE_TIMESHEETS':
        return {};
      default:
        return state;
    }
  };
  
  export default employeeClockInStatus;