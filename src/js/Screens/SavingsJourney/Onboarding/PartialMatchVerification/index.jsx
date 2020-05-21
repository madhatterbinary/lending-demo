import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import { reduxForm } from 'redux-form';
import Form from './PartialMatchVerificationForm.jsx';

import './PartialMatchVerification.scss';

const PartialMatchVerificationsFieldsWrapped = reduxForm({
  form: 'form-screen',
  enableReinitialize: true,
})(Form);

const PartialMatchVerification = () => {
  const { data } = useSelector(state => ({
    data: state,
  }));

  const { loadStepDataPublic, submitStepDataCSRF } = useActions(actions);

  useEffect(() => {
    loadStepDataPublic('/user_security_check/');
  }, [loadStepDataPublic]);

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
    <div className='container user-security-questions-screen'>
      <div className='row'>
        <div className='col mt-5'>
          <h1>We think we know you</h1>
        </div>
      </div>
      <div className='row mt-5'>
        <div className='col'>We need to answer the three questions below, so that we&apos;ll always know it&apos;s really you.</div>
      </div>
      <PartialMatchVerificationsFieldsWrapped
        onSubmit={ (values) => submitStepDataCSRF('/user_security_check/', values) }
        questions={ questions }
        initialValues={ initialValues }
      />
    </div>
  );
};

export default PartialMatchVerification;
