import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AddressHC from 'js/Store/hoc/AddressHC';
import LendingFeatures from 'js/Screens/LendingJourney/LendingFeatures';

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
      <div className='container'>
        <div className='row'>
          <div className='col'>{ children }</div>
        </div>
        <div className='row'>
          <div className='col'>
            <LendingFeatures />
          </div>
        </div>
      </div>
    );
  }
}

export default AddressHC(Address, '/lending/address/');
