const adminTimesheetsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ADMIN_TIMESHEETS':
        return action.payload;
      case 'UNSET_ADMIN_TIMESHEETS':
        return [];
      default:
        return state;
    }
  };

  //filtering reducer for the Admins view of the Employee timesheets

  export default adminTimesheetsReducer;