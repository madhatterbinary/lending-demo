import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import SelectField from 'js/Components/Forms/SelectField';
import TextareaField from 'js/Components/Forms/TextareaField';
import Opacity from 'js/Components/Animations/Opacity';
import { generateOptionsList } from 'js/Utils/formUtils';

import {
  required,
} from 'js/Validation';


const ContactUsForm = props => {
  const { submitting, handleSubmit, options } = props;
  if (document.getElementsByClassName('servicing-header')[0] && options) {
    document.getElementsByClassName('servicing-header')[0].style.display = 'block';
  }
  return (
    <Opacity speed={ 300 }>
      <form className='details-form' onSubmit={ handleSubmit }>
        <div className='container m-0 p-0'>
          <div className='row'>
            <div className='col'>
              <Field
                name='enquiry_types'
                dataCy='input-enquiry-types'
                type='text'
                label='Enquiry types*'
                component={ SelectField }
                options={ generateOptionsList((options || {}).enquiry_types || []) }
                validate={ [required] }
              />
            </div>
            <div className='col' />
          </div>
          <div className='row'>
            <div className='col'>
              <Field
                name='message'
                dataCy='input-enquiry-message'
                placeholder='Feedback message*'
                component={ TextareaField }
                type='text'
                validate={ [required] }
              />
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col text-right'>
              <button className='btn btn-primary' type='submit' disabled={ submitting } data-cy='action-send-message'>
                Send message
              </button>
            </div>
          </div>
        </div>
      </form>
    </Opacity>
  );
};

ContactUsForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  options: PropTypes.object,
};

ContactUsForm.defaultProps = {
  options: {},
};

export default ContactUsForm;
