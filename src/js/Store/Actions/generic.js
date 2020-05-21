/* eslint-disable import/no-unused-modules */
//@flow
import { LOAD_STEP_DATA_PUBLIC, SUBMIT_STEP_DATA_CSRF, CONTINUE_JOURNEY, WAITING_ROOM_LOAD_DATA, SUBMIT_PASSWORD_RESET, APP_WARNINGS_ERRORS, LOAD_RESOURCE_ENDPOINT, ACTION_VERIFICATION } from '../Constants/generic';

// Axios client definitions can be found in src/../Api/axios.js
// Client configuration:
//    withCredentials: true;
//        ensures that AXIOS submits the session cookies with the request.
//        this is mandatory for every request
//    client: 'default';
//        does not attach any authentication headers to the request
//    client: 'csrfOnly';
//        attaches only the CSRF token to request's header

// Loading step data for steps
export const loadStepDataPublic = (url: string, params: Object) => {
  return {
    type: LOAD_STEP_DATA_PUBLIC,
    payload: {
      client: 'default',
      request: {
        method: 'GET',
        // withCredentials: true,
        url,
        params: {
          ...params,
        },
      },
    },
  };
};

// Submitting step data for steps
// This action should be used for all the POST requests
export const submitStepDataCSRF = (url: string, values: Object) => {
  return {
    type: SUBMIT_STEP_DATA_CSRF,
    payload: {
      client: 'csrfOnly',
      request: {
        method: 'POST',
        withCredentials: true,
        url,
        data: {
          ...values,
        },
      },
    },
  };
};

// Loading step data for steps involving delegates
export const continueJourney = () => {
  return {
    type: CONTINUE_JOURNEY,
    payload: {
      client: 'default',
      request: {
        method: 'GET',
        withCredentials: true,
        url: '/continue_journey/',
      },
    },
  };
};
// TODO: base it on env/product
// Loading step data for steps involving delegates
export const startBankAccountUpdate = (base = '/lending') => {
  return {
    type: LOAD_STEP_DATA_PUBLIC,
    payload: {
      client: 'default',
      request: {
        method: 'GET',
        withCredentials: true,
        url: `${ base }/account/bank_account_update/start`,
      },
    },
  };
};

export const startBankAccountUpdateWID = (base = '/lending') => {
  return {
    type: LOAD_STEP_DATA_PUBLIC,
    payload: {
      client: 'default',
      request: {
        method: 'GET',
        withCredentials: true,
        url: `${ base }/account/bank_account_update_wid_start`,
      },
    },
  };
};

export const startAddressUpdate = (base = '/customer') => {
  return {
    type: LOAD_STEP_DATA_PUBLIC,
    payload: {
      client: 'default',
      request: {
        method: 'GET',
        withCredentials: true,
        url: `${ base }/account/address_update/start`,
      },
    },
  };
};

export const endAddressUpdate = (base = '/account') => {
  return {
    type: LOAD_STEP_DATA_PUBLIC,
    payload: {
      client: 'default',
      request: {
        method: 'GET',
        withCredentials: true,
        url: `${ base }/address_update/end`,
      },
    },
  };
};

export const loadWaitingRoom = () => {
  return {
    type: WAITING_ROOM_LOAD_DATA,
    payload: {
      client: 'default',
      request: {
        withCredentials: true,
        method: 'GET',
        url: '/pageloading/',
      },
    },
  };
};

// toggle frontend only stubs
export const toggleFrontendStubs = () => {
  return {
    type: 'TOGGLE_FRONTEND_STUBS',
    payload: null,
  };
};

// Submitting password reset - this action should be remove if clement has a new enpoint for submitting the reset which allow user to stay in the same page
export const submitPasswordReset = (url: string, params: Object) => {
  return {
    type: SUBMIT_PASSWORD_RESET,
    payload: {
      client: 'default',
      request: {
        method: 'GET',
        // withCredentials: true,
        url,
        params: {
          ...params,
        },
      },
    },
  };
};

export const appWarningsErrors = (msg = '', errcode = 0, iserror = false) => {
  return {
    type: APP_WARNINGS_ERRORS,
    payload: {
      msg,
      errcode,
      iserror,
    },
  };
};

// Loading step data for steps
export const loadResourceEndpoint = (url: string, params: Object) => {
  return {
    type: LOAD_RESOURCE_ENDPOINT,
    payload: {
      client: 'default',
      request: {
        method: 'GET',
        url,
        params: {
          ...params,
        },
      },
    },
  };
};

export const actionVerification = (msg = '') => {
  return {
    type: ACTION_VERIFICATION,
    payload: {
      msg,
    },
  };
};
