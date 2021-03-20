export const initialState = {
  user: [],
  isAdmin: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'Login':
      return action.payload;
    case 'Log_out':
      return action.payload;
    case 'UPDATE_ADMIN_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
};

export default user;
