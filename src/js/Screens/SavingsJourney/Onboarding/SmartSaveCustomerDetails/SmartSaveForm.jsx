import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';
import SelectField from 'js/Components/Forms/SelectField';
import TextField from 'js/Components/Forms/TextField';
import DateField from 'js/Components/Forms/DateField';
import CheckBoxField from 'js/Components/Forms/CheckBoxField';

import { required, email, phoneNumber, alphaNumeric, maxLength10, minLength2 } from 'js/Validation';
import { generateOptionsList } from 'js/Utils/formUtils';
import AddressesPanel from 'js/Components/AddressesPanel';

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.substr(1);
};

const SmartSaveForm = (props) => {
  const { options, invalid, handleSubmit } = props;

  return (
    <Fragment>
      <form className='details-form form-container' onSubmit={ handleSubmit }>
        {/* Details form */}
        <div className='form-row'>
          <Field
            name='title'
            dataCy='input-title'
            label='Title*'
            type='text'
            component={ SelectField }
            options={ generateOptionsList(options.title || []) }
            validate={ required }
          />
          <Field
            name='first_name'
            dataCy='input-first-name'
            label='First name*'
            component={ TextField }
            type='text'
            validate={ [required, maxLength10, minLength2] }
            normalize={ capitalize }
            warn={ alphaNumeric }
          />
          <Field
            name='last_name'
            dataCy='input-last-name'
            component={ TextField }
            label='Last name*'
            type='text'
            validate={ [required, maxLength10, minLength2] }
            normalize={ capitalize }
            warn={ alphaNumeric }
          />
        </div>
        <div className='form-row'>
          <Field
            name='date_of_birth'
            dataCy='input-date-of-birth'
            label='Date of birth*'
            component={ DateField }
            validate={ [required] }
          />
          <Field
            name='email_address'
            dataCy='input-email-address'
            label='Email address*'
            component={ TextField }
            type='text'
            validate={ [required, email] }
          />
          <Field
            name='phone_number'
            dataCy='input-phone-number'
            label='Phone number*'
            component={ TextField }
            type='text'
            validate={ [required, phoneNumber] }
            normalize={ capitalize }
          />
        </div>

        {/* Address form */}
        <div className='form-row'>
          <h1>Addresses</h1>
        </div>
        {/* Hidden form field to assist with frontend validation of minimum amount of years lived in the UK */}
        <Field name='form_valid' component='input' type='hidden' />
        {/* Field Array allows multiple blocks of identical structure to be added to the form */}
        <FieldArray
          name='addresses'
          label='Address*'
          component={ AddressesPanel }
          invalid={ invalid }
          options={ options }
        />

        {/* Residency and comms form */}
        <div className='form-row'>
          <h1>Step 3 - Residency and Communication</h1>
        </div>
        <div className='communication-preferences'>
          <div className='radio-tax-buttons' style={{ display: 'flex' }}>
            <h3 className='title' style={{ textAlign: 'left' }}>Are you liable to pay tax in the UK only?*</h3>
            <div className='radio-inputs' style={{ display: 'flex' }}>
              <Field
                name='tax_residency_check'
                data-cy='input-tax-residency-check-yes'
                component='input'
                type='radio'
                value='UKOnly'
              />{' '} <div style={{ marginLeft: 0, marginRight: 20 }}>Yes</div>
              <Field
                name='tax_residency_check'
                data-cy='input-tax-residency-check-no'
                component='input'
                type='radio'
                value='Multiple'
              />{' '} No
            </div>
          </div>
          <div className='radio-tax-buttons' style={{ display: 'flex' }}>
            <h3 className='title' style={{ textAlign: 'left' }}>Are you liable to pay tax in the UK only?*</h3>
            <div className='radio-inputs' style={{ display: 'flex' }}>
              <Field
                name='nationality_check'
                data-cy='input-nationality-check-yes'
                component='input'
                type='radio'
                value='UK'
              />{' '} <div style={{ marginLeft: 0, marginRight: 20 }}>Yes</div>

              <Field
                name='nationality_check'
                data-cy='input-nationality-check-no'
                component='input'
                type='radio'
                value='Other'
              />{' '} No
            </div>
          </div>
          <div className='insurance-number'>
            <h3 className='title' style={{ padding: 0 }}>National Insurance number *</h3>
            <div style={{ width: 240 }}>
              <Field
                dataCy='input-ni-number'
                name='ni_number'
                component={ TextField }
                validate={ [required] }
              />
            </div>
          </div>

        </div>

        <div className='communication-preferences'>
          <h3 className='title' style={{ textAlign: 'left', paddingTop: 30, height: 'unset' }}>Tell us what topics you want to hear about:</h3>
          <div style={{ paddingTop: 5 }}>
            <Field
              name='account_changes'
              dataCy='input-communication-preference-account-changes'
              id='account_changes'
              label='Changes to and reminders for my account'
              component={ CheckBoxField }
            />
          </div>
          <div style={{ paddingTop: 5, paddingBottom: 50 }}>
            <Field
              name='product_offers'
              dataCy='input-communication-preference-product-offers'
              id='product_offers'
              label='Product updates and offers'
              component={ CheckBoxField }
            />
          </div>

          <h3 className='title' style={{ textAlign: 'left' }}>Tell us how youd like us to get in touch:</h3>
          <div style={{ paddingTop: 5 }}>
            <Field
              name='email'
              dataCy='input-communication-method-email'
              id='email'
              label='Email'
              component={ CheckBoxField }
            />
          </div>
          <div style={{ paddingTop: 5 }}>
            <Field
              name='text'
              dataCy='input-communication-method-sms'
              id='text'
              label='Text'
              component={ CheckBoxField }
            />
          </div>
          <div style={{ paddingTop: 5 }}>
            <Field
              name='phone'
              dataCy='input-communication-method-phone'
              id='phone'
              label='Phone'
              component={ CheckBoxField }
            />
          </div>

        </div>
        <div style={{ paddingBottom: 40 }}>
          <button className='button primary' type='submit' data-cy='action-agree-to-communication-preferences'>Continue</button>
        </div>
      </form>
    </Fragment>
  );
};

SmartSaveForm.propTypes = {
  options: PropTypes.object,
  invalid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

SmartSaveForm.defaultProps = {
  options: {},
};

export default SmartSaveForm;
