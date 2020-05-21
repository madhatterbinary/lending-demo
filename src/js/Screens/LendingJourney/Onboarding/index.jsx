import React, { PureComponent } from 'react';
// import './UserInformation.scss';
import { Route, Switch } from 'react-router-dom';
import TimelineNavigation from 'js/Components/TimelineNavigation';
import LoanPanel from 'js/Components/LoanPanel';

import { lendingJourneyDefinition } from 'js/Definitions/lendingJourneyDefinition';
import { lendingAppURLs } from 'js/Utils/urlMapper';

import Expenses from './Expenses';
import Address from './Address';
import Details from './Details';
import ChooseLoan from './ChooseLoan';
import VerifyIdentity from './VerifyIdentity';
import PartialMatchVerification from './PartialMatchVerification';
import VerifyEmail from './VerifyEmail';
import PaymentDetails from './PaymentDetails';
import DirectDebitMandate from './DirectDebitMandate';
import DirectDebitConfirmation from './DirectDebitConfirmation';
import SignYourDocuments from './SignYourDocuments';
import DistributorStart from './DistributorStart';
import UserInputOverview from './UserInputOverview';

class Onboarding extends PureComponent {
  state = {
    localmatch: null,
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (prevState.localmatch !== nextProps.location.pathname) {
      return {
        localmatch: nextProps.location.pathname,
      };
    }
    return null;
  }

  render() {
    const { localmatch } = this.state;
    const distUrls = [
      lendingAppURLs.cs_start(),
      lendingAppURLs.noddle_start(),
      lendingAppURLs.totally_money_start(),
      lendingAppURLs.totally_money_web_start(),
      lendingAppURLs.experian_generic_start(),
      lendingAppURLs.confused_start(),
      lendingAppURLs.accepty_start(),
      lendingAppURLs.msm_start(),
      lendingAppURLs.monevo_start(),
      lendingAppURLs.mse_start(),
      lendingAppURLs.ctm_start(),
      lendingAppURLs.freedom_finance_asda_start(),
      lendingAppURLs.freedom_finance_start(),
      lendingAppURLs.money_guru_start(),
      lendingAppURLs.loans_warehouse_start(),
    ];
    /// second time
    return (
      <div className='user-information-timeline'>
        <LoanPanel />
        <TimelineNavigation
          timelineItems={ lendingJourneyDefinition.onboarding.details }
          localmatch={ localmatch }
        />
        <Switch>
          {/* Distributions Start */}
          <Route path={ distUrls } component={ DistributorStart } />
          {/* Person details */}
          <Route path={ lendingAppURLs.personal_details() } exact component={ Details } />
          <Route path={ lendingAppURLs.contact_details() } exact component={ Address } />
          <Route path={ lendingAppURLs.credit_reference() } exact component={ Expenses } />
          {/* Validation details */}
          <Route path={ lendingAppURLs.product_offer() } exact component={ ChooseLoan } />
          <Route path={ lendingAppURLs.id_verification() } component={ VerifyIdentity } />

          <Route path={ lendingAppURLs.user_security_questions() } component={ PartialMatchVerification } />
          <Route path={ lendingAppURLs.user_input_overview() } component={ UserInputOverview } />
          <Route path={ lendingAppURLs.verify_email() } component={ VerifyEmail } />
          <Route path={ lendingAppURLs.loan_and_payment() } component={ PaymentDetails } />
          <Route path={ lendingAppURLs.direct_debit_mandate() } component={ DirectDebitMandate } />
          <Route path={ lendingAppURLs.direct_debit_confirmation() } component={ DirectDebitConfirmation } />
          <Route path={ lendingAppURLs.documents_and_agreement() } component={ SignYourDocuments } />
        </Switch>
      </div>
    );
  }
}

export default Onboarding;
