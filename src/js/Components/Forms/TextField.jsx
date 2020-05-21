/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
// import './TextField.scss';

const TextField = ({
  input,
  label,
  disabled,
  meta: { touched, error, warning },
  type,
  step,
  dataCy,
}) => {
  let fieldCssClasses = 'form-control';
  let labelCssClasses = '';

  if (touched && error) {
    fieldCssClasses += ' error';
    labelCssClasses += ' input-error';
  }

  if (touched && warning) {
    fieldCssClasses += ' warning';
    labelCssClasses += ' input-warning';
  }

  return (
    <div className='form-group'>
      <input
        { ...input }
        id={ input.name }
        data-cy={ dataCy }
        placeholder={ label }
        type={ type }
        step={ step }
        disabled={ disabled }
        className={ fieldCssClasses }
      />
      <label htmlFor={ input.name } data-cy={ `info-${ input.name }-error` }>
        <div className='grey form-field-label'>
          <span className={ labelCssClasses }>
            {touched
              && (typeof error === 'string' && (
                <div className='input-error'>
                  {''}
                  {error}
                </div>
              ))}
            {touched
              && !error
              && (warning && (
              <span className='input-warning'>
                {' '}
                {warning}
              </span>
              ))}
          </span>
        </div>
      </label>
    </div>
  );
};

TextField.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  step: PropTypes.number,
  dataCy: PropTypes.string,
};

TextField.defaultProps = {
  placeholder: '',
  type: 'text',
  step: 1000,
};

export default TextField;
