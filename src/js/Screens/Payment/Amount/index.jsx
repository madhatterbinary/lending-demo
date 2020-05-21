import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormHOC from 'js/Store/hoc/FormContainer';

import Form from './AmountForm';
import './Payment.scss';

class Amount extends PureComponent {
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

export default FormHOC(Amount, Form, '/lending/manage/');
