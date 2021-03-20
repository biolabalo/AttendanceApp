export const initialState = null;

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_TEAMS':
      return { teams: action.payload };

    case 'UPDATE_USER_TEAM':
      return {
        teams: state.teams.find((team) => team.code === action.payload.name)
          ? state.teams
          : [...state.teams, { code: action.payload.name }],
        users: state.users.map((user) => {
          if (action.payload.users[user.email]) {
            return { ...user, department: action.payload.name };
          }
          return user;
        }),
      };

    case 'ASSIGN_TEAM_LEAD':
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.email === action.payload) {
            return {
              ...user,
              role: user.role === 'team_lead' ? 'staff' : 'team_lead',
            };
          }
          return { ...user, role: 'staff' };
        }),
      };

    case 'DELETE_USER_FROM_TEAM':
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.email === action.payload.email) {
            return { ...user, department: null };
          }
          return user;
        }),
      };

    case 'GET_USER_SCHEDULE':
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.email === action.payload.email) {
            return { ...user, schedule: action.payload.schedule || [] };
          }
          return user;
        }),
      };

    case 'ADD_SCHEDULE':
      let el = true;
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.email === action.payload.email) {
            return {
              ...user,
              schedule:
                user.schedule.length === 0
                  ? [action.payload.schedule]
                  : user.schedule.reduce((acc, cur, i) => {
                      if (
                        cur.date === action.payload.schedule.date &&
                        cur.type === action.payload.schedule.type
                      ) {
                        el = false;
                        return acc;
                      }

                      if (el && i === user.schedule.length - 1) {
                        return [...acc, cur, action.payload.schedule];
                      }

                      return [...acc, cur];
                    }, []),
            };
          }
          return user;
        }),
      };

    case 'GET_ALL_USERS':
      return { ...state, users: action.payload };

    case 'DELETE_TEAM':
      return {
        teams: state.teams.filter((team) => team.code !== action.payload),
        users: state.users.map((user) => {
          if (user.department === action.payload) {
            return { ...user, department: null };
          }
          return user;
        }),
      };

    case 'SORT_TEAM':
      return { ...state, users: action.payload };

    default:
      return state;
  }
};

export default user;
