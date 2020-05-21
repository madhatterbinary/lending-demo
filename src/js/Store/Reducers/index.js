/* eslint-disable import/no-unused-modules */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import application from './application';

import genericStepReducer from './generic';

export default (history) => combineReducers({
  router: connectRouter(history),
  form: formReducer,
  application,
  stepData: genericStepReducer,
});
