import React, { Component } from 'react';
import './ElectionPersonDetails.scss';
import PropTypes from 'prop-types';
import FormHOC from 'js/Store/hoc/FormContainer';
import Form from './ElectionPersonDetailsForm';

class ElectionPersonDetails extends Component {
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

export default FormHOC(ElectionPersonDetails, Form, '/savings/election_journey/person_details/');
