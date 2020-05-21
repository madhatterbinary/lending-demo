import React from 'react';
import capitalize from 'capitalize';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import TextField from 'js/Components/Forms/TextField';
import DateField from 'js/Components/Forms/DateField';
import Opacity from 'js/Components/Animations/Opacity';

import { required, alphaNumeric, number } from 'js/Validation';


const CurrentAddressForm = props => {
  const { submitting, invalid, handleSubmit } = props;
  return (
    <Opacity speed={ 300 }>
      <form className='details-form' onSubmit={ handleSubmit }>
        <div className='form-row'>
          <Field
            placeholder='Building*'
            name='addresses[0].building'
            type='text'
            component={ TextField }
            validate={ [required, number] }
          />
          <Field
            name='addresses[0].line_1'
            placeholder='Street*'
            component={ TextField }
            type='text'
            validate={ [required] }
            normalize={ capitalize }
            warn={ alphaNumeric }
          />
          <Field
            name='addresses[0].line_2'
            component={ TextField }
            placeholder='Street*'
            type='text'
            validate={ [required] }
            normalize={ capitalize }
            warn={ alphaNumeric }
          />
        </div>
        <div className='form-row'>
          <Field
            name='addresses[0].post_town'
            placeholder='Town*'
            component={ TextField }
            type='text'
            validate={ [required] }
          />
          <Field
            name='addresses[0].postcode'
            placeholder='Poscode*'
            component={ TextField }
            type='text'
            validate={ [required] }
          />
          <Field
            name='addresses[0].update_move_in_date'
            label='Move in date*'
            component={ DateField }
            validate={ [required] }
          />
          <Field
            name='addresses[0].ptcabs'
            component={ TextField }
            value='28030098309'
            validate={ [required] }
          />
        </div>
        <article style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <button className='button secondary-small' style={{ margin: 20 }} type='submit' disabled={ invalid || submitting }>
            Save
          </button>
        </article>
      </form>
    </Opacity>
  );
};

CurrentAddressForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
};
CurrentAddressForm.defaultProps = {
  invalid: null,
};

export default CurrentAddressForm;
