import React, { useEffect } from 'react';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import Spinner from 'js/Components/Spinner';

const OverpaymentStart = () => {
  const { loadStepDataPublic } = useActions(actions);

  useEffect(() => {
    loadStepDataPublic('customer_start_journey/?n=OVERPAYMENT_JOURNEY');
  }, []);
  return <Spinner />;
};

export default OverpaymentStart;
