import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as actions from 'js/Store/Actions/application';
import * as actionsGeneric from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import Opacity from 'js/Components/Animations/Opacity';
import IDVAssessmentError from './IDVAssessmentError.jsx';
import './ErrorPage.scss';


const ERROR_PAGE_CODE_CONTINUE_JOURNEY = [2, 8, 17, 18, 20, 24, 28, 37];
const ERROR_PAGE_CODE_RESET_SESSION = [999994, 2264, 4, 42, 19, 99999, 34];
const ERROR_PAGE_DECLINE_LOAN = ['IDV Assessment Error', 'EBAV limit exceeded', 'Credit Check Failure due to reason Age', 'AML or FraudScan Failure due to reason bureau_decision'];
const SMALL_MESSAGE_WARNING = ['User was EBAV Declined', 'SIRA referral due to reason bureau_decision', 'AML or FraudScan Failure due to reason bureau_decision'];
const RESET_SESSION_BUTTON = ['failed_ticket', 'EBAV limit exceeded.', 'SIRA referral due to reason bureau_decision', 'IDV Assessment Error', 'Credit Check Failure due to reason Age', 'AML or FraudScan Failure due to reason bureau_decision', 'We can\'t seem to match you to an existing user.'];
//const chatUrl = 'https://livelend.secure.force.com/default/apex/Pre_Chat_Testing_Page?endpoint=https%3A%2F%2F2t17.la1-c1-fra.salesforceliveagent.com%2Fcontent%2Fs%2Fchat%3Flangu'
//  + 'age%3Den_US%23deployment_id%3D5720Y0000008Pzn%26org_id%3D00D0Y000000qO7A%26button_id%3D5730Y0000008QCf%26session_id%3D62c55525-df1f-4521-91e5-7950eb4d5997';

const INFO_AND_WARNINGS = [
  'We can\'t seem to match you to an existing user.',
  'It appears you have requested another new verification email less than a minute ago. Please wait until a minute has passed.',
  'Unable to verify that you are logged in. Please login again.',
  'We can’t approve your loan because it is your second loan.',
  'Sorry, that\'s not worked, so you’ll need to apply again.',
  'Something unexpected happened, our team is trying to solve the problem.',
  'EBAV limit exceeded',
  'failed_ticket',
];

const ErrorPage = () => {
  const { errors, EBAVDeclined, IDVError, generalError, generalWarning, error } = useSelector(state => {
    return {
      errors: state.stepData.errors,
      EBAVDeclined: state.stepData,
      IDVError: state.stepData,
      generalError: state.stepData,
      generalWarning: state.stepData,
      error: state,
    };
  });

  const { resetSession } = useActions(actions);
  const { continueJourney } = useActions(actionsGeneric);

  const [message, setMessage] = useState('');
  const [errorCode, setErrorCode] = useState(0);
  const [smallWarning, setSmallWarning] = useState('');

  useEffect(() => {
    if ((((IDVError || {}).warning || {}).payload || {}).msg) {
      setMessage(IDVError.warning.payload.msg);
      setErrorCode(IDVError.warning.payload.errcode);
    }
    if (((((((EBAVDeclined || {}).error || {}).response || {}).data || {}).data || {}).page_data || {}).message) {
      setMessage(EBAVDeclined.error.response.data.data.page_data.message);
    }
    if (((((((generalError || {}).error || {}).response || {}).data || {}).errors || {}).system_errors || {}).message) {
      setMessage(generalError.error.response.data.errors.system_errors.message);
      setErrorCode(generalError.error.response.data.errors.system_errors.error_code);
    }
    if ((((generalWarning || {}).warning || {}).payload || {}).msg) {
      setMessage(generalWarning.warning.payload.msg);
    }
    if ((errors || {}).system_errors !== undefined) {
      if ((errors.system_errors || {}).message !== undefined) {
        if (errors.system_errors.message.toString()) {
          setMessage(errors.system_errors.message);
          setErrorCode(errors.system_errors.error_code);
        } else {
          setMessage(errors.system_errors.message[0].db_error_message);
          setErrorCode(errors.system_errors.message[0].error_log_id);
        }
      }
    }
    if ((((((((error || {}).stepData || {}).error || {}).response || {}).data || {}).data || {}).page_data || {}).message) {
      setMessage(error.stepData.error.response.data.data.page_data.message);
    }
    if (SMALL_MESSAGE_WARNING.includes(message)) {
      setSmallWarning('general-error-screen-content small-warning');
    } else {
      setSmallWarning('general-error-screen-content');
    }
  }, [message, errors, generalError, generalWarning, EBAVDeclined]);

  const errorHandler = () => {
    if (ERROR_PAGE_CODE_CONTINUE_JOURNEY.includes(errorCode) || message === 'User was EBAV Declined') {
      continueJourney();
    } else if (ERROR_PAGE_CODE_RESET_SESSION.includes(errorCode) || ERROR_PAGE_DECLINE_LOAN.includes(message)) {
      resetSession();
    } else {
      resetSession();
    }
  };

  return (
    <Opacity speed={ 300 }>
      <div className='general-error-screen' data-cy='info-error-message'>
        <div className={ smallWarning }>
          <div className='error-header'>
            <h1 className='error' style={{ marginBottom: 5 }}>We&apos;re sorry. We can&apos;t approve your loan.</h1>
          </div>
          <Fragment>
            { INFO_AND_WARNINGS.includes(message) ? (
              <Fragment>
                <p>{ message }</p>
              </Fragment>
            ) : null
            }
            { message === 'User was EBAV Declined' ? (
              <Fragment>
                <h3 className='title'>We couldn&apos;t match your bank account details.</h3>
                <p>You have a total of three attempts, after which we&apos;ll have to decline your application.</p>
                <p>Check our advice here, before you continue.</p>
              </Fragment>
            ) : null
            }
            { message === 'EBAV limit exceeded.' ? (
              <Fragment>
                <h3 className='title'>What informs this decision</h3>
                <p>We understand that our decision may be a disappointment, so let us explain how we’ve reached it.</p>
                <h3 className='title'>Our decision</h3>
                <p>As a responsible lender, we always review all the information available to us. That way, we can make a fair decision.</p>
                <p>The information we use is what you told us in your application,
                  information we might already know about you and information provided by Credit Reference Agencies.When reviewing your information,
                  we promise to only use soft searches, so there’s no impact on your credit rating.</p>
                <h3 className='title'>We consider several factors including:</h3>
                <ul>
                  <li>Your employment status. For example, if you are unemployed or you have only been in your job for a short time.</li>
                  <li>Your residential status. For example, you have lived at your address for only a short time.</li>
                  <li>Your payment history for other loans or credit card repayments.</li>
                  <li>Your current level of borrowing and existing commitments.</li>
                  <li>Any information we already hold about you.</li>
                </ul>
              </Fragment>
            ) : null
            }

            { message === 'SIRA referral due to reason bureau_decision' ? (
              <Fragment>
                <h3 className='title'> It looks like we need a bit more information before we proceed with your application.</h3>
                {/* <p>
                  <span>Not to worry, we will call you as quickly as possible to the number you provided us. If you prefer to contact us, you can use our</span>
                  <span><a target='_blank' rel='noopener noreferrer' data-cy='action-start-chat' href={ chatUrl }> messaging system.</a></span>
                </p> */}
              </Fragment>
            ) : null
            }
            { ERROR_PAGE_DECLINE_LOAN.includes(message) ? (
              <Fragment>
                <IDVAssessmentError />
              </Fragment>
            ) : null
            }
            <h3 className='title' hidden>Error code: { errorCode }</h3>
          </Fragment>
          <button
            className='btn btn-primary'
            type='submit'
            onClick={ errorHandler }
            data-cy='action-error-go-back'
            style={{ width: 200, marginBottom: 30, marginTop: 30, position: 'relative', alignSelf: 'flex-end', marginRight: 60 }}
          >
            { ERROR_PAGE_CODE_RESET_SESSION.includes(errorCode) || RESET_SESSION_BUTTON.includes(message) ? 'Reset session' : 'Go back' }
          </button>
        </div>
      </div>
    </Opacity>
  );
};

export default ErrorPage;
