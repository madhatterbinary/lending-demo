/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import PaymentProcess from 'js/Screens/Payment/PaymentProcess';
import PaymentCompelted from 'js/Screens/Payment/PaymentCompleted';
import PaymentFinalising from 'js/Screens/Payment/PaymentFinalising';
import PaymentRedirect from 'js/Screens/Payment/PaymentRedirect';
import CardDetails from 'js/Screens/Payment/CardDetails';
import OverpaymentStart from 'js/Screens/Payment/OverpaymentStart';
import WithdrawalCardDetails from 'js/Screens/Withdrawal/CardDetails';
import WithdrawalRedirect from 'js/Screens/Withdrawal/WithdrawalRedirect';
import WithdrawalProcess from 'js/Screens/Withdrawal/WithdrawalProcess';
import WithdrawalCompelted from 'js/Screens/Withdrawal/WithdrawalCompleted';
import WithdrawalFinalising from 'js/Screens/Withdrawal/WithdrawalFinalising';
import WithdrawalAgreement from 'js/Screens/Withdrawal/WithdrawalAgreement';
import EarlySettlementCardDetails from 'js/Screens/EarlySettlement/EarlySettlementCardDetails';
import SettlementRedirect from 'js/Screens/EarlySettlement/SettlementRedirect';
import SettlementCompleted from 'js/Screens/EarlySettlement/SettlementCompleted';
import SettlementFinalising from 'js/Screens/EarlySettlement/SettlementFinalising';

import MakePayment from './MakePayment';

let continueJourneyName = '';
let journeyType = '';

const ManageLoan = (props) => {
  const { location: { pathname } } = props;
  const { pageData, formData, message, errorNumber, isError, journeyName } = useSelector(state => ({
    pageData: state.stepData.pageData,
    formData: state.stepData.formData,
    message: (((state.stepData || {}).warning || {}).payload || {}).msg,
    errorNumber: (((state.stepData || {}).warning || {}).payload || {}).errcode,
    isError: (((state.stepData || {}).warning || {}).payload || {}).iserror,
    journeyName: state.stepData.pageData.settlement_journey_name,

  }));

  const { submitStepDataCSRF, appWarningsErrors } = useActions(actions);
  const [journeyTypeUpdate, setJourneyTypeUpdate] = useState('');
  const propsData = { pageData, formData, submitStepDataCSRF, message, errorNumber, isError, appWarningsErrors, pathname, journeyTypeUpdate };
  /// RIGHT_TO_WITHDRAWAL_JOURNEY-EARLY_SETTLEMENT_JOURNEY

  useEffect(() => {
    if (journeyName !== undefined) {
      journeyType = journeyName === 'right_to_withdrawal_journey' ? 'customer_start_journey/?n=RIGHT_TO_WITHDRAWAL_JOURNEY' : 'customer_start_journey/?n=EARLY_SETTLEMENT_JOURNEY';
      localStorage.setItem('continueJourneyName', journeyName);
      localStorage.setItem('continueJourneyType', journeyType);
      setJourneyTypeUpdate(journeyType);
    }
  }, [journeyType, pathname, journeyTypeUpdate, journeyName]);

  continueJourneyName = localStorage.getItem('continueJourneyName');
  if (pathname === '/lending/account/management/earlysettlement/payment/'
       || pathname === '/lending/account/management/withdrawal/payment/'
       || pathname === '/lending/servicing/manageloan/withdrawal/carddetails'
       || pathname === '/lending/servicing/manageloan/withdrawal/redirect'
       || pathname === '/lending/servicing/manageloan/withdrawal/processing'
       || pathname === '/lending/servicing/manageloan/withdrawal/finalising'
       || pathname === '/lending/servicing/manageloan/withdrawal/completed'
       || pathname === '/lending/servicing/manageloan/earlysettlement/carddetails'
       || pathname === '/lending/servicing/manageloan/earlysettlement/redirect'
       || pathname === '/lending/servicing/manageloan/earlysettlement/finalising'
       || pathname === '/lending/servicing/manageloan/earlysettlement/completed'
       || pathname === '/lending/servicing/manageloan/earlysettlement/carddetails'
       || pathname === '/lending/servicing/manageloan/earlysettlement/redirect'
       || pathname === '/lending/servicing/manageloan/earlysettlement/finalising'
       || pathname === '/lending/servicing/manageloan/earlysettlement/completed') {
    localStorage.setItem('disableManageLoan', 'disabled');
    localStorage.setItem('loanClosed', true);
    localStorage.setItem('disableMenu', true);
  }
  if (pathname === '/lending/servicing/manageloan/withdrawal/carddetails' || pathname === '/lending/servicing/manageloan/earlysettlement/carddetails') {
    localStorage.setItem('pathnameCloseLoan', pathname);
  }
  if (pathname === '/lending/servicing/manageloan/withdrawal/completed' || pathname === '/lending/servicing/manageloan/earlysettlement/completed') {
    localStorage.removeItem('pathnameCloseLoan');
  }


  return (
    <div className='servicing-bg'>
      <div
        className='container mt-4'
        ref={ (el) => {
          if (el) {
            el.style.setProperty('margin-top', '0px', 'important');
          }
        } }
      >
        <div className='row'>
          <div className='col'>
            <Switch>
              <Route path='/lending/servicing/manageloan/makepayment' exact render={ () => <MakePayment props={ propsData } /> } />
              <Route path='/lending/servicing/manageloan' exact render={ () => <MakePayment props={ propsData } /> } />
              <Route path='/lending/servicing/manageloan/payment/overpaymentstart' component={ OverpaymentStart } />
              <Route path='/lending/servicing/manageloan/payment/carddetails' component={ CardDetails } />
              <Route path='/lending/servicing/manageloan/payment/redirect' component={ PaymentRedirect } />
              <Route path='/payment/processing' component={ PaymentProcess } />
              <Route path='/lending/servicing/manageloan/payment/finalising' component={ PaymentFinalising } />
              <Route path='/lending/servicing/manageloan/payment/completed' component={ PaymentCompelted } />
              <Route path='/lending/servicing/manageloan/withdrawal/agreement' exact component={ WithdrawalAgreement } />
              <Route path='/lending/servicing/manageloan/withdrawal/carddetails' component={ WithdrawalCardDetails } />
              <Route path='/lending/servicing/manageloan/withdrawal/redirect' component={ WithdrawalRedirect } />
              <Route path='/payment/processing' component={ WithdrawalProcess } />
              <Route path='/lending/servicing/manageloan/withdrawal/finalising' component={ WithdrawalFinalising } />
              <Route path='/lending/servicing/manageloan/withdrawal/completed' component={ WithdrawalCompelted } />
              <Route path='/lending/servicing/manageloan/earlysettlement/carddetails' exact component={ EarlySettlementCardDetails } />
              <Route path='/lending/servicing/manageloan/earlysettlement/redirect' component={ SettlementRedirect } />
              <Route path='/lending/servicing/manageloan/earlysettlement/finalising' component={ SettlementFinalising } />
              <Route path='/lending/servicing/manageloan/earlysettlement/completed' component={ SettlementCompleted } />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

ManageLoan.propTypes = {
  location: PropTypes.object,
};

ManageLoan.defaultProps = {
  location: {},
};

export default ManageLoan;
