import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AuthWrapper from 'js/Screens/Authentication';
import * as actions from 'js/Store/Actions/generic';
import * as actionsApp from 'js/Store/Actions/application';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import Opacity from 'js/Components/Animations/Opacity';
import Toast from 'js/Components/Toasts';
import Spinner from 'js/Components/Spinner';
import './VerifyEmail.scss';

const VerifyEmail = () => {
  const { verifyEmail, loadingLoanData, confirmEmailError, errorNumber, isError, inWaitingRoom } = useSelector(state => ({
    inWaitingRoom: state.application.inWaitingRoom,
    verifyEmail: state.stepData.initialData,
    loadingLoanData: state.stepData.loadingStepData,
    confirmEmailError: (((state.stepData || {}).warning || {}).payload || {}).msg,
    toastError: state.stepData.toastError,
    errorNumber: (((state.stepData || {}).warning || {}).payload || {}).errcode,
    isError: (((state.stepData || {}).warning || {}).payload || {}).iserror,
  }));

  const { continueJourney, actionVerification } = useActions(actions);
  const { requestVerificationEmail } = useActions(actionsApp);

  useEffect(() => {
  }, [confirmEmailError]);

  const verifiedEmail = () => {
    actionVerification('Email was verified');
    continueJourney();
  };

  if (loadingLoanData && inWaitingRoom && !verifyEmail) return <Spinner />;
  return (
    <Opacity speed={ 300 }>
      <div className='container'>
        <div className='row'>
          <div className='col mb-4'>
            { isError ? (
              <Toast
                message={ confirmEmailError }
                errorCode={ errorNumber }
                toastError={ isError }
              />
            ) : null }
            <h1>We have sent you an email with a link</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col'>You will need to verify this before you can continue, by clicking on the link in your email.</div>
        </div>
        <div className='row mb-5'>
          <div className='col'>We&apos;ll send your loan documents, and other information realting to your account, to the email address you have used.</div>
        </div>
        <div className='row mb-5'>
          <div className='col'>
            <button className='btn btn-primary' type='submit' onClick={ () => verifiedEmail() } data-cy='action-have-verified-email'>I have verified my email</button>
          </div>
        </div>
        <div className='row mb-3'>
          <div className='col'>
            <h2>Email not arrived?</h2>
          </div>
        </div>
        <div className='row mb-4'>
          <div className='col'>If your email hasn&quot;t arrived within 1 minute, you can request another email.</div>
        </div>
        <div className='row mb-4'>
          <div className='col'>
            <button className='btn btn-primary' onClick={ () => requestVerificationEmail() } type='submit' data-cy='action-send-another-link'>Send me another email</button>
          </div>
        </div>
        <div className='row'>
          <div className='col'>I&apos;m an existing customer: <AuthWrapper login textOnly /></div>
        </div>
      </div>
    </Opacity>
  );
};

export default VerifyEmail;
