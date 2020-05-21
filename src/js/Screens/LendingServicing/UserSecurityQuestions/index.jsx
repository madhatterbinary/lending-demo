import React, { useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import Toast from 'js/Components/Toasts';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import { reduxForm } from 'redux-form';
import Form from 'js/Components/ServicingForms/UserSecurityQuestionsForm.jsx';

const UserSecurityQuestionsFieldsWrapped = reduxForm({
  form: 'form-screen',
  enableReinitialize: true,
})(Form);

const UserSecurityQuestions = () => {
  const { formData, partialMatchError, errorNumber, isError } = useSelector(state => ({
    formData: state.stepData.formData,
    partialMatchError: (((state.stepData || {}).warning || {}).payload || {}).msg,
    errorNumber: (((state.stepData || {}).warning || {}).payload || {}).errcode,
    isError: (((state.stepData || {}).warning || {}).payload || {}).iserror,
  }));

  const { loadStepDataPublic, submitStepDataCSRF } = useActions(actions);

  useEffect(() => {
    loadStepDataPublic('/security/');
  }, [partialMatchError]);

  const checkIfUserAlreadyApplied = (values) => {
    if (values.security_questions.length === 3) {
      submitStepDataCSRF('/security/', values);
    } else {
      //TODO create screen for duplicated user message
    }
  };
  const questions = formData.security_questions;
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
      <UserSecurityQuestionsFieldsWrapped
        onSubmit={ (values) => checkIfUserAlreadyApplied(values) }
        questions={ questions }
        initialValues={ initialValues }
      />
    </Fragment>
  );
};

export default UserSecurityQuestions;
