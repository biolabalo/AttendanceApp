import { axiosInstance } from '../helpers';

export const getAllTeams = () => async (dispatch) => {
  const teams = await axiosInstance.get('/teams/all');

  dispatch({
    type: 'GET_ALL_TEAMS',
    payload: teams.data.data,
  });
};

export const updateUserTeam = (team) => async (dispatch) => {
  dispatch({
    type: 'UPDATE_USER_TEAM',
    payload: team,
  });
};

export const getAllUsers = () => async (dispatch) => {
  const users = await axiosInstance.get('/teams/all-users');

  dispatch({
    type: 'GET_ALL_USERS',
    payload: users.data.data,
  });
};

export const deleteTeam = (name) => async (dispatch) => {
  await axiosInstance.delete(`/teams/${name}`);

  dispatch({
    type: 'DELETE_TEAM',
    payload: name,
  });
};

export const removeUserFromTeam = (name, user) => async (dispatch) => {
  await axiosInstance.delete(`/teams/user/${name}/${user.email}`);

  dispatch({
    type: 'DELETE_USER_FROM_TEAM',
    payload: { email: user.email },
  });
};

export const sortTeam = (users, department) => async (dispatch) => {
  const merge = (left, right) => {
    let arr = [];
    while (left.length && right.length) {
      if (left[0].department === department) {
        arr.push(left.shift());
      } else {
        arr.push(right.shift());
      }
    }

    return [...arr, ...left, ...right];
  };

  const mergeSort = (array) => {
    const half = array.length / 2;

    // Base case or terminating case
    if (array.length < 2) {
      return array;
    }

    const left = array.splice(0, half);
    return merge(mergeSort(left), mergeSort(array));
  };

  const new_users = mergeSort([...users]);

  dispatch({
    type: 'SORT_TEAM',
    payload: new_users,
  });
};

export const getUserSchedule = (user, month, year) => async (dispatch) => {
  const userSchedule = await axiosInstance.get(
    `/schedule/user?email=${user.email}&month=${month}&year=${year}`
  );

  dispatch({
    type: 'GET_USER_SCHEDULE',
    payload: {
      email: user.email,
      schedule: userSchedule.data.data,
    },
  });
};

export const addSchedule = (email, date, type) => async (dispatch) => {
  dispatch({
    type: 'ADD_SCHEDULE',
    payload: {
      email,
      schedule: { date, type },
    },
  });
};

export const assignTeamLead = (email) => async (dispatch) => {
  dispatch({
    type: 'ASSIGN_TEAM_LEAD',
    payload: email,
  });
};
