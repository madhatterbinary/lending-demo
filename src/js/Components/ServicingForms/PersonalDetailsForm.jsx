import React from 'react';
import capitalize from 'capitalize';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import SelectField from 'js/Components/Forms/SelectField';
import TextField from 'js/Components/Forms/TextField';
import Opacity from 'js/Components/Animations/Opacity';
import { generateOptionsList } from 'js/Utils/formUtils';

import { required, phoneNumber, alphaNumeric, maxLength10, minLength2, number } from 'js/Validation';

const PersonalDetailsForm = props => {
  const { submitting, handleSubmit, options } = props;
  return (
    <Opacity speed={ 300 }>
      <form className='edit-details-form' style={{ marginBottom: 0 }} onSubmit={ handleSubmit }>
        <h3 className='title' style={{ marginBottom: 13 }}>Edit details</h3>
        <div className='row' style={{ marginBottom: 15 }}>
          <div className='col'>
            <div className='red-line' />
          </div>
        </div>
        <div className='container m-0 p-0' style={{ height: 428 }}>
          <div className='row'>
            <div className='col'>
              <Field
                name='person_title'
                dataCy='input-person-title'
                type='text'
                component={ SelectField }
                options={ generateOptionsList(options.person_title || []) }
                validate={ [required] }
              />
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <Field
                name='first_name'
                dataCy='input-first-name'
                placeholder='First name*'
                component={ TextField }
                type='text'
                validate={ [required, maxLength10, minLength2] }
                normalize={ capitalize }
                warn={ alphaNumeric }
              />
            </div>
          </div>
          <div className='row' style={{ marginTop: '-15px' }}>
            <div className='col'>
              <Field
                name='last_name'
                dataCy='input-last-name'
                component={ TextField }
                placeholder='Last name*'
                type='text'
                validate={ [required, maxLength10, minLength2] }
                normalize={ capitalize }
                warn={ alphaNumeric }
              />
            </div>
          </div>
          <div className='row' style={{ marginTop: '-15px' }}>
            <div className='col'>
              <Field
                name='phone_number'
                dataCy='input-phone-number'
                placeholder='Phone number*'
                component={ TextField }
                type='text'
                validate={ [required, number, phoneNumber] }
                normalize={ capitalize }
              />
            </div>
          </div>
          <div className='row' style={{ marginTop: 78 }}>
            <div className='col text-right'>
              <button className='btn btn-primary' type='submit' disabled={ submitting } data-cy='action-save-person-details'>
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </Opacity>
  );
};

PersonalDetailsForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  options: PropTypes.object,
};

PersonalDetailsForm.defaultProps = {
  options: {},
};

export default PersonalDetailsForm;
