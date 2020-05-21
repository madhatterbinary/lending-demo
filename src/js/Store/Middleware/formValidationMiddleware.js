/* eslint-disable prefer-destructuring */
import { FAIL } from 'js/Store/Constants/axios';
import { push } from 'connected-react-router';
import { SUBMIT_STEP_DATA_CSRF } from 'js/Store/Constants/generic';
import { finishWaitingRoom } from 'js/Store/Actions/application';
import { appWarningsErrors } from 'js/Store/Actions/generic';
import { SubmissionError } from 'redux-form';
import { formValidatorFormatter } from '../../Utils/formValidatorFormatter';

let increment = 1;
let theerror = '';

export default (store) => next => action => {
  switch (action.type) {
    case SUBMIT_STEP_DATA_CSRF + FAIL:
      theerror = formValidatorFormatter(((((action || {}).error || {}).response || {}).data || {}).errors);
      if (theerror.phone_number === 'Use a valid phone number eg 07123 456 789 or +44 7123 456 789') {
        store.dispatch(appWarningsErrors(theerror.phone_number, increment++, true));
      }
      if (theerror.date_of_birth === 'Applicant must be at least 18 years old') {
        store.dispatch(appWarningsErrors(theerror.date_of_birth, Number(increment++), true));
      }
      if (action.error && action.error.response && ((((action || {}).error || {}).response || {}).data || {}).errors) {
        if (action.error.response.data.errors.form_validation) {
          if (action.error.response.data.errors.form_validation.form_error) {
            if (action.error.response.data.errors.form_validation.form_error.security_questions) {
              if (action.error.response.data.errors.form_validation.form_error.security_questions[0] === 'Duplicate answers are not allowed.') {
                setTimeout(() => {
                  store.dispatch(appWarningsErrors(action.error.response.data.errors.form_validation.form_error.security_questions[0], increment++, true));
                }, 100);
              }
            }
          }
        }
        if (action.error.response.statusText === 'Internal Server Error' || action.error.response.statusText === 'Bad Request') {
          if (action.error.response.data.errors.system_errors) {
            if ((action.error.response.data.errors.system_errors || {}).message === 'We can\'t seem to match you to an existing user.') {
              setTimeout(() => {
                store.dispatch(appWarningsErrors(action.error.response.data.errors.system_errors.message, action.error.response.data.errors.system_errors.error_code, true));
              }, 100);
              store.dispatch(finishWaitingRoom());
              store.dispatch(push('/errorpage/'));
              return new SubmissionError(action.error.response.data.errors);
            }
            if (action.error.response.data.errors.system_errors.message === 'IDV Assessment Error') {
              setTimeout(() => {
                store.dispatch(appWarningsErrors(action.error.response.data.errors.system_errors.message, action.error.response.data.errors.system_errors.error_code));
              }, 100);
            }
          }
        }

        return new SubmissionError(action.error.response.data.errors);
      }
      return next(action);
    default:
      return next(action);
  }
};
