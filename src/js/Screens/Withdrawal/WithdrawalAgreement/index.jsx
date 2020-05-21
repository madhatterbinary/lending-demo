import React, { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import './WithdrawalAgreement.scss';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import 'react-tabs/style/react-tabs.css';
import Spinner from 'js/Components/Spinner';
import Form from './WithdrawalAgreementForm';

moment.suppressDeprecationWarnings = true;

const WithdrawalAgreementFormWrapped = reduxForm({
  form: 'form-screen',
  enableReinitialize: true,
})(Form);


const WithdrawalAgreement = () => {
  const { pageData, formData } = useSelector(state => ({
    pageData: state.stepData.pageData,
    formData: state.stepData.formData,
  }));

  const [withdrawing, setWithdrawing] = useState(false);

  const { loadStepDataPublic, submitStepDataCSRF } = useActions(actions);

  useEffect(() => {
    loadStepDataPublic('/lending/account/management/withdrawal/agreement/');
  }, []);

  const withdrawalAgreementHandler = (values) => {
    setWithdrawing(true);
    submitStepDataCSRF('/lending/account/management/withdrawal/agreement/', values);
  };
  // eslint-disable-next-line no-restricted-globals
  if (!pageData || !formData || isNaN(Number(pageData.SETTLEMENT_AMOUNT)) || withdrawing) {
    return <Spinner />;
  }
  return (
    <Fragment>
      <div className='container red-box mt-4'>
        <div className='row'>
          <div className='col pt-2' style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
            <h3 className='title'>Final loan payment</h3>
            <i className='fas fa-money-bill-alt' style={{ color: '#E83D52', fontSize: '1.8em' }} />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <div className='red-line' />
          </div>
        </div>
        <div className='col' style={{ paddingRight: 0, paddingLeft: 0, paddingTop: 15 }}>
          <div className='pt-3 pb-3 mb-3'>
            <div className='row'>
              <div className='col m4-3'>
                <div className='row'>
                  <div className='col pt-3'>
                    Are you sure you want to make this payment for:
                  </div>
                </div>
                <div style={{ marginTop: 35, fontSize: '1.5em', width: '100%', textAlign: 'center' }}>
                  <strong>{`£${ Number(pageData.SETTLEMENT_AMOUNT).toFixed(2) }`}</strong>
                </div>
              </div>
              <hr />
              <div className='col ml-3' style={{ paddingLeft: 0 }}>
                <div className='container m-0 p-0'>
                  <div className='col' style={{ paddingRight: 0, paddingLeft: 0 }}>
                    <WithdrawalAgreementFormWrapped
                      setWithdrawing={ setWithdrawing }
                      onSubmit={ (values) => withdrawalAgreementHandler(values) }
                      initialValues={{ 'withdrawal_agreement': null }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default WithdrawalAgreement;
