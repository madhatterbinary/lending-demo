// eslint-disable-next-line no-unused-vars
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormHOC from 'js/Store/hoc/FormContainer';
import Form from './CardDetailsForm';

// import 'js/Screens/Payment/CardDetailsPayment.scss';

class CardDetails extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  };

  render() {
    const { children } = this.props;
    return children;
  }
}

export default FormHOC(CardDetails, Form, '/lending/account/management/payment/start/', 'CURRENT_ADDRESS');
