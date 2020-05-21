import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import TextField from 'js/Components/Forms/TextField';
//
const ProductForm = (props) => {
  const { setProductName } = props;
  return (
    <form>
      <div
        className='row mb-3'
        ref={ (el) => {
          if (el) {
            el.style.setProperty('margin', '0px', 'important');
          }
        } }
      >
        <div className='col'>
          <Field
            name='prod_name'
            dataCy='input-prod-name'
            component={ TextField }
            type='text'
            onChange={ (e) => setProductName(e.target.value) }
            className='prod-input'
          />
        </div>
      </div>
    </form>
  );
};

ProductForm.propTypes = {
  setProductName: PropTypes.any,
};

ProductForm.defaultProps = {
  setProductName: null,
};

export default ProductForm;
