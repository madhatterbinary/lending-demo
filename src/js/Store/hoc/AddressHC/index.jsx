import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import { reduxForm } from 'redux-form';
import Toast from 'js/Components/Toasts';
import Opacity from 'js/Components/Animations/Opacity';
import { modifyAddressArray } from 'js/Utils/formUtils';
import AddressForm from 'js/Components/JourneysForms/AddressForm.jsx';
import { validateAddresses } from './addressValidation.jsx';

export default function (Address, url) {
  const AddressFormWrapped = reduxForm({
    form: 'form-screen',
    validate: validateAddresses,
    enableReinitialize: true,
  })(AddressForm);

  const AddressHC = (props) => {
    const { options, initialValues, message, errorNumber, isError, currentStep, addresses } = useSelector(state => ({
      options: state.stepData.options,
      initialValues: state.stepData.initialData.addresses || [],
      message: (((state.stepData || {}).warning || {}).payload || {}).msg,
      errorNumber: (((state.stepData || {}).warning || {}).payload || {}).errcode,
      isError: (((state.stepData || {}).warning || {}).payload || {}).iserror,
      currentStep: state.stepData.pageData.current_step,
      addresses: ((((state || {}).form || {})['form-screen'] || {}).values || {}).addresses,
    }));

    const { loadStepDataPublic, submitStepDataCSRF } = useActions(actions);

    useEffect(() => {
      loadStepDataPublic(url);
    }, [addresses]);


    const { location } = props;

    return (
      <Fragment>
        { isError ? (
          <Toast
            message={ message }
            errorCode={ errorNumber }
            toastError={ isError }
          />
        ) : null }
        <Address>
          <Opacity speed={ 300 }>
            <div className='address-info-screen'>
              <h1
                className='mb-4'
                ref={ (el) => {
                  if (el) {
                    el.style.setProperty('margin-bottom', '50px', 'important');
                  }
                } }
              >Step 2 - Your address</h1>
              <div className='mb-3'>If you&apos;ve been in your current address for less than three years,<br />you&apos;ll need to provide us with your previous address details.</div>
              <AddressFormWrapped
                onSubmit={ (values) => {
                  if (location.pathname === '/lending/onboarding/address') {
                    submitStepDataCSRF(url, { addresses: modifyAddressArray(values.addresses) });
                  } else {
                    submitStepDataCSRF(url, values);
                  }
                } }
                options={ options }
                initialValues={{ addresses: initialValues.length ? initialValues : [{}] }}
                pathname={ location.pathname }
                currentStep={ currentStep }
                addresses={ addresses }
              />
            </div>
          </Opacity>
        </Address>
      </Fragment>
    );
  };

  AddressHC.propTypes = {
    location: PropTypes.object,
  };

  AddressHC.defaultProps = {
    location: {},
  };
  return AddressHC;
}
