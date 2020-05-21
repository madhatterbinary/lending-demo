
/* global expect, it, describe */
import * as authActions from './auth';

describe('Auth actions', () => {
  it('should create an action to load csrf token', () => {
    const expectedAction = {
      type: 'LOAD_CSRF_TOKEN',
      payload: {
        request: {
          method: 'GET',
          url: '/i_want_a_stubbed_loan/', // should be env.REACT_APP_START_JOURNEY_ENDPOINT, but can't figure out how to mock runtimeEnv
          params: {
            n: 'loan_application',
          },
        },
      },
    };
    expect(authActions.appStart()).toEqual(expectedAction);
  });

  it('should create an action to auth start app', () => {
    const expectedAction = {
      type: 'AUTH_SIGNIN',
      payload: {
        profile: undefined,
        token: undefined,
        newUser: false,
      },
    };
    expect(authActions.auth0SignIn()).toEqual(expectedAction);
  });

  it('should create an action to auth error', () => {
    const expectedAction = {
      type: 'AUTH_ERROR',
      payload: {
        error: undefined,
      },
    };
    expect(authActions.auth0Error()).toEqual(expectedAction);
  });

  it('should create an action to logout', () => {
    const expectedAction = {
      type: 'LOGOUT',
      payload: {
        client: 'connected',
        request: {
          method: 'GET',
          url: 'LOGOUT_URL',
        },
      },
    };
    expect(authActions.logout()).toEqual(expectedAction);
  });
});
