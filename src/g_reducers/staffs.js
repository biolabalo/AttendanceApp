import {
  GET_STAFF_DATA_SUCCESS,
  GET_STAFF_DATA_ERROR
} from '../g_actions/staff.constant';

export const initialState = {
  staffCount: 0,
  staffData: {
    earlyStaffs: [],
    absentStaffs: [],
    lateStaffs: [],
    remoteStaffs: [],
    leaveStaffs: [],
    allStaff: []
  },
  isLoading: true,
  isError: false
};

const staffs = (state = initialState, action) => {
  switch (action.type) {
    case GET_STAFF_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        staffData: action.payload,
        staffCount: action.payload?.staffCount,
        isError: false
      };
    case GET_STAFF_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
};

export default staffs;
