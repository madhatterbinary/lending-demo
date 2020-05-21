import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InboxHC from 'js/Store/hoc/InboxHC';

class Inbox extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
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

export default InboxHC(Inbox, 'lending');
