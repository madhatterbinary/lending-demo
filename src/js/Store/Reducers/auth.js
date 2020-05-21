import {
  AUTH_SIGNIN,
  AUTH_LOGOUT,
  LOGOUT,
  AUTH_ERROR,
  REDIRECT_TO_LOGOUT,
  REGISTRATION_SAVE_SECURITY_QUESTIONS,
  REGISTRATION_LOAD_SECURITY_QUESTIONS,
  REGISTRATION_SAVE_DATA,
} from 'js/Store/Constants/auth';

import { PENDING, SUCCESS, FAIL } from 'js/Store/Constants/axios';

export const initialState = {
  loadingToken: false,
  checkingToken: false,
  CSRF: '',
};

const auth0ActionMap = {
  [AUTH_SIGNIN]: (state, action) => {
    const { payload: { profile, token } } = action;
    return {
      ...state,
      auth0: {
        ...state.auth0,
        id: profile.global_client_id,
        profile,
        token,
      },
    };
  },
  [AUTH_LOGOUT]: () => {
    return {
      ...initialState,
    };
  },
  [AUTH_ERROR]: (state, action) => {
    const { payload: { error } } = action;
    return {
      ...state,
      auth0: {
        ...state.auth0,
        error,
      },
    };
  },
};

const signupActionsMap = {
  // Save registration values for signup
  [REGISTRATION_SAVE_DATA + PENDING]: (state) => {
    return {
      ...state,
      loadingSignupData: true,
    };
  },
  [REGISTRATION_SAVE_DATA + SUCCESS]: (state, action) => {
    const { payload: { data } } = action;
    return {
      ...state,
      loadingSignupData: false,
      accountInfo: {
        ...data.api_response,
      },
    };
  },
  [REGISTRATION_SAVE_DATA + FAIL]: (state) => {
    return {
      ...state,
      loadingSignupData: false,
    };
  },

  // signup user information load
  [REGISTRATION_LOAD_SECURITY_QUESTIONS + PENDING]: (state) => {
    return {
      ...state,
      dynamicData: {
        securityQuestions: [],
        management: {},
      },
      loadingDynamicData: true,
    };
  },
  [REGISTRATION_LOAD_SECURITY_QUESTIONS + SUCCESS]: (state, action) => {
    const { payload: { data } } = action;

    return {
      ...state,
      dynamicData: {
        securityQuestions: data.api_response.security_questions || [],
        management: data.api_response.management || {},
      },
      loadingDynamicData: false,
    };
  },
  [REGISTRATION_LOAD_SECURITY_QUESTIONS + FAIL]: (state) => {
    return {
      ...state,
      loadingDynamicData: false,
    };
  },

  // Save security questions during signup
  [REGISTRATION_SAVE_SECURITY_QUESTIONS + PENDING]: (state) => {
    return {
      ...state,
      loadingToken: true,
    };
  },
  [REGISTRATION_SAVE_SECURITY_QUESTIONS + SUCCESS]: (state, action) => {
    const { payload: { data } } = action;
    return {
      ...state,
      loadingToken: false,
      accountInfo: {
        ...data.api_response,
      },
    };
  },
  [REGISTRATION_SAVE_SECURITY_QUESTIONS + FAIL]: (state) => {
    return {
      ...state,
      loadingToken: false,
    };
  },
};

const logoutActionMap = {
  [LOGOUT]: (state) => {
    return {
      ...state,
      redirectToLogout: false,
    };
  },
  [REDIRECT_TO_LOGOUT]: (state) => {
    return {
      ...state,
      redirectToLogout: true,
    };
  },
};

const actionsMap = {
  ...auth0ActionMap,
  ...signupActionsMap,
  ...logoutActionMap,
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
