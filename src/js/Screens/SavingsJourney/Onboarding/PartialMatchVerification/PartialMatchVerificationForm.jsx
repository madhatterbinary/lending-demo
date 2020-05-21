import React, { Fragment } from 'react';
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
      <form className='user-security-questions-form form-container' onSubmit={ handleSubmit }>
        { questions && questions.length
          && questions.map((item, index) => {
            return (
              <Fragment key={ item.security_topic_name }>
                <span>{labelMapper(item.security_topic_name)}</span>
                <Field
                  name={ `security_questions[${ index }]security_topic_answer` }
                  type='text'
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
                <br />
              </Fragment>
            );
          })
        }
        <button
          data-cy='action-complete-verification'
          className='btn btn-primary'
          type='submit'
          style={{ width: 260, margin: 40 }}
          disabled={ invalid || submitting }
        >
          Complete verification
        </button>
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
