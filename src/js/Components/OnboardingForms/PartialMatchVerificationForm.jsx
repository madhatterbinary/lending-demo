import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import TextField from 'js/Components/Forms/TextField';
import Opacity from 'js/Components/Animations/Opacity';
import { required, minLength2 } from 'js/Validation';

const labelMapper = (label) => {
  const labels = {
    'security_street': () => 'What is the street you grew on?',
    'security_company': () => 'What was your first company you worked for?',
    'security_school': () => 'What is the name of the first school you attended?',
    'default': () => (''),
  };
  return (labels[label] || labels.default)();
};

const PartialMatchVerifications = props => {
  const { handleSubmit, submitting, invalid, questions } = props;


  return (
    <Opacity speed={ 300 }>
      <form className='container mt-4' onSubmit={ handleSubmit } data-cy='info-security-questions'>
        { questions && questions.length
          && questions.map((item, index) => {
            return (
              <div className='row' key={ item.security_topic_name }>
                <div className='col p-0 mb-4'>
                  <Field
                    dataCy='input-security-question-answer'
                    name={ `security_questions[${ index }]security_topic_answer` }
                    type='text'
                    label={ labelMapper(item.security_topic_name) }
                    component={ TextField }
                    validate={ [required, minLength2] }
                  />
                  <Field
                    name={ `security_questions[${ index }]security_topic_name` }
                    type='hidden'
                    component={ TextField }
                    value={ item.security_topic_name }
                    validate={ [required] }
                  />
                </div>
                <div className='col' />
              </div>
            );
          })
        }
        <div className='row'>
          <div className='col p-0'>
            <button
              className='btn btn-primary'
              type='submit'
              disabled={ invalid || submitting }
              data-cy='action-complete-verification'
            >
              Save security questions
            </button>
          </div>
        </div>
      </form>
    </Opacity>
  );
};

PartialMatchVerifications.propTypes = {
  questions: PropTypes.array,
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

PartialMatchVerifications.defaultProps = {
  questions: [],
};


export default PartialMatchVerifications;
