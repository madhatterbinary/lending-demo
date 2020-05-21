/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import SelectField from 'js/Components/Forms/SelectField';
import TextField from 'js/Components/Forms/TextField';
import TextBox from 'js/Components/TextBox';
import { required, number, noNegativeNum, maxLength10, noLeadingZeros } from 'js/Validation';
import { generateOptionsList } from 'js/Utils/formUtils';
import { Link } from 'react-router-dom';
import Spinner from 'js/Components/Spinner';
import Opacity from 'js/Components/Animations/Opacity';
import LendingFeatures from 'js/Screens/LendingJourney/LendingFeatures';

/*
  Expenses details form
  Information required from GET:
    data.form_data.options.employment_status: [{id, label}]
    data.form_data.options.user_provided_tax_position: [{id, label}]
    data.form_data.options.user_provided_income_period: [{id, label}]
  Information submitted via POST:
    employment_status
    user_provided_income_amount
    user_provided_tax_position
    user_provided_income_period
    expenditure_monthly_expenditure
    expenditure_monthly_other (not in use, but it can be added to the expenditure_monthly_expenditure before submitting the form)
*/
const ExpensesForm = props => {
  const { options, submitting, invalid, handleSubmit, pageData } = props;

  if (((pageData || {}).completed_pages || {}).length !== 3) return <Spinner />;

  return (
    <Opacity speed={ 300 }>
      <div className='container form-container'>
        <div className='row'>
          <div className='col mb-5'>
            <h1>Income & expenses</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col m-0 p-0'>
            <form className='container' onSubmit={ handleSubmit }>
              <div className='row mb-3'>
                <div className='col-5'>
                  <h2 className='title'>Employment</h2>
                </div>
                <div className='col-7' />
              </div>
              <div className='row mb-3'>
                <div className='col-5'>
                  <Field
                    dataCy='input-employment-status'
                    name='employment_status'
                    label='Employment status*'
                    placeholder='Please select one'
                    type='text'
                    component={ SelectField }
                    options={ generateOptionsList(options.employment_status || []) }
                    validate={ [required] }
                  />
                </div>
                <div className='col-7' />
              </div>
              <div className='row mb-3'>
                <div className='col-5'>
                  <Field
                    dataCy='input-income-amount'
                    name='user_provided_income_amount'
                    label='Income*'
                    placeholder='Income'
                    type='number'
                    component={ TextField }
                    onkeydown='return (event.keyCode!=189);'
                    validate={ [required, number, noNegativeNum, maxLength10, noLeadingZeros] }
                  />
                </div>
                <div className='col-5'>
                  <Field
                    dataCy='input-tax-position'
                    name='user_provided_tax_position'
                    label='Tax position*'
                    placeholder='Please select one'
                    type='text'
                    component={ SelectField }
                    options={ generateOptionsList(options.user_provided_tax_position || []) }
                    validate={ [required] }
                  />
                </div>
                <div className='col-2' />
              </div>
              <div className='row mb-3 mt-3'>
                <div className='col-5'>
                  <h2 className='title'>Your Monthly Expenses</h2>
                </div>
                <div className='col-7' />
              </div>
              <div className='row mb-3'>
                <div className='col-5'>
                  <Field
                    dataCy='input-income-period'
                    name='user_provided_income_period'
                    label='Income period*'
                    placeholder='Please select one'
                    type='text'
                    options={ generateOptionsList(options.user_provided_income_period || []) }
                    component={ SelectField }
                    validate={ [required] }
                  />
                </div>
                <div className='col-5'>
                  <Field
                    dataCy='input-monthly-expenditure'
                    name='total_monthly_expenditure'
                    label='Monthly expenditure'
                    placeholder='Utitlities/Bills'
                    type='number'
                    step={ 50 }
                    onkeydown='return (event.keyCode!=189);'
                    component={ TextField }
                    validate={ [required, noNegativeNum, maxLength10, noLeadingZeros] }
                  />
                </div>
                <div className='col-2' />
              </div>
              <div className='row mb-3'>
                <div className='col-5'>
                  <Field
                    dataCy='input-other-monthly-expenditure'
                    name='expenditure_monthly_other'
                    label='Other expenses'
                    placeholder='Other expenses'
                    type='number'
                    step={ 50 }
                    component={ TextField }
                    validate={ [number, noNegativeNum, maxLength10, noLeadingZeros] }
                  />
                </div>
                <div className='col-7' />
              </div>
              <div className='row mb-4'>
                <div className='col-12'>
                  <div className='expenses-footnote'>
                    <TextBox dataCy='action-see-more' summaryText='We use a soft search so there&apos;s no impact on your credit score'>
                      <div data-cy='info-soft-search'>
                        We only use soft searches, also known as ‘quotation searches’, to work out whether you’re pre-approved
                        for our loans. Soft searches are different from credit
                        application searches, which happen when you actually apply for a product.
                        Too many credit application searches in a short space of time can damage your credit score.
                        A soft search, on the other hand, will let you know whether you’re eligible for the loan before you apply.
                        That means we’re taking the guesswork out of applying for
                        credit and protecting your score.
                      </div>
                    </TextBox>
                  </div>
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col-12 text-right'>
                  <Link to='/lending/onboarding/address'>
                    <button type='button' className='btn btn-outline-primary pr-4 mr-4' disabled={ submitting }><i className='material-icons'>chevron_left</i>Back</button>
                  </Link>
                  <button className='btn btn-primary' type='submit' disabled={ submitting } data-cy='action-get-rate'>Get my rate</button>
                </div>
              </div>
              <div className='row mb-5'>
                <div className='col-12 text-right'>
                  <label htmlFor='submit-warning' className='warning'>{ invalid ? 'form incomplete, check above.' : ''}</label>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <LendingFeatures />
          </div>
        </div>
      </div>
    </Opacity>
  );
};

ExpensesForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  options: PropTypes.object,
  pageData: PropTypes.object,
};

ExpensesForm.defaultProps = {
  options: {},
  pageData: {},
};

export default ExpensesForm;
