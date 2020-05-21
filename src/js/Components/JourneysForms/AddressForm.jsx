import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray, Field } from 'redux-form';
import AddressesPanel from 'js/Components/AddressesPanel';

const AddressForm = (props) => {
  // Please ensure you click "Enable backend stubs"
  // for every screen you navigate to whe you click on
  // "Disable frontend autofill"
  const { handleSubmit, options, invalid, location, pathname, currentStep, addresses } = props;

  return (
    <form onSubmit={ handleSubmit }>
      {/* Hidden form field to assist with frontend validation of minimum amount of years lived in the UK */}
      <Field name='form_valid' component='input' type='hidden' />
      {/* Field Array allows multiple blocks of identical structure to be added to the form */}
      <FieldArray
        name='addresses'
        label='Address*'
        component={ AddressesPanel }
        options={ options }
        invalid={ invalid }
        location={ location }
        pathname={ pathname }
        currentStep={ currentStep }
        addresses={ addresses }
      />
    </form>
  );
};

AddressForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  options: PropTypes.object,
  invalid: PropTypes.bool,
  location: PropTypes.object,
  pathname: PropTypes.string,
  currentStep: PropTypes.string,
  addresses: PropTypes.object,
};

AddressForm.defaultProps = {
  invalid: null,
  options: {},
  location: {},
  pathname: '',
  currentStep: '',
  addresses: {},
};

export default AddressForm;
