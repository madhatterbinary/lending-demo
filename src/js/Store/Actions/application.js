/* eslint-disable import/no-unused-modules */
import { REQUEST_PASSWORD_RESET, REQUEST_VERIFICATION_EMAIL, APPLICATION_BOOTED, APPLICATION_UPDATE_BREADCRUMBS, LOADING_ADDRESS_DATA, LOAD_TICKET_CHECKER, START_WAITING_ROOM, FINISH_WAITING_ROOM, RESET_SESSION, VERIFY_EMAIL, CHECK_LOAN_TRESHOLD } from 'js/Store/Constants/application';
import { csrf, sessionCreatedAt } from 'js/Store/Constants/LocalStorageConstants';
import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();

// toggle backend stubs
export const toggleBackendStubs = () => {
  return {
    type: 'TOGGLE_BACKEND_STUBS_ON',
    payload: {
      client: 'default',
      request: {
        method: 'GET',
        withCredentials: true,
        url: '/dev/stubs/on',
      },
    },
  };
};

export const disableBackendStubs = () => {
  return {
    type: 'TOGGLE_BACKEND_STUBS_OFF',
    payload: {
      client: 'default',
      request: {
        method: 'GET',
        withCredentials: true,
        url: '/dev/stubs/off',
      },
    },
  };
};


export const appStart = (n = '') => {
  //const params = n ? { n } : { n: 'loan_application' }; demo_journey
  const params = n ? { n } : { n: 'demo_journey' };
  return {
    type: APPLICATION_BOOTED,
    payload: {
      client: 'default',
      request: {
        method: 'GET',
        withCredentials: true,
        url: `/${ env.REACT_APP_START_JOURNEY_ENDPOINT }/`,
        params,
      },
    },
  };
};

export const appContinue = (tok = '') => {
  return {
    type: APPLICATION_BOOTED,
    payload: {
      client: 'default',
      request: {
        method: 'GET',
        withCredentials: true,
        url: `/${ env.REACT_APP_START_JOURNEY_ENDPOINT }/`,
        params: {
          tok,
        },
      },
    },
  };
};

export const appStartDistributions = (jwt) => {
  return {
    type: APPLICATION_BOOTED,
    payload: {
      client: 'default',
      request: {
        method: 'GET',
        withCredentials: true,
        url: `/${ env.REACT_APP_START_JOURNEY_ENDPOINT }/`,
        params: {
          jwt,
        },
      },
    },
  };
};

export const resetSession = () => {
  localStorage.removeItem(csrf);
  localStorage.removeItem(sessionCreatedAt);
  localStorage.removeItem('disableManageLoan');
  localStorage.removeItem('pathnameCloseLoan');
  localStorage.removeItem('runOption');
  localStorage.removeItem('loanClosed');
  return {
    type: RESET_SESSION,
    payload: {
      client: 'default',
      request: {
        method: 'GET',
        withCredentials: true,
        url: '/logout/',
      },
    },
  };
};

export const checkLoanTreshold = () => {
  return {
    type: CHECK_LOAN_TRESHOLD,
    payload: {
      client: 'default',
      request: {
        method: 'GET',
        withCredentials: true,
        url: '/lending/_d_loan_threshold_check/',
      },
    },
  };
};

export const verifyEmailValidation = () => {
  return {
    type: VERIFY_EMAIL,
    payload: {
      client: 'default',
      request: {
        method: 'GET',
        withCredentials: true,
        url: '/lending/_d_customer_account_check/',
      },
    },
  };
};


export const loadAddressesForPostcode = (postcode, building = 100) => {
  return {
    type: LOADING_ADDRESS_DATA,
    payload: {
      client: 'csrfOnly',
      request: {
        method: 'POST',
        withCredentials: true,
        url: '/postcode_checker/',
        data: {
          postcode,
          building,
        },
      },
    },
  };
};

export const loadTicketChecker = (consumer) => {
  return {
    type: LOAD_TICKET_CHECKER,
    payload: {
      client: 'default',
      request: {
        method: 'GET',
        withCredentials: true,
        url: '/lending/ticket_checker',
        params: {
          consumer,
        },
      },
    },
  };
};

export const startWaitingRoom = () => {
  return {
    type: START_WAITING_ROOM,
    payload: {},
  };
};

export const finishWaitingRoom = () => {
  return {
    type: FINISH_WAITING_ROOM,
    payload: {},
  };
};

export const updateBreadCrumbs = (steps) => {
  return {
    type: APPLICATION_UPDATE_BREADCRUMBS,
    paylaod: {
      steps,
    },
  };
};

export const requestPaswordReset = () => {
  return {
    type: REQUEST_PASSWORD_RESET,
    payload: {
      client: 'default',
      request: {
        method: 'GET',
        // withCredentials: true,
        url: '/api/password/reset',
      },
    },
  };
};


export const requestVerificationEmail = () => {
  return {
    type: REQUEST_VERIFICATION_EMAIL,
    payload: {
      client: 'default',
      request: {
        method: 'GET',
        withCredentials: true,
        url: '/api/verification_email/resend/',
      },
    },
  };
};
