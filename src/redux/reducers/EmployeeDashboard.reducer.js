const EmployeeClientsReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_EMPLOYEES_CLIENTS':
        return action.payload;
      default:
        return state;
    }
  };