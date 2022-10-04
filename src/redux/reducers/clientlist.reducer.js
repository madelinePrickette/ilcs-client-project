const clientListReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CLIENT_LIST':
      return action.payload;
    case 'UNSET_CLIENT_LIST':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default clientListReducer;
