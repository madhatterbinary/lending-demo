/* eslint-disable no-irregular-whitespace */
import React, { Fragment } from 'react';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import { useSelector } from 'react-redux';
import Opacity from 'js/Components/Animations/Opacity';

const ContinueWithdrawal = () => {
  const continueJourneyType = localStorage.getItem('continueJourneyType');
  const { loadStepDataPublic } = useActions(actions);
  const { pageData } = useSelector(state => ({
    pageData: state.stepData.pageData,
  }));

  if (!pageData || !pageData.loans || !pageData.loans.length) return null;
  const activeLoan = pageData.loans[0];

  return (
    <Opacity speed={ 300 }>
      <div className='continue-journey-info'>
        <div className='continue-journey-info-content' style={{ maxWidth: 600 }}>
          <div className='info-header'>
            <h1 className='info' style={{ marginBottom: 50 }}>Continue</h1>
          </div>
          <Fragment>
            <p style={{ lineHeight: 1.5 }}>You&apos;ve withdrawn from your loan agreement.
              You&apos;re obliged to settle your loan balance within 30 days, from the day after you gave us notice.</p>
            <p style={{ marginBottom: 50 }}>Please make your payment of <span style={{ color: '#e83d52', fontWeight: 700, fontSize: '1.5em' }}>£{Number(activeLoan.current_capital_balance).toFixed(2)}</span></p>
          </Fragment>
          <button
            className='button primary'
            type='button'
            onClick={ () => { loadStepDataPublic(`/${ continueJourneyType }`); } }
            data-cy='action-go-to-overview'
          >
            Continue your right to withdrawal
          </button>
        </div>
      </div>
    </Opacity>
  );
};
export default ContinueWithdrawal;
