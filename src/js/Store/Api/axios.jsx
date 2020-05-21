/* eslint-disable no-unused-vars */
import axios from 'axios';
import { csrf, jwt, sessionID } from 'js/Store/Constants/auth';
import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();

export const BASE_URL = env.REACT_APP_BASE_URL;
const BRAND_NAME = env.REACT_APP_BRAND_NAME;
const JSON_BASE_URL = '/json/';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
axios.defaults.headers.common = {
  'host-organisation-name': BRAND_NAME,
};

const baseURL = BASE_URL;
const authenticatedURL = `${ BASE_URL }`;

const instance = axios.create({ baseURL });
const connectedInstance = axios.create({ baseURL });

const stubInstance = axios.create({ baseURL: JSON_BASE_URL });

export const clients = {
  default: {
    client: instance,
  },
  stub: {
    client: stubInstance,
  },
  csrfOnly: {
    client: connectedInstance,
    options: {
      interceptors: {
        request: [{
          success: ({ getState, dispatch, getSourceAction }, req) => {
            const csrfToken = localStorage.getItem(csrf);

            req.headers = {
              ...req.headers,
              'X-CSRFToken': csrfToken,
            };
            return req;
          },
        }],
      },
    },
  },
};

export default instance;
