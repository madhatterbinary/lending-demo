/* eslint-disable import/no-unused-modules */
import { APPLICATION_BOOTED,
  LOADING_ADDRESS_DATA,
  LOAD_TICKET_CHECKER,
  START_WAITING_ROOM,
  FINISH_WAITING_ROOM,
  APPLIATION_SAVE_QUOTE,
  APPLICATION_UPDATE_BREADCRUMBS,
  REQUEST_PASSWORD_RESET,
  REQUEST_VERIFICATION_EMAIL,
  LOAD_DEV_SESSION_DETAILS,
} from 'js/Store/Constants/application';
import { PENDING, SUCCESS, FAIL } from 'js/Store/Constants/axios';

export const initialState = {
  applicationBooted: false,
  loadingApplicationData: false,
  inWaitingRoom: false,
  ticketChecker: {
    addresses: [],
  },
  quickQuote: {
    monthlyRepayment: 0,
    totalRepayable: 0,
    representativeAPR: 0,
  },
  breadcrumbs: [],
};

// start loan application reducers
const bootActionMap = {
  [APPLICATION_BOOTED + SUCCESS]: (state) => {
    return {
      ...state,
      applicationBooted: true,
    };
  },
  [APPLIATION_SAVE_QUOTE]: (state, action) => {
    return {
      ...state,
      quickQuote: action.payload,
    };
  },
};

// waiting application reducers
const waitingRoomActionMap = {
  [START_WAITING_ROOM]: (state) => {
    return {
      ...state,
      inWaitingRoom: true,
    };
  },
  [FINISH_WAITING_ROOM]: (state) => {
    return {
      ...state,
      inWaitingRoom: false,
    };
  },
};

// address loader reducers
const addressLoaderActionMap = {
  [LOADING_ADDRESS_DATA + PENDING]: (state) => {
    return {
      ...state,
      loadingApplicationData: true,
    };
  },

  [LOADING_ADDRESS_DATA + SUCCESS]: (state, action) => {
    const { payload: { data } } = action;

    return {
      ...state,
      ticketChecker: {
        ...state.ticketChecker,
        addresses: (data || {}).addresses || [],
      },
      loadingApplicationData: false,
    };
  },

  [LOADING_ADDRESS_DATA + FAIL]: (state) => {
    return {
      ...state,
      loadingApplicationData: false,
    };
  },
};

const ticketCHeckerActionMap = {
  [LOAD_TICKET_CHECKER + PENDING]: (state) => {
    return {
      ...state,
      ticketChecker: {
        ...state.ticketChecker,
        addresses: [],
      },
    };
  },
  [LOAD_TICKET_CHECKER + SUCCESS]: (state, action) => {
    const { payload: { data } } = action;

    if (data.status === 'FAILED') {
      return {
        ...state,
        ticketChecker: {
          ...state.ticketChecker,
          addresses: [data.reason || ''],
        },
      };
    }

    return {
      ...state,
      ticketChecker: {
        ...state.ticketChecker,
        addresses: (data || {}).addresses || [],
      },
    };
  },
  [LOAD_TICKET_CHECKER + FAIL]: (state) => {
    return {
      ...state,
    };
  },
};

const uiActionMap = {
  [APPLICATION_UPDATE_BREADCRUMBS]: (state, action) => {
    return {
      ...state,
      breadcrumbs: action.payload.steps,
    };
  },
};

const miscActionMap = {
  [REQUEST_PASSWORD_RESET]: (state) => {
    return {
      ...state,
      miscMessage: {
        message: '',
      },
    };
  },
  [REQUEST_PASSWORD_RESET + SUCCESS]: (state, action) => {
    const {
      payload: { data },
    } = action;

    return {
      ...state,
      miscMessage: {
        message: (data.data.page_data || {}).message,
      },
    };
  },
  [REQUEST_VERIFICATION_EMAIL]: (state) => {
    return {
      ...state,
      miscMessage: {
        message: '',
      },
    };
  },
  [REQUEST_VERIFICATION_EMAIL + SUCCESS]: (state, action) => {
    const {
      payload: { data },
    } = action;

    return {
      ...state,
      miscMessage: {
        message: (data.data.page_data || {}).message,
      },
    };
  },
  // TODO: disable this in prod
  [LOAD_DEV_SESSION_DETAILS + SUCCESS]: (state, action) => {
    const {
      payload: { data },
    } = action;

    return {
      ...state,
      devSession: data,
    };
  },
};

const actionsMap = {
  ...bootActionMap,
  ...waitingRoomActionMap,
  ...addressLoaderActionMap,
  ...ticketCHeckerActionMap,
  ...uiActionMap,
  ...miscActionMap,
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
