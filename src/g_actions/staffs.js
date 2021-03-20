import { requests } from 'helpers';
import {
GET_STAFF_DATA_SUCCESS,
GET_STAFF_DATA_ERROR,
} from './staff.constant'
 const getDailyStaffData = (staffCount) => async (dispatch) => {
   if(staffCount) return;
  try {
 
    const { data } = await requests.get('/user/staffs_per_day');

    dispatch({
      type: GET_STAFF_DATA_SUCCESS,
      payload: data,
    });
    
  } catch (error) {
    return dispatch({
      type: GET_STAFF_DATA_ERROR,
    });
  }
};
export default getDailyStaffData;