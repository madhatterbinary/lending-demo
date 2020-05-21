import {
  LOAD_CSRF_TOKEN,
  AUTH_SIGNIN,
  AUTH_ERROR,
  AUTH_LOGOUT,
  LOGOUT,
  LOGOUT_URL,
  SUBMIT_ACCESS_TOKEN,
} from 'js/Store/Constants/auth';
import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();

export const appStart = () => {
  return {
    type: LOAD_CSRF_TOKEN,
    payload: {
      request: {
        method: 'GET',
        url: `/${ env.REACT_APP_START_JOURNEY_ENDPOINT || 'i_want_a_stubbed_loan' }/`,
        params: {
          n: 'loan_application',
        },
      },
    },
  };
};

export const auth0SignIn = (profile, token) => {
  return {
    type: AUTH_SIGNIN,
    payload: {
      profile,
      token,
      newUser: false,
    },
  };
};

export const auth0Error = (error) => {
  return {
    type: AUTH_ERROR,
    payload: {
      error,
    },
  };
};

export const auth0Logout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
    payload: {
      client: 'connected',
      request: {
        method: 'GET',
        url: `${ LOGOUT_URL }`,
      },
    },
  };
};

export const submitAccessToken = (accessToken, type = 'signup') => {
  // Define base url for signup/login endpoints
  let authBase = '';
  let journeyType = localStorage.getItem('journeyType');
  if (journeyType === null) journeyType = 'lending';
  if (journeyType === 'savings') authBase = 'savings';
  if (journeyType === 'lending') authBase = 'lending';

  const url = type === 'signup'
    ? `/${ authBase }/callback/signup/`
    : `/${ authBase }/callback/`;

  return {
    type: `${ SUBMIT_ACCESS_TOKEN }${ type === 'signup' ? '' : '_LOGIN' }`,
    payload: {
      client: 'default',
      request: {
        method: 'GET',
        withCredentials: true,
        url,
        params: {
          token: accessToken,
        },
      },
    },
  };
};
