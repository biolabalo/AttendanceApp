import { axiosInstance } from '../helpers';

export const getAllEvents = () => async (dispatch) => {
  const events = await axiosInstance.get('/events');

  dispatch({
    type: 'GET_ALL_EVENTS',
    payload: events.data.data,
  });
};
