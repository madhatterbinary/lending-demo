import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import SelectedField from 'js/Components/Forms/SelectField';
import { required } from 'js/Validation';
import { generateIDVOptions } from 'js/Utils/formUtils';
import Spinner from 'js/Components/Spinner';
import Opacity from 'js/Components/Animations/Opacity';

/*
  Verify identity step, this is a dynamic form generated based on Equifax IDV questions
  Information required from GET:
    data.page_data.idv_questions: [{question_id, header_text, question_text, question_choices: [{answer_id, answer_value}]}]
  Information submitted via POST:
    question_0
    question_1
    question_2
    question_3
    question_4
    etc. (based on the amount of questions given by Equifax)
*/
// This need to fix the random address setting when stubs are on. test
const VerifyIdentityForm = props => {
  const { handleSubmit, submitting, invalid, questions } = props;
  if (questions.length === 0 && submitting) return <Spinner />;

  return (
    <Opacity speed={ 300 }>
      <div className='container'>
        <div className='row'>
          <div className='col mb-4'>
            <h1
              ref={ (el) => {
                if (el) {
                  el.style.setProperty('margin-bottom', '30px', 'important');
                }
              } }
            >Verify your identity</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col mb-4'>We need to ask you some additional questions that only should be able to answer. This is to confirm that you are who you say you are.</div>
        </div>
        <div className='row'>
          <div className='col mb-4'>If none of the options apply to you then choose &quot;None of the above&quot;</div>
        </div>
        <div className='row'>
          <div className='col'>
            <form className='verify-identity-form form-container' onSubmit={ handleSubmit }>
              {/* map over the questions and generate the dropdowns and text elements */}
              { questions !== undefined && (
                questions.map((item) => {
                  return (
                    <Fragment key={ item.question_name }>
                      <div><strong>{ item.header_text }</strong></div>
                      <div className='mb-4'><strong>{ item.question_text }</strong></div>
                      <Field
                        name={ item.question_name }
                        dataCy='input-idv-question-answer'
                        type='text'
                        component={ SelectedField }
                        hasDefault
                        validate={ [required] }
                        options={ generateIDVOptions(item.options) }
                      />
                      <div style={{ height: 30 }}>&nbsp;</div>
                    </Fragment>
                  );
                })
              )}
              <div className='text-right'>
                <button className='btn btn-primary' type='submit' disabled={ submitting } data-cy='action-complete-verification'>Complete verification</button>
              </div>
              <div className='text-right'>
                <label htmlFor='submit-warning' className='warning'>{ invalid ? 'form incomplete, check above.' : ''}</label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Opacity>
  );
};

VerifyIdentityForm.propTypes = {
  questions: PropTypes.array,
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

VerifyIdentityForm.defaultProps = {
  questions: null,
};


export default VerifyIdentityForm;
