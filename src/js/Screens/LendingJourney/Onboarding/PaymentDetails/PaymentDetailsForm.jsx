import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import SelectField from 'js/Components/Forms/SelectField';
import CheckBoxField from 'js/Components/Forms/CheckBoxField';
import TextField from 'js/Components/Forms/TextField';
import { useSelector } from 'react-redux';
import Spinner from 'js/Components/Spinner';
import { alphaNumeric, required, number, exactLength8, exactLength6 } from 'js/Validation';
import DDIcon from '../../../../assets/images/directdebit.png';

/*
  Collect Payment details form
  Information required from GET:
    data.form_data.options.repayment_date
  Information submitted via POST:
    name_on_account
    account_number
    sort_code
    repayment_date
    confirm_account_holder
    consent_for_hard_credit_search
*/
const PaymentDetailsForm = (props) => {
  const { options, submitting, handleSubmit, pageData, invalid } = props;
  const { inWaitingRoom } = useSelector(state => {
    return ({ inWaitingRoom: state.application.inWaitingRoom });
  });
  // "loan_and_payment"
  if (inWaitingRoom) return <Spinner />;

  return (
    <div className='container'>
      <div className='row'>
        <div className='col mb-5'>
          <h1>Your bank account details</h1>
        </div>
      </div>
      <div className='row mb-3'>
        <div className='col'>Which account would you like us to pay the money into?</div>
      </div>
      <div className='row mb-3'>
        <div className='col'>Add your bank or building society account details and we will transfer your loan directly.<br />We will also take your monthly repayments from this current account.</div>
      </div>
      <div className='row mb-4'>
        <div className='col'>The account must be in your name, be registered to your address and accept Faster Payments.<br />Please write your name as it appears on your bank card.</div>
      </div>
      <div className='row'>
        <div className='col'>
          <form className='container' onSubmit={ handleSubmit }>
            <div className='row mb-4'>
              <div className='col-5 p-0'>
                <Field
                  name='name_on_account'
                  dataCy='input-name-on-account'
                  label='Account holder name*'
                  component={ TextField }
                  type='text'
                  validate={ [required, alphaNumeric] }
                />
              </div>
              <div className='col-7' />
            </div>
            <div className='row mb-4'>
              <div className='col-5 p-0'>
                <Field
                  dataCy='input-account-number'
                  name='account_number'
                  label='Account number*'
                  component={ TextField }
                  type='text'
                  validate={ [required, number, exactLength8] }
                />
              </div>
              <div className='col-5 pl-4'>
                <Field
                  dataCy='input-sort-code'
                  name='sort_code'
                  label='Sort code*'
                  component={ TextField }
                  type='text'
                  validate={ [required, number, exactLength6] }
                />
              </div>
              <div className='col-2' />
            </div>
            <div className='row'>
              <div className='col-5 p-0'>
                <Field
                  dataCy='input-repayment-date'
                  name='repayment_date'
                  label='Repayment date*'
                  component={ SelectField }
                  options={ (options.repayment_date || []).filter(option => option.id).map(option => ({ id: option.id, value: option.label })) }
                  validate={ [required] }
                />
              </div>
              <div className='col-7' />
            </div>
            <div className='row mb-5'>
              <div className='col p-0'>Most of our customers choose a date that is a few days after payday.</div>
            </div>
            <div className='row mb-2'>
              <div className='col p-0'><strong>Direct debit: £ { pageData.loan_monthly_payments } a month.</strong></div>
            </div>
            <div className='row mb-4'>
              <div className='col p-0'>If you select a repayment date in the next 10 days, your first payment will be taken next month.</div>
            </div>
            <div className='row'>
              <div className='col p-0'>
                <Field
                  dataCy='input-confirm-account-holder'
                  name='confirm_account_holder'
                  label='I confirm that I am the account holder and I am the only person requiered to authorise debits on this account.'
                  component={ CheckBoxField }
                  validate={ [required] }
                  id='i1'
                />
              </div>
            </div>
            <div className='row mb-5'>
              <div className='col p-0'>
                <Field
                  dataCy='input-consent-hard-credit-search'
                  name='consent_for_hard_credit_search'
                  label='I consent to a full search and understand that my details will be shared with the Credit Reference Agencies.'
                  component={ CheckBoxField }
                  validate={ [required] }
                  id='i2'
                />
              </div>
            </div>
            <div className='row' style={{ justifyContent: 'flex-start' }}>
              <div className='col-6 p-0'>
                <img src={ DDIcon } alt='direct debit logo' />
              </div>
              <div className='col-3 p-0 text-right'>
                <button
                  data-cy='action-confirm-payment-details'
                  className='btn btn-primary'
                  type='submit'
                  onClick={ handleSubmit }
                  disabled={ submitting }
                >
                  Confirm details
                </button>
                <div className='row'>
                  <div className='col text-right'><label htmlFor='submit-warning' className='warning'>{ invalid ? 'form incomplete, check above.' : ''}</label></div>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

PaymentDetailsForm.propTypes = {
  options: PropTypes.object,
  pageData: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default PaymentDetailsForm;
