  const adminSingleTimesheet = (state = {}, action) => {
    switch (action.type) {
      case 'SET_ADMIN_SINGLE_TIMESHEET':
        return action.payload;
      case 'UNSET_ADMIN_SINGLE_TIMESHEET':
        return {};
      default:
        return state;
    }
  };
  
  export default adminSingleTimesheet;