import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormHOC from 'js/Store/hoc/FormContainer';

import Form from './RedirectForm';

class PaymentRedirect extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  };

  render() {
    const { children } = this.props;
    return (
      <div className='payment-redirect-screen'>
        { children }
      </div>
    );
  }
}

export default FormHOC(PaymentRedirect, Form, '/lending/account/management/payment/redirect/');
