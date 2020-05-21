import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormHOC from 'js/Store/hoc/FormContainer';

import Form from 'js/Screens/Payment/CardDetails/CardDetailsForm';

import 'js/Screens/Payment/CardDetailsPayment.scss';

class EarlySettlementCardDetails extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  };

  render() {
    const { children } = this.props;
    return (
      <div className='payment-amount-screen'>
        { children }
      </div>
    );
  }
}

export default FormHOC(EarlySettlementCardDetails, Form, '/lending/account/management/early_settlement/start/', 'CURRENT_ADDRESS');
