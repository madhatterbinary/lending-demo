/* eslint-disable import/no-unused-modules */
import Raven from 'raven-js';

// Redux
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Middleware & Axios
import { multiClientMiddleware } from 'redux-axios-middleware';
import { clients } from 'js/Store/Api/axios';
import YobotaMiddleware from 'js/Store/Middleware/';
import createRavenMiddleware from 'raven-for-redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import runtimeEnv from '@mars/heroku-js-runtime-env';

import { removeDataValues } from 'js/Utils/dataProcessor';


const env = runtimeEnv();

const enhancedComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const history = createBrowserHistory();
Raven.config(env.REACT_APP_SENTRY_DSN, { ignoreUrls: [/localhost/] }).install();


const middleware = applyMiddleware(
  thunk,
  // axios majic
  multiClientMiddleware(clients),
  // Yobota middleware
  YobotaMiddleware.genericApplicationMiddleware,
  YobotaMiddleware.redirectMiddleware,
  YobotaMiddleware.formValidationMiddleware,
  YobotaMiddleware.tokenMiddleware,
  YobotaMiddleware.iovationMiddleware,
  routerMiddleware(history),

  // Error logging
  createRavenMiddleware(Raven, {
    actionTransformer: (d) => removeDataValues(d),
    stateTransformer: (d) => removeDataValues(d) })
);

export default rootReducer => createStore(
  rootReducer(history),
  enhancedComposer(middleware)
);
