import { combineReducers } from "redux";

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

  const employeeSingleTimesheet = (state = {}, action) => {
    switch (action.type) {
      case 'SET_EMPLOYEE_SINGLE_TIMESHEET':
        // console.log('payload is', action.payload)
        return action.payload;
      case 'UNSET_EMPLOYEE_SINGLE_TIMESHEET':
        return {};
      default:
        return state;
    }
  };
  
  export default combineReducers({
    employeeClockInStatus,
    employeeSingleTimesheet,
  });