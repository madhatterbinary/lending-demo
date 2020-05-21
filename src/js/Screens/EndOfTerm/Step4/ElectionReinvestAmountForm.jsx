/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ElectionReinvestAmount.scss';
import { Field, change } from 'redux-form';
import TextField from 'js/Components/Forms/TextField';
import Spinner from 'js/Components/Spinner';
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
// const renderField = ({ input, type, checked }) => (
//   <div>
//     <input { ...input } type={ type } checked={ checked } />
//   </div>
// );
const ElectionReinvestAmountForm = props => {
  const { submitting, handleSubmit, pageData, dispatch } = props;
  const [radioBtnSelected, setRadioBtnSelected] = useState('UKOnly');
  const { original_account } = ((pageData || {}).election_decision_options || {});
  const [balanceAtMaturity, setBalanceAtMaturity] = useState(null);

  useEffect(() => {
    if (balanceAtMaturity) {
      dispatch(change('form-screen', 'amount_to_reinvest', balanceAtMaturity));
    }
  }, [balanceAtMaturity]);

  if (!pageData.election_decision_options) {
    return (
      <Spinner />
    );
  }

  const onChange = (e) => {
    setRadioBtnSelected(e.currentTarget.value);
    if (e.currentTarget.value === 'UKOnly') {
      dispatch(change('form-screen', 'amount_to_reinvest', balanceAtMaturity));
    }
  };
  if (balanceAtMaturity === null) {
    setBalanceAtMaturity((original_account || {}).projected_balance_at_maturity);
  }

  return (
    <form className='reinvest-form' onSubmit={ handleSubmit } style={{ maxWidth: 794, display: 'flex', flexDirection: 'column' }}>
      <div>Please choose how much you want to reinvest. Once your new savings is open, you’ll have a
        14 days deposit window to top up your savings balance if you want to. Your savings balance
        must be between £10,000 and £85,000 at the end of your deposit window.</div>
      <h1 style={{ marginBottom: 30, marginTop: 20 }}>Please choose from one of the following options</h1>
      <div
        className='container red-box d-flex flex-column'
        style={{
          alignSelf: 'center',
          marginBottom: 20,
          maxWidth: 990,
          display: 'flex',
          flexDirection: 'row',
          paddingBottom: 20,
          paddingTop: 20 }}
        ref={ (el) => {
          if (el) {
            el.style.setProperty('flex-direction', 'row', 'important');
          }
        } }
      >
        <Field
          name='tax_residency_check'
          data-cy='input-tax-residency-check-yes'
          component='input'
          onChange={ (e) => onChange(e) }
          type='radio'
          value='UKOnly'
        />{' '} <div style={{ marginLeft: 15, marginRight: 0, lineHeight: 1, marginBottom: 0 }}>I want to reinvest my total savings balance of £{ balanceAtMaturity} (including interest)</div>
      </div>
      <div className='container red-box d-flex flex-column'>
        <div
          style={{
            marginBottom: 20,
            maxWidth: 990,
            display: 'flex',
            flexDirection: 'row',
            paddingTop: 20 }}
          ref={ (el) => {
            if (el) {
              el.style.setProperty('flex-direction', 'row', 'important');
            }
          } }
        >
          <Field
            name='tax_residency_check'
            data-cy='input-tax-residency-check-no'
            component='input'
            onChange={ (e) => onChange(e) }
            type='radio'
            value='Multiple'
          />{' '} <div style={{ marginLeft: 15, marginRight: 0, lineHeight: 1, marginBottom: 0 }}>I want to reinvest some of my savings balance</div>
        </div>
        <p style={{ marginLeft: 28 }}>Tell us the amount you’d like to reinvest. The remaining balance plus interest will be sent
          Back to your bank account one day after your fixed term ends.</p>
        <div className={ radioBtnSelected === 'Multiple' ? 'reinvest-input show' : 'reinvest-input' } style={{ marginLeft: 28 }}>
          <p style={{ width: 400 }}><strong>I want to reinvest the following amount...</strong></p>
          <div style={{ display: 'flex' }}>
            <div style={{ fontSize: '1.3rem', marginTop: 9, marginRIght: 5 }}>£</div>
            <Field
              name='amount_to_reinvest'
              label='Amount to reinvest'
              type='number'
              component={ TextField }
            />
          </div>
        </div>
      </div>
      <button className='btn btn-primary' style={{ marginBottom: 20, marginTop: 70, width: 150, alignSelf: 'flex-end' }} type='submit' disabled={ submitting } data-cy='action-get-rate'>
        Continue
      </button>
    </form>
  );
};

ElectionReinvestAmountForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pageData: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
};

ElectionReinvestAmountForm.defaultProps = {
  options: {},
  dispatch: null,
};

export default ElectionReinvestAmountForm;
