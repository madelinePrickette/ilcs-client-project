  const adminSingleTimesheet = (state = {}, action) => {
    switch (action.type) {
      case 'SET_ADMIN_SINGLE_TIMESHEET':
        // console.log('payload is', action.payload)
        return action.payload;
      case 'UNSET_ADMIN_SINGLE_TIMESHEET':
        return {};
      default:
        return state;
    }
  };
  
  export default adminSingleTimesheet;