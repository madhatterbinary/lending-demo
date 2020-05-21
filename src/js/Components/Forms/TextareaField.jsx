//@flow
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Fragment } from 'react';

type InputObject = {
  name: string
};

type MetaObject = {
  touched: boolean,
  error: string,
  warning: string
};

type Props = {
  input: InputObject,
  label: string,
  placeholder?: string,
  type: string,
  step: number,
  disabled: boolean,
  meta: MetaObject,
  dataCy: string,
};

const TextareaField = ({
  input,
  placeholder,
  type,
  disabled,
  meta: { touched, error, warning },
  dataCy,
}: Props) => {
  let fieldCssClasses = '';
  // eslint-disable-next-line no-unused-vars
  let labelCssClasses = '';

  if (touched && error) {
    fieldCssClasses += 'error';
    labelCssClasses += 'input-error';
  }

  if (touched && warning) {
    fieldCssClasses += 'warning';
    labelCssClasses += 'input-warning';
  }

  return (
    <Fragment>
      {/*<label htmlFor={ input.name }>
        <p className='grey form-field-label'>
          <span className={ labelCssClasses }>{label}</span>
          {touched
            && (error && <span className='input-error'> - {error}</span>)}
          {touched
            && !error
            && (warning && <span className='input-warning'> - {warning}</span>)}
        </p>
      </label>*/}

      <textarea
        { ...input }
        id={ input.name }
        data-cy={ dataCy }
        placeholder={ placeholder }
        type={ type }
        className={ fieldCssClasses }
        disabled={ disabled }
        style={{ width: `${ 100 }%`, outline: 'none', height: `${ 100 }px`, borderRadius: `${ 6 }px` }}
      />
    </Fragment>
  );
};

TextareaField.defaultProps = {
  placeholder: '',
};

export default TextareaField;
