/* eslint-disable prefer-destructuring */
import { SUCCESS, FAIL } from 'js/Store/Constants/axios';
import { LOADING_ADDRESS_DATA, LOAD_TICKET_CHECKER } from 'js/Store/Constants/application';
import { loadTicketChecker } from 'js/Store/Actions/application';

export default store => next => action => {
  if (action.type.includes(FAIL)) {
    return next(action);
  }
  switch (action.type) {
    case LOADING_ADDRESS_DATA + SUCCESS:
    case LOAD_TICKET_CHECKER + SUCCESS:
      if (action.payload.data.status === 'PENDING' && !action.payload.data.addresses) {
        store.dispatch(loadTicketChecker(action.payload.data.consumer));
      }
      return next(action);
    default:
      return next(action);
  }
};
