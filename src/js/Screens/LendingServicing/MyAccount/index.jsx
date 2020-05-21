import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AccountHOC from 'js/Store/hoc/Accounts';

class LendingAccount extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: React.ReactNode,
  };

  render() {
    const { children } = this.props;
    return (
      <div className='servicing-bg'>
        { children }
      </div>
    );
  }
}

export default AccountHOC(LendingAccount, 'lending');
