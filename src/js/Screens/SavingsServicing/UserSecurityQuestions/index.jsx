import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import { reduxForm } from 'redux-form';
import Form from 'js/Components/ServicingForms/UserSecurityQuestionsForm.jsx';
import 'js/Components/ServicingForms/UserSecurityQuestionsForm.scss';

const UserSecurityQuestionsFieldsWrapped = reduxForm({
  form: 'form-screen',
  enableReinitialize: true,
})(Form);

const UserSecurityQuestionsForm = () => {
  const { formData } = useSelector(state => ({
    formData: state.stepData.formData,
  }));

  const { loadStepDataPublic, submitStepDataCSRF } = useActions(actions);

  useEffect(() => {
    loadStepDataPublic('/savings/security/');
  }, [loadStepDataPublic]);


  const checkIfUserAlreadyApplied = (values) => {
    if (values.security_questions.length === 3) {
      submitStepDataCSRF('/savings/security/', values);
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
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <UserSecurityQuestionsFieldsWrapped
            onSubmit={ (values) => checkIfUserAlreadyApplied(values) }
            questions={ questions }
            initialValues={ initialValues }
          />
        </div>
      </div>
    </div>
  );
};

export default UserSecurityQuestionsForm;
