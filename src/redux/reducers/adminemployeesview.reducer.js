const adminEmployeesViewReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_EMPLOYEES_LIST':
      return action.payload;
    case 'UNSET_EMPLOYEES_LIST':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default adminEmployeesViewReducer;
