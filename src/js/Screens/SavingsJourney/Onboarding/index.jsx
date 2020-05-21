import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import SavingsPanel from 'js/Components/SavingsPanel';
import TimelineNavigation from 'js/Components/TimelineNavigation';
import { savingsJourneyDefinition } from 'js/Definitions/savingsJourneyDefinition';
import { savingsAppURLs } from 'js/Utils/urlMapper';
import PartialMatchVerification from './PartialMatchVerification';
import SmartSaveCustomerDetails from './SmartSaveCustomerDetails';
import CustomerDetails from './CustomerDetails';
import Address from './Address';
import ResidencyAndCommunication from './ResidencyAndCommunication';
import VerifyEmail from './VerifyEmail';
import BankDetails from './BankDetails';

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

  // savings-user-information-timeline
  render() {
    const { localmatch } = this.state;

    return (
      <div
        className='onboarding-bg pt-4 savings'
        ref={ (el) => {
          if (el) {
            el.style.setProperty('padding-top', '0rem', 'important');
          }
        } }
      >
        { localmatch === '/savings/termsandconditions'
          || localmatch === '/savings/onboarding/details'
          || localmatch === '/savings/onboarding/address'
          || localmatch === '/savings/onboarding/residencyandcommunication'
          || localmatch === '/savings/signup'
          || localmatch === '/savings/onboarding/verifyemail'
          || localmatch === '/savings/servicing/securityquestions'
          || localmatch === '/savings/onboarding/bankdetails'
          || localmatch === '/savings/servicing/endofterm/electionreinvestamount'
          ? <SavingsPanel /> : null
        }
        <TimelineNavigation
          timelineItems={ savingsJourneyDefinition.onboarding.details }
          localmatch={ localmatch }
        />

        <Switch>
          <Route path={ savingsAppURLs.smartsave_customer_details() } exact component={ SmartSaveCustomerDetails } />
          <Route path={ savingsAppURLs.savings_customer_person_details() } exact component={ CustomerDetails } />
          <Route path={ savingsAppURLs.savings_customer_address_details() } exact component={ Address } />
          <Route path={ savingsAppURLs.savings_customer_residency_comm_details() } exact component={ ResidencyAndCommunication } />
          {/* Validation details */}
          <Route path={ savingsAppURLs.verify_email() } component={ VerifyEmail } />
          <Route path={ savingsAppURLs.user_security_questions() } component={ PartialMatchVerification } />
          <Route path={ savingsAppURLs.savings_details() } exact component={ BankDetails } />
        </Switch>
      </div>
    );
  }
}

export default Onboarding;
