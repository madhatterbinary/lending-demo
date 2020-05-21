import React, { useEffect } from 'react';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import PropTypes from 'prop-types';
import * as actions from 'js/Store/Actions/generic';
import moment from 'moment';
import queryString from 'query-string';
import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();

const InitialLoad = (props) => {
  const { loadStepDataPublic } = useActions(actions);

  useEffect(() => {
    const { location } = props;
    const locationParams = queryString.parse(location.search);
    if (locationParams.tok) {
      loadStepDataPublic(`/${ env.REACT_APP_START_JOURNEY_ENDPOINT }/?tok=${ locationParams.tok }`);
    } else {
      // Either take params from the query string (coming from public website)
      // Or generate them with defaults (now() time and FSR1 product)   SAVINGS_JOURNEY SMARTSAVE_JOURNEY
      loadStepDataPublic(
        '/savings/start?'
                  + `product_code=${ locationParams.product_code || 'FRS1' }&`
                  + `privacy_policy=${ locationParams.privacy_policy || moment().format('YYYY-MM-DDThh:mm:ss+00:00') }&`
                  + `fscs_information_sheet=${ locationParams.fscs_information_sheet || moment().format('YYYY-MM-DDThh:mm:ss+00:00') }&`
                  + `summary_box=${ locationParams.summary_box || moment().format('YYYY-MM-DDThh:mm:ss+00:00') }&`
                  + `terms_conditions=${ locationParams.terms_conditions || moment().format('YYYY-MM-DDThh:mm:ss+00:00') }&`
                  + 'n=SAVINGS_JOURNEY'
      );
    }
  }, []);
  return <div className='start-savings-screen'>&nbsp;</div>;
};

InitialLoad.propTypes = {
  location: PropTypes.object,
};

InitialLoad.defaultProps = {
  location: {},
};

export default InitialLoad;
