/* eslint-disable no-unused-vars */
import moment from 'moment';
import { csrf, sessionCreatedAt } from 'js/Store/Constants/LocalStorageConstants';

export default store => next => action => {
  const { payload } = action;
  if (payload && payload.data && payload.data.csrf_token) {
    localStorage.setItem(csrf, action.payload.data.csrf_token);
    localStorage.setItem(sessionCreatedAt, moment().format());
  }
  return next(action);
};
