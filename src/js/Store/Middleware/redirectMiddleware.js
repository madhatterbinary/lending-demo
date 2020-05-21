/* eslint-disable prefer-destructuring */
import { push } from 'connected-react-router';
import { loadStepDataPublic, continueJourney, loadWaitingRoom, startBankAccountUpdate, startBankAccountUpdateWID, startAddressUpdate, appWarningsErrors, loadResourceEndpoint } from 'js/Store/Actions/generic';
import { startWaitingRoom, finishWaitingRoom } from 'js/Store/Actions/application';

import { SUCCESS, FAIL } from 'js/Store/Constants/axios';

import { LOAD_STEP_DATA_PUBLIC, SUBMIT_STEP_DATA_CSRF, CONTINUE_JOURNEY, WAITING_ROOM_LOAD_DATA, LOAD_RESOURCE_ENDPOINT } from 'js/Store/Constants/generic';
import { SUBMIT_ACCESS_TOKEN } from 'js/Store/Constants/auth';
import { APPLICATION_BOOTED, RESET_SESSION, VERIFY_EMAIL } from 'js/Store/Constants/application';

import { appUrlMapper, apiUrlMapper } from 'js/Utils/urlMapper.js';

const LOAD_API_FOR_STEPS_WHITELIST = [
  'savings_details',
  'savings_signup',
  'savings_landing',
  'savings_documents_check',
  'personal_details',
  'contact_details',
  'product_offer',
  'id_verification',
  'account',
  'loan_and_payment',
  'verify_email',
  'direct_debit_mandate',
  'direct_debit_confirmation',
  'documents_and_agreement',
  'credit_reference',
  'payment_redirect',
  'payment_finalising',
  'right_to_withdrawal_agreement',
  'right_to_withdrawal_payment',
  'right_to_withdrawal_redirect',
  'right_to_withdrawal_processing',
  'right_to_withdrawal_finalising',
  'early_settlement_redirect',
  'early_settlement_finalising',
  'early_settlement_completed',
];

const SAVINGS_SERVICING_JOURNEY_ENDS = [
  'savings_bank_account_update_end',
  'savings_bank_account_update_wid_end',
  'savings_address_update_end',
  'savings_account',
];

const LENDING_SERVICING_JOURNEY_ENDS = [
  'bank_account_update_end',
  'address_update_end',
  'customer_account',
  'update_account_details',
];

const SERVICING_OVERVIEW_SCREENS = [
  'customer_overview',
  'savings_overview',
];

const WAITING_ROOM_STEPS = [
  'waiting_room',
  'lending_waiting_room',
];

const CONTINUE_JOURNEY_STEPS = [
  'continue_journey',
];
let increment = 0;

export default store => next => action => {
  if ((action || {}).type === 'ACTION_VERIFICATION') {
    localStorage.setItem('emailVerified', ((action || {}).payload || {}).msg);
  }
  if (((action.payload || {}).request || {}).url) {
    if (action.payload.request.url.includes('/savings/elect_full_refund') || action.payload.request.url.includes('/savings/election_journey/success/')) {
      store.dispatch(loadResourceEndpoint('/v1/people/?host_organisation_name=smartsave'));
    }
  }

  if (!localStorage.getItem('journeyType')) {
    let journeyType = null;
    if (window.location.pathname.includes('savings')) journeyType = 'savings';
    if (window.location.pathname.includes('lending')) journeyType = 'lending';
    localStorage.setItem('journeyType', journeyType);
  }

  if (((((((action || {}).payload || {}).data || {}).form_errors || {}).base_form || {}).postcode || {})[0] === 'Use a valid postcode e.g. SW1A 1AA') {
    store.dispatch(finishWaitingRoom());
    store.dispatch(appWarningsErrors('Unable to fetch address, please enter your address manually.', Number(increment++), true));
    return next(action);
  }

  if (((((((action || {}).error || {}).response || {}).data || {}).errors || {}).system_errors || {}).message === 'Too many invalid attempts for bank account verification.') {
    store.dispatch(appWarningsErrors('Too many invalid attempts for bank account verification.', Number(increment++), true));
    store.dispatch(push('/lending/servicing/myaccount'));
    return next(action);
  }

  if ((((((action || {}).payload || {}).data || {}).data || {}).page_data || {}).failed_verification) {
    store.dispatch(finishWaitingRoom());
    store.dispatch(appWarningsErrors('Please, check your mailbox, your email has not been verified yet.', Number(increment++), true));
    return next(action);
  }

  if (action.payload && action.payload.data && action.payload.data.user_authenticated && action.payload.data.data.page_data.current_step === 'borrowing_details') {
    store.dispatch(push('/lending/servicing/'));
  }
  if (action.payload && action.payload.data && action.payload.data.next_action === 'landing_view') {
    store.dispatch(finishWaitingRoom());
    store.dispatch(push('/errorpage/'));
    return next(action);
  }
  if (((((((action || {}).error || {}).response || {}).data || {}).errors || {}).system_errors || {}).message === 'Sorry, that\'s not worked, so you’ll need to apply again.') {
    store.dispatch(push('/errorpage/'));
    store.dispatch(appWarningsErrors('Sorry, that\'s not worked, so you’ll need to apply again.', Number(increment++), false));
    return next(action);
  }
  if (((((((action || {}).error || {}).response || {}).data || {}).data || {}).page_data || {}).message === 'User was EBAV Declined') {
    store.dispatch(finishWaitingRoom());
    store.dispatch(push('/errorpage/'));
    return next(action);
  }
  if (((((((action || {}).error || {}).response || {}).data || {}).errors || {}).system_errors || {}).message === 'IDV Assessment Error') {
    store.dispatch(finishWaitingRoom());
    store.dispatch(push('/errorpage/'));
    return next(action);
  }
  // TODO: always false > remove last part
  if (action.payload && action.payload.error && action.payload.error.response.next_action === 'error_page' && !action.payload.data.next_action) {
    store.dispatch(finishWaitingRoom());
    store.dispatch(push('/errorpage/'));
    return next(action);
  }

  if (action.payload && action.payload.data && action.payload.data.next_action === 'error_page') {
    store.dispatch(finishWaitingRoom());
    store.dispatch(push('/errorpage/'));
    return next(action);
  }
  if (action.payload && action.payload.data && action.payload.data.errors && action.payload.data.errors.system_errors && !action.payload.data.next_action) {
    store.dispatch(finishWaitingRoom());
    store.dispatch(push('/errorpage/'));
    return next(action);
  }

  switch (action.type) {
    case LOAD_STEP_DATA_PUBLIC:
    case SUBMIT_STEP_DATA_CSRF:
    case WAITING_ROOM_LOAD_DATA:
    case CONTINUE_JOURNEY:
      store.dispatch(startWaitingRoom());

      return next(action);

    case LOAD_STEP_DATA_PUBLIC + FAIL:
    case SUBMIT_STEP_DATA_CSRF + FAIL:
    case WAITING_ROOM_LOAD_DATA + FAIL:
    case CONTINUE_JOURNEY + FAIL:
      if (((((((action || {}).error || {}).response || {}).data || {}).errors || {}).system_errors || {}).message === 'failed_ticket') {
        store.dispatch(finishWaitingRoom());
        store.dispatch(push('/errorpage/'));
        return next(action);
      }
      if (((((((action || {}).error || {}).response || {}).data || {}).errors || {}).system_errors || {}).message === 'EBAV limit exceeded.') {
        store.dispatch(finishWaitingRoom());
        store.dispatch(push('/errorpage/'));
        return next(action);
      }
      if ((((((((((action || {}).error || {}).response || {}).data || {}).errors || {}).form_validation || {}).form_fields || {}).payment_quote || {}).run_option || {})[0] === 'This field is required.') {
        store.dispatch(appWarningsErrors('Please, select from the two options below', Number(increment++), true));
      }

      if (((((((action || {}).error || {}).response || {}).data || {}).errors || {}).system_errors || {}).message === 'We can’t approve your loan because it is your second loan.') {
        store.dispatch(finishWaitingRoom());
        store.dispatch(appWarningsErrors('We can’t approve your loan because it is your second loan.', Number(increment++), false));
        store.dispatch(push('/errorpage/'));
        return next(action);
      }
      if (((((((action || {}).error || {}).response || {}).data || {}).errors || {}).system_errors || {}).message === 'Something unexpected happened, our team is trying to solve the problem.') {
        store.dispatch(push('/errorpage/'));
        return next(action);
      }

      if (action.type === 'SUBMIT_STEP_DATA_CSRF_FAIL') {
        //store.dispatch(appWarningsErrors(null, Number(increment++), false));
      }

      store.dispatch(finishWaitingRoom());
      return next(action);

    // Waiting room (either returns itself or return continue_journey)
    case WAITING_ROOM_LOAD_DATA + SUCCESS:
      if (action.payload && action.payload.data) {
        const nextAction = action.payload.data.next_action;
        // If it needs to go back into waiting room
        if (WAITING_ROOM_STEPS.includes(nextAction)) {
          setTimeout(() => {
            store.dispatch(loadWaitingRoom());
          }, 1000);
        }

        // Otherwise go to continue journey
        if (CONTINUE_JOURNEY_STEPS.includes(nextAction)) {
          store.dispatch(continueJourney());
        }
      }
      return next(action);

    // Continue Journey (returns waiting_room or next page to push to)
    case CONTINUE_JOURNEY + SUCCESS:
      if (action.payload && action.payload.data) {
        const nextAction = action.payload.data.next_action;
        // If it needs to go back into waiting room
        // Catch servicing journeys ends
        if (LENDING_SERVICING_JOURNEY_ENDS.includes(nextAction)) {
          store.dispatch(loadStepDataPublic('/lending/account'));
          return next(action);
        }
        if (SAVINGS_SERVICING_JOURNEY_ENDS.includes(nextAction)) {
          store.dispatch(finishWaitingRoom());
          store.dispatch(loadStepDataPublic('/savings/account'));
          return next(action);
        }
        // This is a temporal hack waiting for Clement to fix the call to the correct endpoint
        if (((action.payload.data.data || {}).page_data || {}).current_step === 'ub_update_person_bank_account') {
          store.dispatch(loadStepDataPublic('/lending/account'));
          return next(action);
        }
        if (nextAction === 'address_update_start') {
          store.dispatch(startAddressUpdate('/lending'));
          return next(action);
        }
        if (nextAction === 'savings_address_update_start') {
          store.dispatch(startAddressUpdate('/savings'));
          return next(action);
        }
        if (WAITING_ROOM_STEPS.includes(nextAction)) {
          store.dispatch(loadWaitingRoom());
          return next(action);
        }
        // Otherwise push page to correct step
        if (nextAction !== 'savings_signup' && localStorage.getItem('emailVerified') !== 'Email was verified') {
          store.dispatch(push(appUrlMapper(nextAction)));
        } else {
          localStorage.setItem('emailVerified', '');
        }
        // Verify email is special case since it has no equivalent on backend
        if (nextAction === 'verify_email') {
          store.dispatch(finishWaitingRoom());
        }
        // If steps need data to be laoded separately from the components // lending_update_person_if_logged_in
        if (LOAD_API_FOR_STEPS_WHITELIST.includes(nextAction)) {
          if (action.payload.data.data.page_data.failed_verification === undefined) {
            store.dispatch(loadStepDataPublic(apiUrlMapper(nextAction)));
          }
        } else if (appUrlMapper(action.payload.data.next_action).length) {
          if (action.payload.data.data.page_data.failed_verification === undefined) {
            store.dispatch(push(appUrlMapper(action.payload.data.next_action)));
          }
        } else if (action.payload.data.next_action) {
          store.dispatch(continueJourney());
        }
      }
      return next(action);

    // Loading data from journey steps
    case APPLICATION_BOOTED + SUCCESS:
    case LOAD_STEP_DATA_PUBLIC + SUCCESS:
    case SUBMIT_STEP_DATA_CSRF + SUCCESS:
    case RESET_SESSION + SUCCESS:
    case 'SUBMIT_ACCESS_TOKEN_LOGIN_SUCCESS':
      if (action.payload && action.payload.data) {
        const nextAction = action.payload.data.next_action;
        if (action.type === 'SUBMIT_STEP_DATA_CSRF_SUCCESS') {
          if ((((((action || {}).payload || {}).data || {}).data || {}).page_data || {}).message === 'Successfully updated your person details.') {
            store.dispatch(appWarningsErrors('Successfully updated your person details.', increment++, true));
          }
          if ((((((action || {}).payload || {}).data || {}).data || {}).page_data || {}).message === 'Successfully updated your communication preferences.') {
            store.dispatch(appWarningsErrors('Successfully updated your communication preferences.', Number(increment++), true));
          }
          if ((((((action || {}).payload || {}).data || {}).data || {}).page_data || {}).message === 'No changes detected') {
            store.dispatch(appWarningsErrors('No changes detected', Number(increment++), true));
          }
          if ((((((action || {}).payload || {}).data || {}).data || {}).page_data || {}).message === 'A system error has occured, please contact an administrator') {
            store.dispatch(appWarningsErrors('A system error has occured, please contact an administrator', Number(increment++), true));
          }
          if ((((((action || {}).payload || {}).data || {}).data || {}).page_data || {}).message === 'A system error has occurred.') {
            store.dispatch(appWarningsErrors('A system error has occurred.', Number(increment++), true));
          }
        }
        // Catch partial match verification
        if (nextAction === 'user_security_questions') {
          store.dispatch(finishWaitingRoom());
          store.dispatch(push(appUrlMapper('user_security_questions')));
          return next(action);
        }
        // Catch servicing journeys ends
        if (SAVINGS_SERVICING_JOURNEY_ENDS.includes(nextAction)) {
          store.dispatch(finishWaitingRoom());
          store.dispatch(loadStepDataPublic('/savings/account'));
          return next(action);
        }
        if (LENDING_SERVICING_JOURNEY_ENDS.includes(nextAction)) {
          store.dispatch(loadStepDataPublic('/lending/account'));
          return next(action);
        }
        // This is a temporal hack waiting for Clement to fix the call to the correct endpoint
        if (action.payload.data.data.page_data.current_step === 'ub_update_person_bank_account') {
          store.dispatch(loadStepDataPublic('/lending/account'));
          return next(action);
        }
        // Catch redirects to servicing screens
        if (SERVICING_OVERVIEW_SCREENS.includes(nextAction)) {
          store.dispatch(push(appUrlMapper(nextAction)));
          return next(action);
        }
        // Catch servicing journeys starts
        if (nextAction === 'bank_account_update_start') {
          store.dispatch(startBankAccountUpdate('/lending'));
          return next(action);
        }
        if (nextAction === 'savings_bank_account_update_start') {
          store.dispatch(startBankAccountUpdate('/savings'));
          return next(action);
        }
        if (nextAction === 'savings_bank_account_update_wid_start') {
          store.dispatch(startBankAccountUpdateWID('/savings'));
          return next(action);
        }
        if (nextAction === 'address_update_start') {
          store.dispatch(startAddressUpdate('/lending'));
          return next(action);
        }
        if (nextAction === 'savings_address_update_start') {
          store.dispatch(startAddressUpdate('/savings'));
          return next(action);
        }


        // continue journey and waiting room redirect
        if (CONTINUE_JOURNEY_STEPS.includes(nextAction)) {
          store.dispatch(continueJourney());
          return next(action);
        }
        if (WAITING_ROOM_STEPS.includes(nextAction)) {
          setTimeout(() => {
            store.dispatch(loadWaitingRoom());
          }, 1000);
          return next(action);
        }

        // Generic redirects
        store.dispatch(finishWaitingRoom());
        if (appUrlMapper(nextAction).length) {
          store.dispatch(push(appUrlMapper(nextAction)));
        } else if (nextAction) {
          store.dispatch(continueJourney());
        }
      }
      return next(action);

    // Successful email verification
    case VERIFY_EMAIL + SUCCESS:
      store.dispatch(continueJourney());
      return next(action);

    // Registartion/Login cases
    case SUBMIT_ACCESS_TOKEN + SUCCESS:
    case SUBMIT_ACCESS_TOKEN + FAIL:
      if (action.payload && action.payload.data) {
        const nextAction = action.payload.data.next_action;
        // If requires partial match verification
        if (nextAction === 'user_security_questions') {
          store.dispatch(push(appUrlMapper('user_security_questions')));
          return next(action);
        }

        // if continue journey
        // TODO: remove cust_landing when BE returns correct values
        if (CONTINUE_JOURNEY_STEPS.includes(nextAction) || nextAction === 'cust_landing') {
          store.dispatch(continueJourney());
          return next(action);
        }

        if (appUrlMapper(nextAction).length) {
          store.dispatch(push(appUrlMapper(nextAction)));
        }
      }
      return next(action);
    // Load resources endpoint for deposit maturity re-invest or withdraw funds
    case LOAD_RESOURCE_ENDPOINT + SUCCESS:
      if (action.payload.data.person_id !== undefined) {
        store.dispatch(loadResourceEndpoint(`/v1/people/${ action.payload.data.person_id }/person_bank_accounts/?host_organisation_name=smartsave`));
      }
      return next(action);

    // No match no action
    default:
      return next(action);
  }
};
