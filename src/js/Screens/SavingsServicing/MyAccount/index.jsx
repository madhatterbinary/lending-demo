import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AccountHOC from 'js/Store/hoc/Accounts';

class SavingsAccount extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  };

  render() {
    const { children } = this.props;
    return (
      <div className='accounts-screen'>
        { children }
      </div>
    );
  }
}

export default AccountHOC(SavingsAccount, 'savings');
