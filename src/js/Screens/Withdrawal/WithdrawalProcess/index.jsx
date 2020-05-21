import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormHOC from 'js/Store/hoc/FormContainer';
import Spinner from 'js/Components/Spinner';

const ProcessingForm = () => {
  return <Spinner />;
};

class WithdrawalProcess extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  };

  render() {
    const { children } = this.props;
    return (
      <div className='payment-processing-screen'>
        { children }
      </div>
    );
  }
}

export default FormHOC(WithdrawalProcess, ProcessingForm, '/lending/account/management/payment/processing/');
