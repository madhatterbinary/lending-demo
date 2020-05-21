import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ContactUsHC from 'js/Store/hoc/ContactUsHC';

class ContactUs extends PureComponent {
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

export default ContactUsHC(ContactUs, 'savings');
