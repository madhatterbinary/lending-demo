/* eslint-disable no-unused-vars */
import moment from 'moment';
import { csrf, sessionCreatedAt } from 'js/Store/Constants/LocalStorageConstants';
import { registerField, change } from 'redux-form';
import { LOAD_STEP_DATA_PUBLIC } from 'js/Store/Constants/generic';
import { SUCCESS, FAIL } from 'js/Store/Constants/axios';


export default store => next => action => {
  const { payload } = action;
  // TODO: look for flag
  switch (action.type) {
    case LOAD_STEP_DATA_PUBLIC + SUCCESS:
      store.dispatch(registerField('form-screen', 'fpblackbox', 'Field'));
      store.dispatch(registerField('form-screen', 'tpblackbox', 'Field'));
      return next(action);

    default:
      return next(action);
  }
};
