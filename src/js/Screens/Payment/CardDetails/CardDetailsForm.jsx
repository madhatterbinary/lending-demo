/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as actions from 'js/Store/Actions/generic';
import { Field } from 'redux-form';
import TextField from 'js/Components/Forms/TextField';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import { required } from 'js/Validation';
import CreditcardIcon from 'js/assets/images/creditcardicon.png';
import '../CardDetailsPayment.scss';

// eslint-disable-next-line prefer-destructuring
const Worldpay = window.Worldpay;

const env = runtimeEnv();
let form = null;

const CardDetailsForm = (props) => {
  const [editingAddress, setEditingAddress] = useState(false);
  const { submitStepDataCSRF } = useActions(actions);

  const { pageData, currentValues, REPAYMENT_AMOUNT, REDUCTION_TYPE_MESSAGE } = useSelector(state => {
    return ({
      pageData: state.stepData.pageData,
      currentValues: (state.form['form-screen'] || {}).values,
      REPAYMENT_AMOUNT: state.stepData.pageData.REPAYMENT_AMOUNT,
      REDUCTION_TYPE_MESSAGE: state.stepData.pageData.REDUCTION_TYPE_MESSAGE,
    });
  });
  const [credicardNumber, setCredicardNumber] = useState(null);
  const [credicardMonth, setCredicardMonth] = useState(null);
  const [credicardYear, setCredicardYear] = useState(null);
  const [credicardCVC, setCredicardCVC] = useState(null);

  useEffect(() => {
    form = document.getElementById('paymentForm');
    if (form !== null) {
      Worldpay.useOwnForm({
        'clientKey': env.REACT_APP_WORLDPAY_KEY,
        'form': form,
        'reusable': true,
        'saveButton': false,
        'callback': function (status, response) {
          document.getElementById('paymentErrors').innerHTML = '';
          if (response.error) {
            Worldpay.handleError(form, document.getElementById('paymentErrors'), response.error);
          } else {
            // eslint-disable-next-line prefer-destructuring
            const token = response.token;
            if (response && token) {
              Worldpay.formBuilder(form, 'input', 'hidden', 'token', token);
            }
          }
        },
      });
    }
  }, [form, editingAddress, credicardNumber, credicardMonth, credicardYear, credicardCVC]);

  const submitCreditcardForm = () => {
    form = document.getElementById('paymentForm');
    const { urlToUse } = props;
    if (form !== null) {
      Worldpay.useOwnForm({
        'clientKey': env.REACT_APP_WORLDPAY_KEY,
        'form': form,
        'reusable': true,
        'saveButton': false,
        'callback': function (status, response) {
          document.getElementById('paymentErrors').innerHTML = '';
          if (response.error) {
            Worldpay.handleError(form, document.getElementById('paymentErrors'), response.error);
          } else {
            // eslint-disable-next-line prefer-destructuring
            const token = response.token;
            if (response && token) {
              Worldpay.formBuilder(form, 'input', 'hidden', 'token', token);
              const payment_payload = response.paymentMethod;
              const world_pay_token = response.token;
              const values = { ...currentValues, payment_payload, world_pay_token };
              setTimeout(() => {
                submitStepDataCSRF(urlToUse, values);
              }, 1000);
            }
          }
        },
      });
    }
  };

  const toggleEditingAddress = () => {
    setEditingAddress(!editingAddress);
  };

  const isNumeric = (evt) => {
    const theEvent = evt || window.event;
    let key = theEvent.keyCode || theEvent.which;
    let regex = '';
    key = String.fromCharCode(key);
    if (evt.target.name === 'name') {
      regex = /^[a-zA-Z\s]*$/i;
    } else if (evt.target.name === 'number' || evt.target.name === 'month' || evt.target.name === 'year' || evt.target.name === 'cvc') {
      regex = /[0-9]|\./;
    }
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  };

  const creditcardNumberMaxLength = (object) => {
    if (Number(object.target.value) > Number(object.target.max)) {
      if (object.target.name === 'number') {
        setCredicardNumber('');
      } else if (object.target.name === 'month') {
        setCredicardMonth('');
      } else if (object.target.name === 'year') {
        setCredicardYear('');
      } else if (object.target.name === 'cvc') {
        setCredicardCVC('');
      }
    } else if (object.target.name === 'number') {
      setCredicardNumber(object.target.value);
    } else if (object.target.name === 'month') {
      setCredicardMonth(object.target.value);
    } else if (object.target.name === 'year') {
      setCredicardYear(object.target.value);
    } else if (object.target.name === 'cvc') {
      setCredicardCVC(object.target.value);
    }
  };

  if (!pageData.CURRENT_ADDRESS) return null;
  if (document.getElementsByClassName('servicing-header')[0]) {
    document.getElementsByClassName('servicing-header')[0].style.display = 'block';
  }
  const { urlToUse } = props;

  return (
    <form
      className='card-details-form form-container'
      id='paymentForm'
      onSubmit={ submitCreditcardForm() }
      style={{ marginLeft: '-18px' }}
    >
      <div
        className='container mt-4'
        ref={ (el) => {
          if (el) {
            el.style.setProperty('margin-top', '10px', 'important');
          }
        } }
      >
        <div className='row' style={{ flexWrap: 'unset' }}>
          <div className='col'>
            {editingAddress ? (
              <div className='red-box address' style={{ width: 345, height: 559 }}>
                <div className='row mb-3' style={{ height: 28 }}>
                  <div className='col'>
                    <h3 className='title'>Enter new billing address</h3>
                  </div>
                </div>
                <div className='row' style={{ marginBottom: 20 }}>
                  <div className='col'>
                    <div className='red-line' />
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col text-primary'>
                    <label htmlFor='house_name'><strong style={{ color: 'grey', fontSize: '1.5em', marginTop: 10 }}>House name/number</strong>
                      <Field
                        name='building'
                        dataCy='input-address-building'
                        label='House number*'
                        component={ TextField }
                        type='text'
                        validate={ [required] }
                      />
                    </label>
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col text-primary'>
                    <label htmlFor='street'><strong style={{ color: 'grey', fontSize: '1.5em' }}>Street</strong>
                      <Field
                        name='line_1'
                        dataCy='input-address-line-1'
                        label='Line 1*'
                        component={ TextField }
                        type='text'
                        validate={ [required] }
                      />
                    </label>
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col text-primary'>
                    <label htmlFor='city-town'><strong style={{ color: 'grey', fontSize: '1.5em' }}>City/Town</strong>
                      <Field
                        name='line_2'
                        dataCy='input-address-line-2'
                        label='Line 2&nbsp;'
                        component={ TextField }
                        type='text'
                        validate={ [] }
                      />
                    </label>
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col text-primary'>
                    <label htmlFor='county'><strong style={{ color: 'grey', fontSize: '1.5em' }}>County</strong>
                      <Field
                        name='post_town'
                        dataCy='input-address-post-town'
                        label='Town/City*'
                        component={ TextField }
                        type='text'
                        validate={ [required] }
                      />
                    </label>
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col text-primary'>
                    <label htmlFor='postcode'><strong style={{ color: 'grey', fontSize: '1.5em' }}>Postcode</strong>
                      <Field
                        name='postcode'
                        dataCy='input-address-postcode'
                        label='Postcode*'
                        component={ TextField }
                        type='text'
                        validate={ [required] }
                      />
                    </label>
                  </div>
                </div>
                <div
                  className='row'
                  style={{ marginTop: 20,
                    display: 'flex',
                    justifyContent: 'space-between' }}
                >
                  <div className='col' style={{ paddingRight: 0, paddingLeft: 0 }}>
                    <button
                      type='button'
                      className='btn btn-white ml-3'
                      onClick={ toggleEditingAddress }
                      data-cy='action-cancel-save-address'
                    >Cancel</button>
                  </div>
                  <div className='col text-right'>
                    <button
                      className='btn btn-primary'
                      type='button'
                      onClick={ toggleEditingAddress }
                      data-cy='action-world-pay-next-step'
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className='red-box address' style={{ width: 345, height: 170 }}>
                <div className='row mb-3'>
                  <div className='col' style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 0, height: 28 }}>
                    <h3 className='title'>Current billing address</h3>
                    <i
                      className='material-icons'
                      style={{ marginBottom: 5, fontSize: '1.6em', color: '#E83D52', lineHeight: 'unset', cursor: 'pointer', position: 'relative', bottom: 5 }}
                      onClick={ toggleEditingAddress }
                      data-cy='action-edit-card-details'
                    >edit</i>
                  </div>
                </div>
                <div className='row' style={{ marginBottom: 10 }}>
                  <div className='col'>
                    <div className='red-line' />
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col'>
                    { currentValues.building } { currentValues.line_1 }
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col'>
                    { currentValues.line_2 }
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col'>
                    { currentValues.post_town }
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col'>
                    { currentValues.postcode }
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className='col'>
            <div className='red-box creditcard' style={{ width: 370 }}>
              <div className='container pt-3 pb-3' data-cy='card-payment-details'>
                <div className='row' style={{ height: 28 }}>
                  <div className='col' style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 0 }}>
                    <h3 className='title'>Your payment details</h3>
                    <i className='material-icons' style={{ marginBottom: 5, fontSize: '1.6em', color: '#E83D52', lineHeight: 'unset', marginRight: '-2px', position: 'relative', bottom: 5 }}>credit_card</i>
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <div className='red-line' />
                  </div>
                </div>
                { urlToUse === '/lending/account/management/payment/start/'
                  ? (
                    <>
                      <div style={{ margin: 10, marginLeft: 0 }}><strong>Reduction type:</strong> {REDUCTION_TYPE_MESSAGE}</div>
                      <div className='row'>
                        <div className='col'>
                          <div className='grey-line' />
                        </div>
                      </div>
                    </>
                  ) : null
                }
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ margin: 10, marginLeft: 0 }}><strong>You are making a payment for:</strong> {`£${ Number(REPAYMENT_AMOUNT).toFixed(2) }`} </div>
                  <div className='col-2 p-2 d-flex align-items-center pl-4'>
                    { urlToUse === '/lending/account/management/payment/start/'
                      ? (
                        <Link to='/lending/servicing/manageloan/makepayment'>
                          <i className='material-icons text-primary' style={{ marginLeft: 10 }}>edit</i>
                        </Link>
                      ) : null
                    }
                  </div>
                </div>
                <div className='creditcard-icon-bg'>
                  <div className='creditcard-inputs'>
                    <div className='creditcard-row-top'>
                      <div
                        className='row mt-3'
                        ref={ (el) => {
                          if (el) {
                            el.style.setProperty('margin-top', '0.3rem', 'important');
                          }
                        } }
                      >
                        <div className='form-row'>
                          <label htmlFor='empty'>CARD NUMBER</label>
                          <input
                            onKeyPress={ (event) => isNumeric(event) }
                            onInput={ (obj) => creditcardNumberMaxLength(obj) }
                            data-worldpay='number'
                            name='number'
                            min={ 0 }
                            max={ 99999999999999999999 }
                            type='text'
                            value={ credicardNumber }
                            style={{ width: 274 }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='creditcard-row-middle'>
                      <div className='row mt-3'>
                        <div className='form-row'>
                          <label htmlFor='empty'> CARD HOLDER NAME </label>
                          <input
                            onKeyPress={ (event) => isNumeric(event) }
                            data-worldpay='name'
                            name='name'
                            type='text'
                            style={{ width: 274 }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='creditcard-row-bottom'>
                      <div className='row mt-3'>
                        <div className='form-row exp-month-year'>
                          <label htmlFor='empty'>EXPIRE</label>
                          <div className='month-year-lable-container'>
                            <input
                              onKeyPress={ (event) => isNumeric(event) }
                              onInput={ (obj) => creditcardNumberMaxLength(obj) }
                              data-worldpay='exp-month'
                              name='month'
                              size='2'
                              type='text'
                              min={ 0 }
                              max={ 12 }
                              value={ credicardMonth }
                            />
                            <label htmlFor='empty'> / </label>
                            <input
                              onKeyPress={ (event) => isNumeric(event) }
                              onInput={ (obj) => creditcardNumberMaxLength(obj) }
                              data-worldpay='exp-year'
                              name='year'
                              size='4'
                              type='text'
                              min={ 0 }
                              max={ 2230 }
                              value={ credicardYear }
                            />
                          </div>
                        </div>
                      </div>
                      <div className='row mt-3'>
                        <div className='form-row cvc'>
                          <label htmlFor='empty'>CVC</label>
                          <input
                            onKeyPress={ (event) => isNumeric(event) }
                            onInput={ (obj) => creditcardNumberMaxLength(obj) }
                            data-worldpay='cvc'
                            name='cvc'
                            size='4'
                            type='text'
                            min={ 0 }
                            max={ 9999 }
                            value={ credicardCVC }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <img alt='info box' src={ CreditcardIcon } style={{ with: '100%' }} />
                </div>
                <div className='text-right mt-3 mb-3'>
                  <div id='paymentErrors' />
                  { urlToUse === '/lending/account/management/payment/start/'
                    ? (
                      <div className='col' style={{ paddingRight: 0, paddingLeft: 0, display: 'flex', justifyContent: 'space-between' }}>
                        <Link to='/lending/servicing/manageloan/makepayment'>
                          <button
                            type='button'
                            className='btn btn-white ml-3'
                            data-cy='action-back-to-payment'
                            ref={ (el) => {
                              if (el) {
                                el.style.setProperty('margin-left', '0px', 'important');
                              }
                            } }
                          >Back</button>
                        </Link>
                        <button
                          className='btn btn-primary'
                          type='submit'
                          onClick={ () => {
                            submitCreditcardForm();
                          } }
                          data-cy='action-world-pay-next-step'
                        >
                          Continue
                        </button>
                      </div>
                    ) : (
                      <button
                        className='btn btn-primary'
                        type='submit'
                        onClick={ () => {
                          submitCreditcardForm();
                        } }
                        data-cy='action-world-pay-next-step'
                      >
                        Continue
                      </button>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Field
        name='payment_payload'
        type='hidden'
        validate={ [required] }
        component={ TextField }
      />
      <Field
        name='world_pay_token'
        type='hidden'
        validate={ [required] }
        component={ TextField }
      />
    </form>
  );
};

CardDetailsForm.propTypes = {
  urlToUse: PropTypes.string,
};
CardDetailsForm.defaultProps = {
  urlToUse: '',
};

export default CardDetailsForm;
