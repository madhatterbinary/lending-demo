import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormHOC from 'js/Store/hoc/FormContainer';
import Spinner from 'js/Components/Spinner';

const FinalisingForm = () => {
  return <Spinner />;
};

class PaymentFinalising extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  };

  render() {
    const { children } = this.props;
    return (
      <div className='payment-finalising-screen'>
        { children }
      </div>
    );
  }
}

export default FormHOC(PaymentFinalising, FinalisingForm, '/lending/account/management/payment/finalising/');
