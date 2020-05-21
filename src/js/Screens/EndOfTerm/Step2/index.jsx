import React, { Component } from 'react';
import './ElectionSummary.scss';
import PropTypes from 'prop-types';
import FormHOC from 'js/Store/hoc/FormContainer';
import Form from './ElectionSummaryForm';

class ElectionSummary extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  };

  render() {
    const { children } = this.props;

    return (
      <div className='container savings-investment-screen' style={{ maxWidth: 990 }}>
        { children }
      </div>
    );
  }
}

export default FormHOC(ElectionSummary, Form, '/savings/election_journey/summary/');
