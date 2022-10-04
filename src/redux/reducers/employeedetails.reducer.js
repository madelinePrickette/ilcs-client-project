const employeeDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_EMPLOYEE':
      return action.payload;
    case 'UNSET_CURRENT_EMPLOYEE':
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default employeeDetailsReducer;
