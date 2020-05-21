import React from 'react';
import PropTypes from 'prop-types';

import FormHOC from 'js/Store/hoc/FormContainer';
import Form from './ChooseLoanForm.jsx';

function ChooseLoan(props) {
  const { children } = props;
  return (
    <div className='container mb-5'>
      <div className='row'>
        <div className='col'>
          { children }
        </div>
      </div>
    </div>
  );
}

ChooseLoan.propTypes = {
  children: PropTypes.node,
};

ChooseLoan.defaultProps = {
  children: null,
};

export default FormHOC(ChooseLoan, Form, '/lending/yourdecision/');
