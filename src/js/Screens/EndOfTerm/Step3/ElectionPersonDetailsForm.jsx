import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { Field, FieldArray } from 'redux-form';
import { Field, change } from 'redux-form';
import moment from 'moment';
// import SelectField from 'js/Components/Forms/SelectField';
// import TextField from 'js/Components/Forms/TextField';

// import { required, phoneNumber, alphaNumeric, maxLength15, minLength2 } from 'js/Validation';
// import { generateOptionsList } from 'js/Utils/formUtils';
// import AddressesPanel from 'js/Components/AddressesPanel';

// const capitalize = (str) => {
//   return str.charAt(0).toUpperCase() + str.substr(1);
// };

const ElectionPersonDetailsForm = props => {
  const { handleSubmit, formData, dispatch } = props;
  if ((!formData || {}).first_name) return <p>Missing person data</p>;

  useEffect(() => {
    dispatch(change('form-screen', 'date_of_birth', (formData || {}).date_of_birth));
    dispatch(change('form-screen', 'email_address', (formData || {}).email_address));
    dispatch(change('form-screen', 'first_name', (formData || {}).first_name));
    dispatch(change('form-screen', 'last_name', (formData || {}).last_name));
    dispatch(change('form-screen', 'phone_number', (formData || {}).phone_number));
    ((formData || {}).addresses || []).map((addr) => {
      dispatch(change('form-screen', 'addresses[0].ptcabs', addr.ptcabs));
      dispatch(change('form-screen', 'addresses[0].building', addr.building));
      dispatch(change('form-screen', 'addresses[0].line_1', addr.line_1));
      dispatch(change('form-screen', 'addresses[0].line_2', addr.line_2));
      dispatch(change('form-screen', 'addresses[0].post_town', addr.post_town));
      dispatch(change('form-screen', 'addresses[0].postcode', addr.postcode));
      return null;
    });
  }, []);
  // Form will be disabled for time being. It needs to be turned back on when we allow details editing
  return (
    <Fragment>
      <form className='container details-form form-container' style={{ paddingRight: 0 }} onSubmit={ handleSubmit }>

        <div className='form-container'>
          <h2 style={{ color: '#E83D52', marginBottom: 15, marginTop: 20 }}>Your personal details</h2>
          <div className='container red-box d-flex flex-column' style={{ alignSelf: 'center', maxWidth: 990 }}>
            <p style={{ marginTop: 10, fontSize: '1.3em' }}><strong>{(formData || {}).title} {(formData || {}).first_name} {(formData || {}).last_name}</strong></p>
            <div>Email: <strong>ulysses+2834654284354@yobota.uk</strong></div>
            <div style={{ marginBottom: 15, marginTop: 5 }}>Phone number: <strong>{(formData || {}).phone_number}</strong></div>
          </div>
        </div>
        <div className='form-container'>
          <h2 style={{ color: '#E83D52', marginBottom: 15, marginTop: 20 }}>Your addresses</h2>
          <div className='container red-box d-flex flex-column' style={{ alignSelf: 'center', maxWidth: 990 }}>
            {((formData || {}).addresses || []).map((addr) => (
              <Fragment key={ addr.ptcabs }>
                <div style={{ marginTop: 10 }}><strong>{addr.building}, {addr.line_1}, {addr.line_2}, { addr.post_town } { addr.postcode }</strong></div>
                <div style={{ marginBottom: 15, marginTop: 5 }}>{ moment(addr.move_in_date).format('ll') } - present</div>

              </Fragment>
            ))}
          </div>
        </div>

        {/* Details form */}
        {/* <Field
          name='title'
          dataCy='input-title'
          label='Title*'
          type='hidden'
          component={ SelectField }
          options={ generateOptionsList(options.title || []) }
          validate={ required }
        />
        <Field
          name='first_name'
          dataCy='input-first-name'
          label='First name*'
          component={ TextField }
          type='hidden'
          validate={ [required, maxLength15, minLength2] }
          normalize={ capitalize }
          warn={ alphaNumeric }
        />
        <Field
          name='last_name'
          dataCy='input-last-name'
          component={ TextField }
          label='Last name*'
          type='hidden'
          validate={ [required, maxLength15, minLength2] }
          normalize={ capitalize }
          warn={ alphaNumeric }
        />

        <Field
          name='phone_number'
          dataCy='input-phone-number'
          label='Phone number*'
          component={ TextField }
          type='hidden'
          validate={ [required, phoneNumber] }
          normalize={ capitalize }
        /> */}

        {/* Address form */}
        {/* <div className='form-row'>
          <h1>Addresses</h1>
        </div> */}
        {/* Hidden form field to assist with frontend validation of minimum amount of years lived in the UK */}
        {/* <Field name='form_valid' component='input' type='hidden' /> */}
        {/* Field Array allows multiple blocks of identical structure to be added to the form */}
        {/* <FieldArray
          name='addresses'
          label='Address*'
          component={ AddressesPanel }
          invalid={ invalid }
          options={ options }
        /> */}

        {/* Residency and comms form */}
        <div className='communication-preferences'>
          <h2 style={{ color: '#E83D52', marginBottom: 15, marginTop: 20 }}>Residency information</h2>
          <div className='container red-box d-flex flex-column' style={{ alignSelf: 'center', maxWidth: 990, paddingRight: 0 }}>
            <div className='radio-tax-buttons' style={{ display: 'flex', flexDirection: 'column' }}>
              <p className='title' style={{ textAlign: 'left', marginTop: 10 }}><strong>Are you a resident of the UK only?*</strong></p>
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
              <p className='title' style={{ textAlign: 'left', marginTop: 10 }}><strong>Are you liable to pay taxes in the UK only?*</strong></p>
              <div className='radio-inputs' style={{ display: 'flex', marginBottom: 10 }}>
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
          </div>
        </div>

        <div style={{ marginTop: 50, textAlign: 'end' }}>
          <button className='btn btn-primary' type='submit' data-cy='action-agree-to-communication-preferences'>Continue</button>
        </div>
      </form>
    </Fragment>
  );
};

ElectionPersonDetailsForm.propTypes = {
  formData: PropTypes.object.isRequired,
  // invalid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func,
};

ElectionPersonDetailsForm.defaultProps = {
  dispatch: null,
};

export default ElectionPersonDetailsForm;
