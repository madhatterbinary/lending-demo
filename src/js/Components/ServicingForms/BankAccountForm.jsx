import React from 'react';
import capitalize from 'capitalize';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import TextField from 'js/Components/Forms/TextField';
import CheckBoxField from 'js/Components/Forms/CheckBoxField';
import Opacity from 'js/Components/Animations/Opacity';

import { required, maxLength8, minLength8, exactLength6, number } from 'js/Validation';

const BankAccountForm = props => {
  const { submitting, handleSubmit } = props;

  return (
    <Opacity speed={ 300 }>
      <form className='details-form' style={{ marginBottom: 0 }} onSubmit={ handleSubmit }>
        <h3 className='title' style={{ marginBottom: 13 }}>Edit Bank account</h3>
        <div className='row' style={{ marginBottom: 15 }}>
          <div className='col'>
            <div className='red-line' />
          </div>
        </div>
        <div className='sortcode-details'>
          <Field
            name='sort_code'
            dataCy='input-sort-code'
            component={ TextField }
            type='text'
            placeholder='Sort code'
            validate={ [required, number, exactLength6] }
            normalize={ capitalize }
          />
        </div>
        <div className='form-row' style={{ marginLeft: 0, width: '100%', display: 'block' }}>
          <Field
            name='account_number'
            dataCy='input-account-number'
            component={ TextField }
            type='text'
            placeholder='Account number*'
            validate={ [required, number, maxLength8, minLength8] }
            normalize={ capitalize }
          />
          <Field
            name='confirm_account_holder'
            dataCy='input-confirm-account-holder'
            key='confirm_account_holder'
            label='Are you the account holder?'
            component={ CheckBoxField }
            id='i60'
          />
          {/* <label htmlFor='confirm_account_holder' style={{ position: 'relative', top: 20 }}>
            <Field name='confirm_account_holder' id='confirm_account_holder' component='input' type='radio' value='true' />
            {' '}
                  Are you the account holder?
          </label> */}
        </div>
        <div className='row' style={{ marginTop: 218 }}>
          <div className='col text-right'>
            <button className='btn btn-primary' type='submit' disabled={ submitting } data-cy='action-save-bank-details'>
              Save
            </button>
          </div>
        </div>
      </form>
    </Opacity>
  );
};

BankAccountForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default BankAccountForm;
