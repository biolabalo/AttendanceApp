export const initialState = null;

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_EVENTS':
      return action.payload;

    default:
      return state;
  }
};

export default user;
