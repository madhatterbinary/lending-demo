/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form';
import TextField from 'js/Components/Forms/TextField';
import { required } from '../../../../Validation/index';

const ResidencyAndCommunicationForm = (props) => {
  const { handleSubmit, invalid, submitting, urlToUse, pageData: { current_step } } = props;

  const setPathname = () => {
    if (current_step === 'savings_customer_residency_comm_details') {
      return '/savings/onboarding/address';
    }
    return `/${ urlToUse.substr(1, 7) }/${ urlToUse.substr(9, 100) }`;
  };

  return (
    <form className='container form-residency-communication' style={{ paddingLeft: 0 }} onSubmit={ handleSubmit }>
      <div className='communication-preferences'>
        <div className='radio-tax-buttons' style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 className='title' style={{ textAlign: 'left', paddingBottom: 30 }}>Are you a resident of the UK only?*</h2>
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
        <div className='radio-tax-buttons' style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 className='title' style={{ textAlign: 'left', paddingBottom: 30, paddingTop: 30 }}>Are you liable to pay tax in the UK only?*</h2>
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
          <h2 className='title' style={{ padding: 0, paddingTop: 30, width: 330 }}>What is your National Insurance number?*</h2>
          <div style={{ width: 320, paddingBottom: 30 }}>
            <Field
              name='ni_number'
              dataCy='input-ni-number'
              component={ TextField }
              validate={ [required] }
            />
          </div>
        </div>

      </div>
      <div className='row mb-4'>
        <div className='col'>
          <p>*Mandatory field</p>
        </div>
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
    </form>
  );
};

ResidencyAndCommunicationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  urlToUse: PropTypes.string,
  pageData: PropTypes.object,
};

ResidencyAndCommunicationForm.defaultProps = {
  urlToUse: '',
  pageData: {},
};

export default ResidencyAndCommunicationForm;
