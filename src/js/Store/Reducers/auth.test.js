/* global it, expect, describe */
import * as types from 'js/Store/Constants/auth';
import { PENDING, SUCCESS, FAIL } from 'js/Store/Constants/axios';
import authReducer, { initialState } from './auth.js';

describe('Auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle AUTH_SIGNIN', () => {
    const payload = {
      profile: {
        name: 'hello',
        global_client_id: '321',
      },
      token: '123',
    };
    expect(authReducer(
      initialState,
      {
        type: types.AUTH_SIGNIN,
        payload,
      }
    )).toEqual({
      ...initialState,
      auth0: {
        ...initialState.auth0,
        profile: {
          name: 'hello',
          global_client_id: '321',
        },
        token: '123',
        id: '321',
      },
    });
  });

  it('should handle AUTH_LOGOUT', () => {
    const payload = {};
    expect(authReducer(
      initialState,
      {
        type: types.AUTH_LOGOUT,
        payload,
      }
    )).toEqual({
      ...initialState,
    });
  });

  it('should handle AUTH_ERROR', () => {
    const payload = {
      error: 'blah',
    };
    expect(authReducer(
      initialState,
      {
        type: types.AUTH_ERROR,
        payload,
      }
    )).toEqual({
      ...initialState,
      auth0: {
        ...initialState.auth0,
        error: 'blah',
      },
    });
  });


  it('should handle REGISTRATION_SAVE_DATA', () => {
    const payload = {
      data: {
        api_response: {
          test: 'test',
        },
      },
    };
    expect(authReducer(
      initialState,
      {
        type: types.REGISTRATION_SAVE_DATA + PENDING,
        payload,
      }
    )).toEqual({
      ...initialState,
      loadingSignupData: true,
    });
    expect(authReducer(
      initialState,
      {
        type: types.REGISTRATION_SAVE_DATA + SUCCESS,
        payload,
      }
    )).toEqual({
      ...initialState,
      loadingSignupData: false,
      accountInfo: {
        test: 'test',
      },
    });
    expect(authReducer(
      initialState,
      {
        type: types.REGISTRATION_SAVE_DATA + FAIL,
        payload,
      }
    )).toEqual({
      ...initialState,
      loadingSignupData: false,
    });
  });

  it('should handle REGISTRATION_SAVE_SECURITY_QUESTIONS', () => {
    const payload = {
      data: {
        api_response: {
          test: 'test',
        },
      },
    };
    expect(authReducer(
      initialState,
      {
        type: types.REGISTRATION_SAVE_SECURITY_QUESTIONS + PENDING,
        payload,
      }
    )).toEqual({
      ...initialState,
      loadingToken: true,
    });
    expect(authReducer(
      initialState,
      {
        type: types.REGISTRATION_SAVE_SECURITY_QUESTIONS + SUCCESS,
        payload,
      }
    )).toEqual({
      ...initialState,
      accountInfo: {
        test: 'test',
      },
    });
    expect(authReducer(
      initialState,
      {
        type: types.REGISTRATION_SAVE_SECURITY_QUESTIONS + FAIL,
        payload,
      }
    )).toEqual({
      ...initialState,
    });
  });
});

it('should handle REGISTRATION_LOAD_SECURITY_QUESTIONS', () => {
  const payload = {
    data: {
      api_response: {
        securityQuestions: [],
        management: {},
      },
    },
  };
  expect(authReducer(
    initialState,
    {
      type: types.REGISTRATION_LOAD_SECURITY_QUESTIONS + PENDING,
      payload,
    }
  )).toEqual({
    ...initialState,
    dynamicData: {
      securityQuestions: [],
      management: {},
    },
    loadingDynamicData: true,
  });
  expect(authReducer(
    initialState,
    {
      type: types.REGISTRATION_LOAD_SECURITY_QUESTIONS + SUCCESS,
      payload,
    }
  )).toEqual({
    ...initialState,
    dynamicData: {
      securityQuestions: [],
      management: {},
    },
    loadingDynamicData: false,
  });
  expect(authReducer(
    initialState,
    {
      type: types.REGISTRATION_LOAD_SECURITY_QUESTIONS + FAIL,
      payload,
    }
  )).toEqual({
    ...initialState,
    loadingDynamicData: false,
  });
});

it('should handle REGISTRATION_SAVE_SECURITY_QUESTIONS', () => {
  const payload = {
    data: {
      api_response: {
        test: 'test',
      },
    },
  };
  expect(authReducer(
    initialState,
    {
      type: types.REGISTRATION_SAVE_SECURITY_QUESTIONS + PENDING,
      payload,
    }
  )).toEqual({
    ...initialState,
    loadingToken: true,
  });
  expect(authReducer(
    initialState,
    {
      type: types.REGISTRATION_SAVE_SECURITY_QUESTIONS + SUCCESS,
      payload,
    }
  )).toEqual({
    ...initialState,
    accountInfo: {
      test: 'test',
    },
  });
  expect(authReducer(
    initialState,
    {
      type: types.REGISTRATION_SAVE_SECURITY_QUESTIONS + FAIL,
      payload,
    }
  )).toEqual({
    ...initialState,
  });
});

it('should handle AUTH_LOGOUT', () => {
  const payload = {};
  expect(authReducer(
    initialState,
    {
      type: types.AUTH_LOGOUT,
      payload,
    }
  )).toEqual({
    ...initialState,
  });
});
