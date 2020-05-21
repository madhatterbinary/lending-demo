/* eslint-disable import/no-unused-modules */
//@flow
import { LOAD_STEP_DATA_PUBLIC, SUBMIT_STEP_DATA_CSRF, SUBMIT_PASSWORD_RESET, APP_WARNINGS_ERRORS, CONTINUE_JOURNEY, LOAD_RESOURCE_ENDPOINT, ACTION_VERIFICATION } from 'js/Store/Constants/generic';
import { PENDING, SUCCESS, FAIL } from 'js/Store/Constants/axios';

import { lendingJourneyStub, savingsJourneyStub } from 'js/Utils/journeyStubs';

// State type definition
// TODO: add server type definition once we have the final version
type GenericStateType = {
  feStubsOn: boolean,
  beStubsOn: boolean,
  loadingStepData: boolean,
  validators: Object,
  options: Object,
  initialData: Object,
  errors: Object,
  pageData: Object,
  stepReadOnly: boolean,
  csrfToken: string,
  toastError: boolean,
}

export const initialState = {
  feStubsOn: false,
  beStubsOn: false,
  loadingStepData: false,
  validators: {},
  options: {},
  initialData: {},
  errors: {},
  pageData: {},
  formData: {},
  stepReadOnly: false,
  csrfToken: '',
  isAuthenticated: false,
  toastError: false,
};

// Function to map server data structure to JS friendly object
const formatIncomingData: GenericStateType = (serverData, feStubsOn: boolean) => {
  // auto form fields
  let preSignupStub = '';
  const journeyType = localStorage.getItem('journeyType');
  if (journeyType === 'savings') preSignupStub = savingsJourneyStub;
  if (journeyType === 'lending') preSignupStub = lendingJourneyStub;
  // TODO: Backend to put addresses in value
  const initialValues = feStubsOn
    ? {
      ...preSignupStub,
      addresses: (((serverData.data || {}).form_data || {}).addresses || []).length
        ? serverData.data.form_data.addresses
        : preSignupStub.addresses,
      security_questions: ((serverData.data || {}).form_data || {}).security_questions
        ? ((serverData.data || {}).form_data || {}).security_questions
        : [],
    }
    : {
      ...serverData.data.form_data.value,
      addresses: (serverData.data.form_data.addresses || []).length
        ? serverData.data.form_data.addresses
        : [],
      security_questions: (serverData.data.form_data.security_questions || []).length
        ? serverData.data.form_data.security_questions
        : [],
    };

  let additionalPageData = {};
  if ((serverData.data || {}).form_data) {
    additionalPageData = { ...additionalPageData };
  }
  if (((serverData.data || {}).form_data || {}).security_questions) {
    additionalPageData = { ...additionalPageData, security_questions: serverData.data.form_data.security_questions };
  }
  return {
    loadingStepData: false,
    validators: ((serverData.data || {}).form_data || {}).validators,
    options: ((serverData.data || {}).form_data || {}).options,
    toastError: false,
    initialData: {
      // SERVER DATA
      ...initialValues,
      // IOVATION VALUES
      // TODO: look for backend flag on when to send these
      fpblackbox: document.getElementById('fpblackbox').value,
      tpblackbox: document.getElementById('tpblackbox').value,
    },
    errors: serverData.errors,
    formData: initialValues, // to remove this maybe?
    pageData: { ...(serverData.data || {}).page_data, ...additionalPageData },
    stepReadOnly: serverData.read_only,
    csrfToken: serverData.csrf_token,
    isAuthenticated: serverData.user_authenticated,
    serverData,
  };
};

const formatSubmitResponseData: GenericStateType = (serverData) => {
  return {
    loadingStepData: false,
    errors: serverData.errors,
    csrfToken: serverData.csrf_token,
    serverData,
  };
};

const loadStepDataActionMap = {
  // Public GET's
  [LOAD_STEP_DATA_PUBLIC + PENDING]: (state: GenericStateType) => {
    return {
      ...state,
      loadingStepData: true,
    };
  },
  [LOAD_STEP_DATA_PUBLIC + FAIL]: (state: GenericStateType, action) => {
    const { error: { response } } = action;
    return {
      ...state,
      errors: ((response || {}).data || {}).errors,
      loadingStepData: false,
    };
  },
  [LOAD_STEP_DATA_PUBLIC + SUCCESS]: (state: GenericStateType, action) => {
    const { payload: { data } } = action;
    const processedData = formatIncomingData(data, state.feStubsOn);
    return {
      ...state,
      ...processedData,
      loadingStepData: false,
      toastError: false,
    };
  },
};

const submitStepDataActionMap = {
  // Public POST's
  [SUBMIT_STEP_DATA_CSRF + PENDING]: (state: GenericStateType) => {
    return {
      ...state,
    };
  },
  [SUBMIT_STEP_DATA_CSRF + FAIL]: (state: GenericStateType) => {
    return {
      ...state,
    };
  },
  [SUBMIT_STEP_DATA_CSRF + SUCCESS]: (state: GenericStateType, action) => {
    const { payload: { data: { data } } } = action;
    const processedData = formatSubmitResponseData(data, state.feStubsOn);
    return {
      ...state,
      ...processedData,
      ...action,
    };
  },
  [CONTINUE_JOURNEY + FAIL]: (state: GenericStateType, action) => {
    const { payload } = action;
    return {
      ...state,
      ...payload,
      ...action,
    };
  },
  [CONTINUE_JOURNEY + SUCCESS]: (state: GenericStateType, action) => {
    const { payload: { data } } = action;
    return {
      ...state,
      ...data,
      ...action,
    };
  },
};

const loadPasswordRestActionMap = {
  // Public GET's
  [SUBMIT_PASSWORD_RESET + PENDING]: (state: GenericStateType) => {
    return {
      ...state,
      loadingStepData: true,
    };
  },
  [SUBMIT_PASSWORD_RESET + FAIL]: (state: GenericStateType, action) => {
    const { error: { response } } = action;
    return {
      ...state,
      errors: ((response || {}).data || {}).errors,
      loadingStepData: false,
    };
  },
  [SUBMIT_PASSWORD_RESET + SUCCESS]: (state: GenericStateType, action) => {
    const { payload: { data } } = action;
    const processedData = formatIncomingData(data, state.feStubsOn);
    return {
      ...state,
      ...processedData,
      loadingStepData: false,
    };
  },
};

const stubsActionMap = {
  // Public POST's
  'TOGGLE_FRONTEND_STUBS': (state: GenericStateType) => {
    return {
      ...state,
      feStubsOn: !state.feStubsOn,
    };
  },
  'TOGGLE_BACKEND_STUBS_ON_SUCCESS': (state: GenericStateType) => {
    return {
      ...state,
      beStubsOn: true,
    };
  },
  'TOGGLE_BACKEND_STUBS_OFF_SUCCESS': (state: GenericStateType) => {
    return {
      ...state,
      beStubsOn: false,
    };
  },
  'RESET_SESSION_SUCCESS': (state: GenericStateType) => {
    return {
      ...state,
      beStubsOn: false,
    };
  },
};

const errorsWarningsActionMap = {
  // Errors Warnings
  [APP_WARNINGS_ERRORS]: (state: GenericStateType, param: String) => {
    return {
      ...state,
      warning: param,
    };
  },
};

const loadResourceEndpointActionMap = {
  // Public GET's
  [LOAD_RESOURCE_ENDPOINT + PENDING]: (state: GenericStateType) => {
    return {
      ...state,
      loadingStepData: true,
    };
  },
  [LOAD_RESOURCE_ENDPOINT + FAIL]: (state: GenericStateType, action) => {
    const { error: { response } } = action;
    return {
      ...state,
      errors: ((response || {}).data || {}).errors,
      loadingStepData: false,
    };
  },
  [LOAD_RESOURCE_ENDPOINT + SUCCESS]: (state: GenericStateType, action) => {
    const { payload: { data } } = action;
    /// const processedData = formatIncomingData(data, state.feStubsOn);

    return {
      ...state,
      ...data,
      loadingStepData: false,
      toastError: false,
    };
  },
};

const actionVerificationActionMap = {
  // Errors Warnings
  [ACTION_VERIFICATION]: (state: GenericStateType, msg: String) => {
    return {
      ...state,
      verifmessage: msg,
    };
  },
};

const actionsMap = {
  ...stubsActionMap,
  ...loadStepDataActionMap,
  ...submitStepDataActionMap,
  ...loadPasswordRestActionMap,
  ...errorsWarningsActionMap,
  ...loadResourceEndpointActionMap,
  ...actionVerificationActionMap,
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
