import { login_user, logOut } from '../helpers';

export const login = (userObj) => async (dispatch) => {
  dispatch({
    type: 'Login',
    payload: { user: [], isAdmin: false },
  });

  const user = await login_user(userObj);

  dispatch({
    type: 'Login',
    payload: user,
  });

  return user;
};

export const updateAdminUser = (user) => async (dispatch) => {
  dispatch({
    type: 'UPDATE_ADMIN_USER',
    payload: user,
  });
};

export const log_out = () => async (dispatch) => {
  logOut();

  dispatch({
    type: 'RESET',
  });

  dispatch({
    type: 'Log_out',
    payload: { user: null, isAdmin: null },
  });
};
