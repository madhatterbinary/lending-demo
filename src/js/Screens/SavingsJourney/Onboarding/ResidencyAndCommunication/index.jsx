import React from 'react';
import PropTypes from 'prop-types';
import './Residency.scss';
import FormHOC from 'js/Store/hoc/FormContainer';
import Form from './ResidencyAndCommunicationForm';

function ResidencyAndCommunication(props) {
  const { children } = props;

  return (
    <div className='container'>
      <div className='row'>
        <div
          className='col mb-5'
          ref={ (el) => {
            if (el) {
              el.style.setProperty('margin-bottom', '30px', 'important');
            }
          } }
        >
          <h1>Recidency information</h1>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <h2
            className='title'
            style={{ fontSize: '1.3em', paddingBottom: 30 }}
            ref={ (el) => {
              if (el) {
                el.style.setProperty('font-weight', '300', 'important');
              }
            } }
          >Now we got that out the way, let&apos;s talk about your recidency.</h2>
        </div>
      </div>
      <div className='row'>
        <div className='col' style={{ paddingLeft: 10 }}>
          { children }
        </div>
      </div>
    </div>
  );
}

ResidencyAndCommunication.propTypes = {
  children: PropTypes.node,
};

ResidencyAndCommunication.defaultProps = {
  children: null,
};

export default FormHOC(ResidencyAndCommunication, Form, '/savings/residency_and_comm/');
