import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import { reduxForm } from 'redux-form';
import Spinner from 'js/Components/Spinner';
import Form from './VerifyIdentityForm.jsx';
import './VerifyIdentity.scss';


const VerifyIdentityFieldsWrapped = reduxForm({
  form: 'form-screen',
  enableReinitialize: true,
})(Form);

const VerifyIdentity = () => {
  const { pageData, initialValues, loadingLoanData } = useSelector(state => ({
    pageData: state.stepData.pageData,
    loadingLoanData: state.stepData.loadingStepData,
    initialValues: {
      question_0: state.stepData.initialData.question_0,
      question_1: state.stepData.initialData.question_1,
      question_2: state.stepData.initialData.question_2,
      question_3: state.stepData.initialData.question_3,
      question_4: state.stepData.initialData.question_4,
    },
  }));

  const { loadStepDataPublic, submitStepDataCSRF } = useActions(actions);

  useEffect(() => {
    loadStepDataPublic('/lending/identity/');
  }, [loadStepDataPublic]);

  const questions = (pageData.idv_questions || []).map((item) => {
    return {
      header_text: `${ item.header_text }`,
      question_text: `${ item.question_text }`,
      question_name: `question_${ item.question_id - 1 }`,
      options: item.question_choices,
    };
  });
  if (loadingLoanData) return <Spinner />;

  return (
    <VerifyIdentityFieldsWrapped
      onSubmit={ (values) => submitStepDataCSRF('/lending/identity/', values) }
      questions={ questions }
      initialValues={ initialValues }
    />
  );
};

export default VerifyIdentity;
