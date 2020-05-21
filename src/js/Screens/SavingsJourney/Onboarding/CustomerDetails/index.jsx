import React, { useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import Toast from 'js/Components/Toasts';
import PropTypes from 'prop-types';
import AuthWrapper from 'js/Screens/Authentication';
import FormHOC from 'js/Store/hoc/FormContainer';
import Form from 'js/Components/JourneysForms/DetailsForm';

function Details(props) {
  const { children } = props;
  const { ageError, errorNumber, isError } = useSelector(state => ({
    ageError: (((state.stepData || {}).warning || {}).payload || {}).msg,
    errorNumber: (((state.stepData || {}).warning || {}).payload || {}).errcode,
    isError: (((state.stepData || {}).warning || {}).payload || {}).iserror,
  }));
  useEffect(() => {
  }, [ageError]);

  return (
    <Fragment>
      { ageError ? (
        <Toast
          message={ ageError }
          errorCode={ errorNumber }
          toastError={ isError }
        />
      ) : null }
      <div className='container'>
        <div className='row'>
          <div className='col mb-5'>
            <h1>Step 1 - Your details</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <div>You need to be over 18 years old, be a UK resident with 2 years’ address history, and earn over £12,000 a year.</div>
          </div>
        </div>
        <div className='row'>
          <div className='col mb-3'>
            <div style={{ lineHeight: 3 }}>
              I&apos;m an existing customer&nbsp;<AuthWrapper login textOnly />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            { children }
          </div>
        </div>
      </div>
    </Fragment>
  );
}

Details.propTypes = {
  children: PropTypes.node,
};

Details.defaultProps = {
  children: null,
};

export default FormHOC(Details, Form, '/savings/your_details/');
