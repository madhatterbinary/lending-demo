// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormHOC from 'js/Store/hoc/FormContainer';
import Form from './PaymentDetailsForm';

class PaymentDetails extends Component {
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

export default FormHOC(PaymentDetails, Form, '/lending/payment/');
