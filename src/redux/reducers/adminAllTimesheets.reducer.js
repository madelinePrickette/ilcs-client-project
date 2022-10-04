const adminAllTimesheets = (state = [], action) => {
    switch (action.type) {
      case 'SET_ADMIN_ALL_TIMESHEETS':
        return action.payload;
      case 'UNSET_ADMIN_ALL_TIMESHEETS':
        return [];
      default:
        return state;
    }
  };