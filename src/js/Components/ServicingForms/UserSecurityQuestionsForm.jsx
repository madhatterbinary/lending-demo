import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import TextField from 'js/Components/Forms/TextField';
import Opacity from 'js/Components/Animations/Opacity';
import TimelineNavigation from 'js/Components/TimelineNavigation';
import { savingsJourneyDefinition } from 'js/Definitions/savingsJourneyDefinition';
import { lendingJourneyDefinition } from 'js/Definitions/lendingJourneyDefinition';
import { required, minLength2 } from 'js/Validation';
import Spinner from 'js/Components/Spinner';

const labelMapper = (label) => {
  const labels = {
    'security_street': () => 'What is the street you grew on?',
    'security_company': () => 'What was your first company you worked for?',
    'security_school': () => 'What is the name of the first school you attended?',
    'default': () => (''),
  };
  return (labels[label] || labels.default)();
};

const UserSecurityQuestionsForm = props => {
  const { handleSubmit, submitting, invalid, questions } = props;

  if (submitting) return <Spinner />;

  return (
    <Opacity speed={ 300 }>
      <TimelineNavigation
        timelineItems={ localStorage.getItem('journeyType') === 'savings' ? savingsJourneyDefinition.onboarding.details : lendingJourneyDefinition.onboarding.details }
        localmatch={ localStorage.getItem('journeyType') === 'savings' ? '/savings/servicing/securityquestions' : '/lending/servicing/securityquestions' }
      />
      <form className='user-security-questions-form form-container' onSubmit={ handleSubmit }>
        <div className='container'>
          <div className='row'>
            <div
              className='col mt-5'
              ref={ (el) => {
                if (el) {
                  el.style.setProperty('margin-top', '0rem', 'important');
                }
              } }
            >
              <h1>Set up your security</h1>
            </div>
          </div>
          <div className='row mt-5'>
            <div className='col'>We need to answer the three questions below, so that we&apos;ll always know it&apos;s really you.</div>
          </div>
          <div className='row mt-4'>
            <div className='col p-0'>
              <div className='container'>
                { questions && questions.length
                && questions.map((item, index) => {
                  return (
                    <div className='row' key={ item.security_topic_name }>
                      <div className='col-6'>
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
                      <div className='col-6' />
                    </div>
                  );
                })
              }
                <div className='row'>
                  <div className='col text-right'>
                    <button
                      className='btn btn-primary'
                      type='submit'
                      data-cy='action-complete-verification'
                      disabled={ submitting }
                    >
                      Save security questions
                    </button>
                  </div>
                </div>
                <div className='row'>
                  <div className='col text-right mt-3'>
                    <label htmlFor='submit-warning' className='warning'>{ invalid ? 'form incomplete, check above.' : ''}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Opacity>
  );
};

UserSecurityQuestionsForm.propTypes = {
  questions: PropTypes.array,
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

UserSecurityQuestionsForm.defaultProps = {
  questions: [],
};


export default UserSecurityQuestionsForm;
