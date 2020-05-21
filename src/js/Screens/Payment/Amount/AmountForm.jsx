import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import SelectField from 'js/Components/Forms/SelectField';
import TextField from 'js/Components/Forms/TextField';

import { required, number } from 'js/Validation';
import { generateOptionsList } from 'js/Utils/formUtils';


/*
  Start payment journey
  Information required from GET:
    data.form_data.options.run_option: [{id, label}]
  Information submitted via POST:
    repayment_amount
    run_option
*/
const DetailsForm = (props) => {
  const { options, submitting, handleSubmit } = props;

  return (
    <form className='details-form form-container' onSubmit={ handleSubmit }>
      <div className='form-row'>
        <Field
          dataCy='input-repayment-amount'
          name='repayment_amount'
          label='Amount you want to repay*'
          placeholder='Amount you want to repay'
          type='number'
          component={ TextField }
          validate={ [required, number] }
        />
      </div>
      <div className='form-row'>
        <Field
          dataCy='input-run-option'
          name='run_option'
          label='Run options*'
          type='text'
          component={ SelectField }
          options={ generateOptionsList(options.run_option || []) }
          validate={ required }
        />
      </div>
      <article>
        <button className='button secondary-invert-color' style={{ width: 185, margin: 20 }} type='submit' disabled={ submitting } data-cy='action-repayment-next-step'>
          Next step
        </button>
      </article>
    </form>
  );
};

DetailsForm.propTypes = {
  options: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

DetailsForm.defaultProps = {
  options: {},
};

export default DetailsForm;
