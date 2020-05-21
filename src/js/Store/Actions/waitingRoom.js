/* eslint-disable import/no-unused-modules */
import {
  WAITING_ROOM_LOAD_DATA,
} from 'js/Store/Constants/waitingRoom';

// start loan data
export const loadWaitingRoom = (url) => {
  return {
    type: WAITING_ROOM_LOAD_DATA,
    payload: {
      client: 'default',
      request: {
        withCredentials: true,
        method: 'GET',
        url,
      },
    },
  };
};
