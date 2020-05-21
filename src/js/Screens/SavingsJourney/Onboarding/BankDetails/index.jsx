import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormHOC from 'js/Store/hoc/FormContainer';
import Form from './BankDetailsForm';

class BankDetails extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  };

  render() {
    const { children } = this.props;

    return (
      <div className='start-savings-screen'>
        { children }
      </div>
    );
  }
}

//export default FormHOC(StartSavingsApplication, Form, '/lending/i_want_a_loan/');

export default FormHOC(BankDetails, Form, '/savings/deposit/');
