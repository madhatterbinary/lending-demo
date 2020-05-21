/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import PropTypes from 'prop-types';
import * as actionsApp from 'js/Store/Actions/application';
import * as actions from 'js/Store/Actions/generic';
import queryString from 'query-string';

/*
  Journeys need to be initialised in order for the backend to generate the session and start storing data
  This component will hit the required endpoint in order to start a journey and expect the backend to point to the correct next step.
  Inputs: UUID via url paramater: /lending/continuejourney/:uuid
*/

const InitialLoad = (props) => {
  const { appStart, appContinue, appStartDistributions } = useActions(actionsApp);
  const { appWarningsErrors } = useActions(actions);

  useEffect(() => {
    const { location } = props;

    const locationParams = queryString.parse(location.search);
    const { jwt, tok, n, loan_amount, term_in_months, f } = locationParams;

    // Do a GET request in order to initialize the journey and retreive CSRF token used for the steps of the journey
    // If the initial URL contains a session UUID for continuing the journey, it will bebgrabbed and passed to the backend.
    // If UUID does not exist, it will start a new session

    if (loan_amount && term_in_months && n && f) {
      // D2C
      actions.loadStepDataPublic(`/customer_start_public?loan_amount=${ loan_amount }&term_in_months=${ term_in_months }&n=${ n }&f=${ f }`);
    }

    if (jwt || tok) {
      if (jwt) {
        appStartDistributions(jwt);
      }

      if (tok) {
        appContinue(tok);
      }
    } else {
      appStart(n);
    }
    appWarningsErrors(null, null, false);
  }, []);
  // Display nothing while session gets started on backend
  return <div className='start-lending-screen'>&nbsp;</div>;
};

InitialLoad.propTypes = {
  location: PropTypes.object,
};

InitialLoad.defaultProps = {
  location: {},
};

export default InitialLoad;
