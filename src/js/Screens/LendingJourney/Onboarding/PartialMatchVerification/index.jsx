import React, { useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import Toast from 'js/Components/Toasts';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import { reduxForm } from 'redux-form';
import Form from 'js/Components/OnboardingForms/PartialMatchVerificationForm.jsx';
import './PartialMatchVerification.scss';

const PartialMatchVerificationsFieldsWrapped = reduxForm({
  form: 'form-screen',
  enableReinitialize: true,
})(Form);

const PartialMatchVerification = () => {
  const { data, partialMatchError, errorNumber, isError } = useSelector(state => ({
    data: state,
    partialMatchError: (((state.stepData || {}).warning || {}).payload || {}).msg,
    errorNumber: (((state.stepData || {}).warning || {}).payload || {}).errcode,
    isError: (((state.stepData || {}).warning || {}).payload || {}).iserror,
  }));

  const { loadStepDataPublic, submitStepDataCSRF } = useActions(actions);

  useEffect(() => {
    loadStepDataPublic('/user_security_check/');
  }, [partialMatchError]);

  if (!data || !data.stepData) return null;
  const questions = data.stepData.formData.security_questions;
  let initialValues = { security_questions: [] };

  (questions || []).map((question: Object) => {
    initialValues = {
      ...initialValues,
      security_questions: [
        ...initialValues.security_questions,
        { security_topic_name: question.security_topic_name },
      ],
    };
    return null;
  });
  return (
    <Fragment>
      { isError ? (
        <Toast
          message={ partialMatchError }
          errorCode={ errorNumber }
          toastError={ isError }
        />
      ) : null }
      <div className='container'>
        <div className='row'>
          <div className='col mb-5'>
            <h1>We think we know you</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col'> We need you to answer the questions below, so that we&apos;ll always know it&apos;s really you.</div>
        </div>
        <div className='row'>
          <div className='col'>
            <PartialMatchVerificationsFieldsWrapped
              onSubmit={ (values) => submitStepDataCSRF('/user_security_check/', values) }
              questions={ questions }
              initialValues={ initialValues }
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PartialMatchVerification;
