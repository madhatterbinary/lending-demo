import React, { Component } from 'react';
import './ElectionDocuments.scss';
import PropTypes from 'prop-types';
import FormHOC from 'js/Store/hoc/FormContainer';
import Form from './ElectionDocumentsForm';

class ElectionDocuments extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  };

  render() {
    const { children } = this.props;

    return (
      <div className='expenses-info-screen'>
        { children }
      </div>
    );
  }
}

export default FormHOC(ElectionDocuments, Form, '/savings/election_journey/documents/');
