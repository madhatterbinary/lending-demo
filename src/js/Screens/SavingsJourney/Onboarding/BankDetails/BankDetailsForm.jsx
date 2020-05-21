import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import Opacity from 'js/Components/Animations/Opacity';
import { required, number, exactLength8, exactLength6, alphaNumeric } from 'js/Validation';
import TextField from 'js/Components/Forms/TextField';
import './BankDetails.scss';


const BankDetailsForm = props => {
  const { submitting, handleSubmit } = props;
  return (
    <Opacity speed={ 300 }>
      <form
        className='container bank-details-savings-form'
        onSubmit={ handleSubmit }
        style={{ marginTop: '-25px', display: 'flex', flexDirection: 'column' }}
      >
        <Fragment>
          <h1 className='title' style={{ marginTop: 20 }}>Your bank details</h1>
          <p className='open-account-info' style={{ marginTop: 50, textAlign: 'left', marginRight: 'auto', marginLeft: 'auto', padding: 20, paddingTop: 10, backgroundColor: '#EFEFEF' }}><p style={{ color: '#E83D52', fontSize: '1.3em', marginBottom: 0 }}><strong>Important:</strong></p> Once your Yobota account is open, you&apos;ll need to transfer your savings, from one of your existing bank accounts. Most banks let you do this online, on the phone or in branch</p>
          <h2 style={{ marginTop: 30 }}>We can only select deposits from ONE bank account</h2>
          <h2 style={{ marginTop: 30, fontWeight: 600 }}>Please add the bank account that you want to transfer your savings deposit from</h2>
          <div className='row'>
            <div className='col'>
              <div className='container'>
                <div className='row'>
                  <div
                    className='col mb-3 pt-4'
                    ref={ (el) => {
                      if (el) {
                        el.style.setProperty('margin-bottom', '0em', 'important');
                      }
                    } }
                    style={{ paddingLeft: 0 }}
                  >
                    <p style={{ color: '#E83D52', fontSize: '1.3em', marginBottom: 0 }}><strong>The bank account you select must be:</strong></p>
                  </div>
                </div>
                <div className='row'>
                  <div className='col' style={{ paddingLeft: 0 }}>
                    <p className='m-0 p-0'><span className='text-primary mr-3' style={{ position: 'relative', top: '0.35rem', fontSize: '2rem' }}>&bull;</span>In your name.</p>
                    <p className='m-0 p-0'><span className='text-primary mr-3' style={{ position: 'relative', top: '0.35rem', fontSize: '2rem' }}>&bull;</span>Able to accept faster payments.</p>
                    <p className='m-0 p-0'><span className='text-primary mr-3' style={{ position: 'relative', top: '0.35rem', fontSize: '2rem' }}>&bull;</span>A current account, not a savings account.</p>
                    <p className='m-0 p-0'><span className='text-primary mr-3' style={{ position: 'relative', top: '0.35rem', fontSize: '2rem' }}>&bull;</span>From a UK bank or building society.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className='open-account-info' style={{ marginTop: 25, textAlign: 'left', marginRight: 'auto', marginLeft: 'auto', padding: 20, paddingTop: 0, paddingBottom: 7, backgroundColor: '#EFEFEF' }}><p style={{ color: '#E83D52', fontSize: '1.3em', marginBottom: 0 }} /></p>
          <p style={{ color: '#E83D52', fontSize: '1.3em', marginBottom: 20 }}><strong>Your bank account details</strong></p>
          <div className='form-row' style={{ display: 'flex', flexDirection: 'column', marginLeft: 0 }}>
            <div className='sub-row' style={{ maxWidth: 235 }}>
              <Field
                name='name_on_account'
                dataCy='input-name-on-account'
                label='Account holder name*'
                component={ TextField }
                type='text'
                validate={ [required, alphaNumeric] }
              />
            </div>
            <div className='sub-row' style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ width: 235, marginRight: 25 }}>
                <Field
                  name='account_number'
                  dataCy='input-account-number'
                  label='Account number*'
                  component={ TextField }
                  type='text'
                  validate={ [required, number, exactLength8] }
                />
              </div>
              <div style={{ width: 235 }}>
                <Field
                  name='sort_code'
                  dataCy='input-sort-code'
                  label='Sort code*'
                  component={ TextField }
                  type='text'
                  validate={ [required, number, exactLength6] }
                />
              </div>
            </div>
          </div>

          <button className='btn btn-primary' style={{ marginBottom: 25, width: 100, alighSelf: 'end' }} type='submit' disabled={ submitting } data-cy='action-continue-bank-details'>Next</button>

        </Fragment>
      </form>
    </Opacity>
  );
};

BankDetailsForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default BankDetailsForm;
