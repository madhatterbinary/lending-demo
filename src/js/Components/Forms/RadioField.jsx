import React from 'react';
import { Radio, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './RadioField.scss';

const RadioField = ({ input, label, id, dataCy }) => {
  return (
    <div className='md-radiobutton' style={{ fontSize: 20 }}>
      <Form.Field>
        <Radio
          id={ id }
          name='radioGroup'
          label={ label }
          data-cy={ dataCy }
          value={ Boolean(input.value) }
          onChange={ (e, { value }) => input.onChange(value) }
        />
      </Form.Field>
    </div>
  );
};

RadioField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  id: PropTypes.string,
  dataCy: PropTypes.string,
};

RadioField.defaultProps = {
  input: {},
  label: '',
  id: '',
};

export default RadioField;
