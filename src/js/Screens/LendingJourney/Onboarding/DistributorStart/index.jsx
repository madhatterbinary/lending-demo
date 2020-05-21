import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormHOC from 'js/Store/hoc/FormContainer';
import Form from './DistributorStartForm';

class DistributorStart extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  };

  render() {
    const { children } = this.props;

    return (
      <div className='loan-edit-screen'>
        { children }
      </div>
    );
  }
}

export default FormHOC(DistributorStart, Form, null);
