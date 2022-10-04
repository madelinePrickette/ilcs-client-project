const clientListReducer = (
  state = { employeeClientList: [], clientList: [] },
  action
) => {
  switch (action.type) {
    case "SET_EMPLOYEE_CLIENT_LIST":
      return { ...state, employeeClientList: action.payload };
    case "SET_CLIENT_LIST":
      return { ...state, clientList: action.payload };
    case "UNSET_CLIENT_LIST":
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default clientListReducer;
