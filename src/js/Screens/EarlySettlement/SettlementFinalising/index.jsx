import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormHOC from 'js/Store/hoc/FormContainer';

const FinalisingForm = () => {
  return (
    <div className='form-container' />
  );
};

class WithdrawalFinalising extends PureComponent {
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

export default FormHOC(WithdrawalFinalising, FinalisingForm, '/lending/account/management/early_settlement/finalising/');
