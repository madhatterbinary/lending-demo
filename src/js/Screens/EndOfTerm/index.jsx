import React, { useEffect, Fragment } from 'react';
import TimelineNavigation from 'js/Components/TimelineNavigation';
import { savingsJourneyDefinition } from 'js/Definitions/savingsJourneyDefinition';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';

import EndOfTermChoices from 'js/Screens/EndOfTerm/Step1';
import ElectionSummary from 'js/Screens/EndOfTerm/Step2';
import ElectionPersonDetails from 'js/Screens/EndOfTerm/Step3';
import ElectionReinvestAmount from 'js/Screens/EndOfTerm/Step4';
import ElectionDocuments from 'js/Screens/EndOfTerm/Step5';
import EndOfTermSuccess from 'js/Screens/EndOfTerm/Step6';

const EndOfTerm = (props) => {
  const { pathname, pageData } = props;
  useEffect(() => {
  }, [pathname, pageData]);

  return (
    <Fragment>
      {/* Just for ease of jumping around */}
      <TimelineNavigation
        timelineItems={ savingsJourneyDefinition.servicing.endofterm }
        localmatch={ pathname }
      />

      <Switch>
        <Route path='/savings/servicing/endofterm' exact component={ EndOfTermChoices } />
        <Route path='/savings/servicing/endofterm/electionsummary' exact component={ ElectionSummary } />
        <Route path='/savings/servicing/endofterm/electionpersondetails' exact component={ ElectionPersonDetails } />
        <Route path='/savings/servicing/endofterm/electionreinvestamount' exact component={ ElectionReinvestAmount } />
        <Route path='/savings/servicing/endofterm/electiondocuments' exact component={ ElectionDocuments } />
        <Route path='/savings/servicing/endofterm/electionsuccess' exact component={ EndOfTermSuccess } />
      </Switch>
    </Fragment>
  );
};

EndOfTerm.propTypes = {
  pageData: PropTypes.object,
  pathname: PropTypes.string,
};

EndOfTerm.defaultProps = {
  pageData: {},
  pathname: '',
  settlementLoanHandler: () => {},
  confirmSettlementLoanHandler: () => {},
};

export default EndOfTerm;
