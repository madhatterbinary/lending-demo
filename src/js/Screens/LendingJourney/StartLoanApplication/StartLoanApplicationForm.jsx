import React, { PureComponent } from 'react';
import { Field, change } from 'redux-form';
import PropTypes from 'prop-types';
import HorizontalSlider from 'js/Components/HorizontalSlider';
import { required } from 'js/Validation';
import { monthlyPaymentLoanCalculator } from 'js/Utils/stubs';
import { APPLIATION_SAVE_QUOTE } from 'js/Store/Constants/application';

import quickApproveLoan from 'js/assets/svgs/approved_loan_icon.svg';
import noCharges from 'js/assets/svgs/no_extra_charges.svg';
import flexibleLoans from 'js/assets/svgs/flexible_loan.svg';

const representativeAPR = 0.149;

/*
  First step in the loan application, where user will select the amount to borrow and the borrowing period
  Information required from GET:
    data.form_data.validators.loan_amount :{min_value, max_value}
    data.form_data.validators.term_in_months :{min_value, max_value}
  Information submitted via POST:
    loan_amount
    term_in_months
*/
class StartLoanApplicationForm extends PureComponent {
  static propTypes = {
    validators: PropTypes.object,
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    dispatch: PropTypes.func,
  }

  static defaultProps = {
    validators: {},
    initialValues: {},
    dispatch: () => {},
  };

  state = {
    termInMonths: 0,
    borrowAmount: 0,
    validators: {},
    initialValues: {},
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // Used to calculate the initial approximate loan values on the screen
    if (nextProps.initialValues && nextProps.initialValues.term_in_months !== prevState.initialValues.term_in_months) {
      return {
        initialValues: nextProps.initialValues,
        termInMonths: parseInt(nextProps.initialValues.term_in_months, 10),
        borrowAmount: parseInt(nextProps.initialValues.loan_amount, 10),
      };
    }
    if (nextProps.validators && nextProps.validators.term_in_months !== prevState.validators.term_in_months) {
      return {
        validators: nextProps.validators,
        termInMonths: parseInt((nextProps.validators.term_in_months || {}).min_value, 10),
        borrowAmount: parseInt((nextProps.validators.loan_amount || {}).min_value, 10),
      };
    }
    return null;
  }

  render() {
    const { validators, initialValues, handleSubmit, dispatch } = this.props;
    const { termInMonths, borrowAmount } = this.state;
    // prevent crashes if backend hangs at this point
    // can add a different message component
    if (!validators.loan_amount) return null;

    return (
      <form className='form-init' onSubmit={ handleSubmit }>
        <div className='container'>
          <div className='row mb-5 mt-5'><h1>Start your loan application now</h1></div>
          <div className='loan-slider row'>
            <Field
              name='loan_amount'
              dataCy='input-loan-amount'
              sliderTitle='How much do you want to borrow?'
              sliderType='money'
              extraLabel='£'
              extraLabelPosition='left'
              component={ HorizontalSlider }
              steps={ 50 }
              validate={ [required] }
              min={ validators.loan_amount.min_value }
              max={ 12000 }
              // max={ validators.loan_amount.max_value }
              reduxFormChange={ (value) => {
                dispatch(change('form-screen', 'loan_amount', value));
                this.setState({ borrowAmount: value });
              } }
              defaultValue={ parseInt(initialValues.loan_amount, 10) }
            />
          </div>
          <div className='loan-slider row mb-5 mt-5'>
            <Field
              name='term_in_months'
              dataCy='input-term-in-months'
              sliderTitle='Over how many months?'
              sliderType='months'
              extraLabel='months'
              extraLabelPosition='right'
              component={ HorizontalSlider }
              validate={ [required] }
              steps={ 1 }
              min={ validators.term_in_months.min_value }
              max={ 60 }
              // max={ validators.term_in_months.max_value }
              reduxFormChange={ (value) => {
                dispatch(change('form-screen', 'term_in_months', value));
                this.setState({ termInMonths: value });
              } }
              defaultValue={ parseInt(initialValues.term_in_months, 10) }
            />
          </div>
        </div>
        <div className='primary-color-stripe row'>
          <div className='container bg-light-gray pl-5 pt-4 pb-5 pr-5'>
            <div className='row pb-3'>
              <div className='col'>
                <h1>Your loan in numbers.</h1>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <div className='pt-4'>Monthly repay</div>
                <h2 className='pt-3'>{`£${ monthlyPaymentLoanCalculator(representativeAPR, borrowAmount, termInMonths).toFixed(2) }`}</h2>
              </div>
              <div className='col'>
                <div className='pt-4'>Total repay</div>
                <h2 className='pt-3'>{`£${ (termInMonths * monthlyPaymentLoanCalculator(representativeAPR, borrowAmount, termInMonths)).toFixed(2) }`}</h2>
              </div>
              <div className='col'>
                <div className='pt-4'>Representative APR</div>
                <h2 className='pt-3'>{`${ (representativeAPR * 100).toFixed(2) }%`}</h2>
              </div>
            </div>
            <div className='row pt-5 float-right'>
              <button
                data-cy='action-start-application'
                onClick={ () => {
                  // Keep the approximated values in store in order to display them on further steps (optional)
                  dispatch({
                    type: APPLIATION_SAVE_QUOTE,
                    payload: {
                      monthlyRepayment: monthlyPaymentLoanCalculator(representativeAPR, borrowAmount, termInMonths).toFixed(2),
                      totalRepayable: (termInMonths * monthlyPaymentLoanCalculator(representativeAPR, borrowAmount, termInMonths)).toFixed(2),
                      representativeAPR: (representativeAPR * 100).toFixed(2),
                    },
                  });
                } }
                className='btn btn-primary'
                type='submit'
              >
                Start my application
              </button>
            </div>
          </div>
        </div>
        <div className='container pb-5'>
          <div className='row mb-5 mt-5'><h1>What&apos;s in it for you?</h1></div>
          <div className='row text-center'>
            <div className='col'>
              <div className='p-4'><img style={{ height: 100 }} src={ quickApproveLoan } alt='quick approve' /></div>
              <div className='p-4'>
                <p>Before your savings reach maturity, we’ll get in touch to ask what you’d like to do once your term ends.<br /> <br />
                  You can reinvest your money for a further fixed term, or we can transfer your savings straight back to your bank account. The choice is yours.</p>
              </div>
            </div>
            <div className='col'>
              <div className='p-4'><img style={{ height: 100 }} src={ noCharges } alt='no charges' /></div>
              <div className='p-4'>
                <p>Before your savings reach maturity, we’ll get in touch to ask what you’d like to do once your term ends.<br /> <br />
                  You can reinvest your money for a further fixed term, or we can transfer your savings straight back to your bank account. The choice is yours.</p>
              </div>
            </div>
            <div className='col'>
              <div className='p-4'><img style={{ height: 100 }} src={ flexibleLoans } alt='flexible loans' /></div>
              <div className='p-4'><p>A very flexible loan.<br />Make overpayments, delay repayments, all without any extra fees.</p></div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default StartLoanApplicationForm;
