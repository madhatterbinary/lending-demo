import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormHOC from 'js/Store/hoc/FormContainer';
import Form from './SignDocsForm';


class SignYourDocuments extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  };

  render() {
    const { children } = this.props;
    return (
      <div className='sign-your-documents-screen'>
        { children }
      </div>
    );
  }
}

export default FormHOC(SignYourDocuments, Form, '/lending/documents/');
