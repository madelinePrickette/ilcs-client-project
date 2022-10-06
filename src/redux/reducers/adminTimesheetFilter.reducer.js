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

  export default adminTimesheetsReducer;