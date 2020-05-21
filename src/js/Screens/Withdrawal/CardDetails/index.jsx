import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormHOC from 'js/Store/hoc/FormContainer';

import Form from 'js/Screens/Payment/CardDetails/CardDetailsForm';

class CardDetails extends PureComponent {
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

export default FormHOC(CardDetails, Form, '/lending/account/management/withdrawal/payment/', 'CURRENT_ADDRESS');
