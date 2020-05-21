import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import { Link } from 'react-router-dom';
// import './DirectDebitMandate.scss';
import * as actionsGeneric from 'js/Store/Actions/generic';
import DirectDebit from 'js/assets/images/directdebit.png';
import Opacity from 'js/Components/Animations/Opacity';
import Spinner from 'js/Components/Spinner';

/*
  View direct debit details
  Information required from GET:
    data.page_data.name_on_account
    data.page_data.account_number
    data.page_data.sort_code
  Information submitted via POST:
    direct_debit_consent: true
*/

const DirectDebitMandate = () => {
  const { pageData, inWaitingRoom } = useSelector(state => ({
    pageData: state.stepData.pageData,
    inWaitingRoom: state.application.inWaitingRoom,
  }));

  const { loadStepDataPublic, submitStepDataCSRF } = useActions(actionsGeneric);

  useEffect(() => {
    loadStepDataPublic('/lending/directdebit/');
  }, [loadStepDataPublic]);

  if (inWaitingRoom) return <Spinner />;

  return (
    <Opacity speed={ 300 }>
      <div className='container'>
        <div className='row mb-5'>
          <div className='col'>
            <h1>Your Direct Debit details</h1>
          </div>
        </div>
        <div className='row mb-4'>
          <div className='col'>
            <div>Name</div>
            <div data-cy='info-name-on-account'><strong>{pageData.name_on_account}</strong></div>
          </div>
        </div>
        <div className='row mb-3'>
          <div className='col-4'>
            <div>Account number</div>
            <div data-cy='info-account-number'><strong>{pageData.account_number}</strong></div>
          </div>
          <div className='col-8'>
            <div>Sort code</div>
            <div data-cy='info-sort-code'><strong>{pageData.sort_code}</strong></div>
          </div>
        </div>
        {/* <div className='row'>
          <div className='col'><stron>Direct debit of £{} will be taken from your account on the {} of every month.</stron></div>
        </div> */}
        <div className='row mt-5'>
          <div className='col'>
            <div>
              <img src={ DirectDebit } alt='direct debit logo' />
            </div>
          </div>
          <div className='col text-right'>
            <Link to='/lending/onboarding/paymentdetails'>
              <button type='button' className='btn btn-outline-primary pr-4 mr-3'><i className='material-icons mr-1'>chevron_left</i>Back</button>
            </Link>

          </div>
          <div className='col text-right'>
            <button
              className='btn btn-primary'
              type='submit'
              onClick={ () => { submitStepDataCSRF('/lending/directdebit/', { direct_debit_consent: true }); } }
              data-cy='action-confirm-payment-details'
            >
              Confirm Direct Debit
            </button>
          </div>
        </div>
      </div>
    </Opacity>
  );
};

export default DirectDebitMandate;
