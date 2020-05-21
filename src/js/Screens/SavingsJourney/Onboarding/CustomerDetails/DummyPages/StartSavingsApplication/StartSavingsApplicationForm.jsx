import React, { useState } from 'react';
import { Field, change } from 'redux-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Features from 'js/Components/Features';
import HorizontalSlider from 'js/Components/HorizontalSlider';
import SavingsIcon1 from 'js/assets/images/savingsIcon1.png';
import SavingsIcon2 from 'js/assets/images/savingsIcon2.png';
import SavingsIcon3 from 'js/assets/images/savingsIcon3.png';
import { required } from 'js/Validation';
// import './StartSavingsApplication.scss';

// TODO: get those from api
let savingsAmount = parseFloat(1000);
const interestRate = parseFloat(2);

function StartSavingsApplicationForm(props) {
  const { handleSubmit, dispatch } = props;
  const [totalEarned, setTotalEarned] = useState(20);

  const calculateSavings = (value) => {
    savingsAmount = value;
    dispatch(change('form-screen', 'savings_amount', value));
    const totalGains = parseFloat((savingsAmount * (1 + (interestRate / 100)) - savingsAmount)).toFixed(2);
    //monthlyPayment = monthlyPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setTotalEarned(totalGains);
  };

  //if (!validators.loan_amount) return <p>No data</p>;
  return (
    <form className='form-init' onSubmit={ handleSubmit }>
      <div className='container'>
        <div className='row'>
          <div className='col m-0 p-0'>
            <Field
              name='saving_amount'
              sliderTitle='Deposit calculator'
              sliderType='money'
              extraLabel='£'
              extraLabelPosition='left'
              component={ HorizontalSlider }
              steps={ 50 }
              validate={ [required] }
              min={ 1000 } // validators.loan_amount.min_value
              max={ 85000 } // validators.loan_amount.max_value
              reduxFormChange={ calculateSavings }
              defaultValue={ 1000 } // parseInt(initialValues.savings_amount, 10)
            />
          </div>
        </div>
        <div className='primary-color-stripe row' style={{ marginTop: 36 }}>
          <div
            className='container bg-light-gray pl-5 pt-4 pb-5 pr-5'
            ref={ (el) => {
              if (el) {
                el.style.setProperty('padding', '25px', 'important');
              }
            } }
          >
            <div
              className='topBox'
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <div className='row pb-3'>
                <div className='col'>
                  <h1 className='grey-color' style={{ width: 300, marginTop: 0, position: 'relative' }}>Your estimated quote</h1>
                </div>
              </div>
              <div className='row pb-3'>
                <div className='col'>
                  <h1 style={{ fontSize: '3em', postion: 'relative', top: '-8px' }}>{`£${ totalEarned }`}</h1>
                </div>
              </div>
            </div>
            <div className='row'>
              <div
                className='col mt-5 p-0'
                ref={ (el) => {
                  if (el) {
                    el.style.setProperty('padding', '25px', 'important');
                    el.style.setProperty('padding-bottom', '0px', 'important');
                    el.style.setProperty('margin-bottom', '0px', 'important');
                    el.style.setProperty('margin-top', '0px', 'important');
                  }
                } }
              >
                <Features
                  text1='* AER stands for annual equivalent rate and illustrates the interest rate if it was paid and compounded once each year.'
                  text2='** Total interest is indicative based on the calculation that the entire deposit is received on the day the account is opened.'
                />
              </div>
            </div>
            <div className='row'>
              <div
                className='col mt-4 p-0 text-right'
                ref={ (el) => {
                  if (el) {
                    el.style.setProperty('padding', '20px', 'important');
                    el.style.setProperty('padding-bottom', '0px', 'important');
                  }
                } }
              >
                <Link to='/savings/summarysavings'>
                  <button className='btn btn-primary' type='submit'>View summary and apply</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='container pb-5'>
          <div className='row mb-5 mt-5'><h1>What&apos;s in it for you?</h1></div>
          <div className='row text-center'>
            <div className='col'>
              <div className='p-4'><img style={{ height: 100 }} src={ SavingsIcon3 } alt='quick approve' /></div>
              <div className='p-4'>
                <p><b>Interest</b><br />as soon as you transfer the funds into the account.</p>
              </div>
            </div>
            <div className='col'>
              <div className='p-4'><img style={{ height: 100 }} src={ SavingsIcon2 } alt='no charges' /></div>
              <div className='p-4'>
                <p><b>Control</b><br />over your savings. You decide how to proceed at the end of the term.</p>
              </div>
            </div>
            <div className='col'>
              <div className='p-4'><img style={{ height: 100 }} src={ SavingsIcon1 } alt='flexible loans' /></div>
              <div className='p-4'><p><b>True support</b><br />from our UK team. Live chat, phone or email.</p></div>
            </div>
          </div>
        </div>
        {/* <div className='row'>
          <div className='col m-0 mb-5 mt-5 p-0'>
            <div className='container'>
              <div className='row mb-2'>
                <div className='col m-0 p-0' style={{ display: 'flex', justifyContent: 'center' }}><img alt='SavingsIcon1' src={ SavingsIcon1 } /></div>
                <div className='col m-0 p-0' style={{ display: 'flex', justifyContent: 'center' }}><img alt='SavingsIcon2' src={ SavingsIcon2 } /></div>
                <div className='col m-0 p-0' style={{ display: 'flex', justifyContent: 'center' }}><img alt='SavingsIcon3' src={ SavingsIcon3 } /></div>
              </div>
              <div className='row mb-5'>
                <div className='col m-0 p-0' style={{ display: 'flex', justifyContent: 'center' }}>
                  <p
                    className='pr-5'
                    style={{ textAlign: 'center' }}
                    ref={ (el) => {
                      if (el) {
                        el.style.setProperty('padding-right', '1rem', 'important');
                        el.style.setProperty('padding-left', '1rem', 'important');
                      }
                    } }
                  >We believe you should get the most out of your hard-earned money,
                    so you’ll start earning interest as soon as you transfer money into your savings account.<br /> <br />
                    Want to get started? Open your account, transfer your money and watch your savings grow, the smart way.</p>
                </div>
                <div className='col m-0 p-0'>
                  <p
                    className='pr-5'
                    style={{ textAlign: 'center' }}
                    ref={ (el) => {
                      if (el) {
                        el.style.setProperty('padding-right', '1rem', 'important');
                        el.style.setProperty('padding-left', '1rem', 'important');
                      }
                    } }
                  >Before your savings reach maturity, we’ll get in touch to ask what you’d like to do once your term ends.<br /> <br />
                    You can reinvest your money for a further fixed term, or we can transfer your savings straight back to your bank account. The choice is yours.</p>
                </div>
                <div className='col m-0 p-0'>
                  <p
                    className='pr-5'
                    style={{ textAlign: 'center' }}
                    ref={ (el) => {
                      if (el) {
                        el.style.setProperty('padding-right', '1rem', 'important');
                        el.style.setProperty('padding-left', '1rem', 'important');
                      }
                    } }

                  >Before your savings reach maturity, we’ll get in touch to ask what you’d like to do once your term ends.<br /> <br />
                    You can reinvest your money for a further fixed term, or we can transfer your savings straight back to your bank account. The choice is yours.</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </form>
  );
}

StartSavingsApplicationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func,
};

StartSavingsApplicationForm.defaultProps = {
  dispatch: () => {},
};

export default StartSavingsApplicationForm;
