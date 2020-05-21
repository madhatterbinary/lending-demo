import React, { Component } from 'react';
import './ElectionReinvestAmount.scss';
import PropTypes from 'prop-types';
import FormHOC from 'js/Store/hoc/FormContainer';
import Form from './ElectionReinvestAmountForm';

class ElectionReinvestAmount extends Component {
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

export default FormHOC(ElectionReinvestAmount, Form, '/savings/election_journey/reinvest_amount/');
