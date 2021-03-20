import { combineReducers } from 'redux';
import auth from 'g_reducers/user';
import staff from 'g_reducers/staffs';
import teams from 'g_reducers/teams';
import events from 'g_reducers/events';

const reducers = combineReducers({
  auth,
  staff,
  teams,
  events,
});

export default reducers;
