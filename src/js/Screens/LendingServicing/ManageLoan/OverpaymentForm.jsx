/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import capitalize from 'capitalize';
import { Field } from 'redux-form';
import TextField from 'js/Components/Forms/TextField';
import { required, number, noNegativeNum, maxLength10, noLeadingZeros, noZero } from 'js/Validation';
import Opacity from 'js/Components/Animations/Opacity.jsx';

class OverpaymentForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
  }

  render() {
    const {
      submitting,
      handleSubmit,
    } = this.props;
    return (
      <Opacity speed={ 300 }>
        <form className='manage-loan-form' onSubmit={ handleSubmit }>
          <div style={{ width: `${ 50 }%` }}>
            <Field
              name='repayment_amount'
              dataCy='input-repayment-amount'
              key='repayment_amount'
              component={ TextField }
              type='number'
              label='£'
              validate={ [required, number, noNegativeNum, maxLength10, noLeadingZeros, noZero] }

              normalize={ capitalize }
            />
          </div>
          <div>
            <label htmlFor='hold_term'>
              <Field id='run_option' name='run_option' component='input' type='radio' value='hold_annuity' data-cy='input-hold-annuity' />
              &nbsp;&nbsp;I would like to keep my monthly repayment the same and reduce my loan term.
            </label>
          </div>
          <div className='mt-2 mb-3'>
            <label htmlFor='hold_annuity'>
              <Field id='run_option' name='run_option' component='input' type='radio' value='hold_term' data-cy='input-hold-term' />
              &nbsp;&nbsp;I would like to reduce my monthly repayment and keep my loan term the same.
            </label>
          </div>
          <div className='text-right mb-3'>
            <button
              className='btn btn-primary'
              type='submit'
              onClick={ handleSubmit }
              disabled={ submitting }
              data-cy='action-make-payment'
            >
              Make payment
            </button>
          </div>
        </form>
      </Opacity>
    );
  }
}

export default OverpaymentForm;
