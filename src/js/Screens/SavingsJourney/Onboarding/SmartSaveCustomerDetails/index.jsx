import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AddressHC from 'js/Store/hoc/AddressHC';

class Address extends PureComponent {
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

export default AddressHC(Address, '/savings/smartsave_yourdetails/');
