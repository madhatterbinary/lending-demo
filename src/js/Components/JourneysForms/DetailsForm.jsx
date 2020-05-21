/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import SelectField from 'js/Components/Forms/SelectField';
import TextField from 'js/Components/Forms/TextField';
import DateField from 'js/Components/Forms/DateField';
import { Link } from 'react-router-dom';
import DocumentContainer from 'js/Components/DocumentViewer/DocumentContainer';
import { required, email, phoneNumber, alphaNumeric, maxLength10, minLength2 } from 'js/Validation';
import { generateOptionsList } from 'js/Utils/formUtils';

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.substr(1);
};

const DetailsForm = (props) => {
  // eslint-disable-next-line camelcase
  const { options, submitting, invalid, handleSubmit, urlToUse, pageData: { current_step } } = props;
  const setPathname = () => {
    if (current_step === 'savings_customer_person_details' || current_step === 'savings_customer_address_details') {
      return '/savings/termsandconditions';
    }
    if (current_step === 'personal_details') {
      return '/lending/getaloan';
    }
    if (current_step === 'contact_details') {
      return '/lending/onboarding/details';
    }
    if (current_step === 'credit_reference') {
      return '/lending/onboarding/address';
    }

    return `/${ urlToUse.substr(1, 7) }/${ urlToUse.substr(9, 100) }`;
  };

  return (
    <form className='details-form form-container' onSubmit={ handleSubmit }>
      <div className='container p-0'>
        <div className='row mb-3'>
          <div className='col'>
            <Field
              name='title'
              dataCy='input-title'
              label='Title*'
              type='text'
              component={ SelectField }
              options={ generateOptionsList(options.title || []) }
              validate={ [required] }
            />
          </div>
          <div className='col' />
          <div className='col' />
        </div>
        <div className='row mb-3'>
          <div className='col'>
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
          </div>
          <div className='col'>
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
          <div className='col' />
        </div>
        <div className='row mb-3'>
          <div className='col'>
            <Field
              name='date_of_birth'
              dataCy='input-date-of-birth'
              component={ DateField }
              label='Date of birth*'
              validate={ [required] }
            />
          </div>
          <div className='col' />
          <div className='col' />
        </div>
        <div className='row mb-5'>
          <div className='col'>
            <Field
              name='email_address'
              dataCy='input-email-address'
              label='Email address*'
              component={ TextField }
              type='text'
              validate={ [required, email] }
            />
          </div>
          <div className='col'>
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
          <div className='col' />
        </div>
        <div className='row'>
          <div className='col'>
            <p>We&apos;ll never sell your personal details on. We&apos;ll send your loan documents by email.</p>
            <p>
              <DocumentContainer
                dataCy='loan-information-document'
                subTitle=''
                btnText='Privacy Policy'
                docType='PrivacyPolicy'
                copy=''
                url='/privacyPolicy.html'
                documentText=''
                textBtn
              />
            </p>
          </div>
        </div>
        <div className='row mb-4'>
          <div className='col' />
          <div className='col text-right'>
            <Link to={ setPathname() }>
              <button type='button' className='btn btn-outline-primary pr-4 mr-4' disabled={ submitting }><i className='material-icons'>chevron_left</i>Back</button>
            </Link>
            <button className='btn btn-primary pl-4' type='submit' data-cy='action-next-step' disabled={ submitting }>Next step<i className='material-icons'>chevron_right</i></button>
          </div>
        </div>
        <div className='row mb-4 text-right'>
          <div className='col' />
          <div className='col text-right'><label htmlFor='submit-warning' className='warning'>{ invalid ? 'form incomplete, check above.' : ''}</label></div>
        </div>
      </div>
    </form>
  );
};

DetailsForm.propTypes = {
  options: PropTypes.object,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  urlToUse: PropTypes.string,
  pageData: PropTypes.object,
};

DetailsForm.defaultProps = {
  options: {},
  urlToUse: '',
  pageData: {},
};

export default DetailsForm;
