import React from 'react';
import { Checkbox, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const CheckboxField = ({ input, label, id, dataCy }) => {
  return (
    <div className='md-checkbox'>
      <Form.Field>
        <Checkbox
          id={ id }
          data-cy={ dataCy }
          label={ label }
          checked={ !!input.value }
          onChange={ (e, { checked }) => {
            if (input.onChange) {
              input.onChange(checked);
            }
          } }
        />
      </Form.Field>
    </div>
  );
};

CheckboxField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  id: PropTypes.string,
  dataCy: PropTypes.string,
};

CheckboxField.defaultProps = {
  input: {},
  label: '',
  id: '',
  dataCy: '',
};

export default CheckboxField;
