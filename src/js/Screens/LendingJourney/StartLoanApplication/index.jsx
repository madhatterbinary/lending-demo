import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import FormHOC from 'js/Store/hoc/FormContainer';
import Form from './StartLoanApplicationForm';

function StartLoanApplication(props) {
  const { children } = props;
  const { message } = useSelector(state => ({
    message: (((state.stepData || {}).warning || {}).payload || {}).msg,
  }));
  const { appWarningsErrors } = useActions(actions);

  useEffect(() => {
    if (message) {
      appWarningsErrors(null, null, false);
    }
  }, []);

  return (
    <div>
      <div className='start-loan-banner d-flex align-items-center'>
        <div className='container' style={{ paddingRight: 0, paddingLeft: 0 }}>
          <div
            className='ml-4 pl-5 pt-4 pb-4 lending-title-container'
            ref={ (el) => {
              if (el) {
                el.style.setProperty('margin-left', '0rem', 'important');
              }
            } }
          >
            <div className='lending-title'>personalised loan rates</div>
            <div className='lending-sub-title'>in just 3 simple steps</div>
          </div>
        </div>
      </div>
      <div className='container' style={{ paddingRight: 0, paddingLeft: 0 }}>
        { children }
      </div>
    </div>
  );
}

StartLoanApplication.propTypes = {
  children: PropTypes.node,
};

StartLoanApplication.defaultProps = {
  children: null,
};

export default FormHOC(StartLoanApplication, Form, '/lending/i_want_a_loan/');
