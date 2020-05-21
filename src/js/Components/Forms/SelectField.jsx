import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
// import './SelectField.scss';

export default class SelectField extends Component {
  static propTypes = {
    input: PropTypes.any.isRequired,
    label: PropTypes.string,
    description: PropTypes.string,
    options: PropTypes.any,
    hasDefault: PropTypes.bool,
    meta: PropTypes.any,
    update: PropTypes.func,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    style: PropTypes.object,
    dataCy: PropTypes.string,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    hasDefault: false,
    label: '',
    description: '',
    meta: {},
    onChange: () => {},
    update: () => {},
    options: null,
    placeholder: '',
    style: {},
    disabled: null,
  };

  render() {
    let fieldCssClasses = 'form-control';
    // eslint-disable-next-line no-unused-vars
    let labelCssClasses = '';

    const {
      input, hasDefault, options, disabled, label, style, meta: { touched, error, warning }, dataCy,
    } = this.props;

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
        <select
          { ...input }
          id={ uuid.v4() }
          data-cy={ dataCy }
          className={ fieldCssClasses }
          disabled={ disabled }
          placeholder={ label }
          style={ style }
        >
          {!hasDefault && label ? (
            <option className='placeholder' value='' disabled>{label}</option>
          ) : (
            <option value='' />
          )}
          {options !== undefined
            ? options.map(option => {
              return (
                <option key={ uuid.v4() } value={ option.id }>
                  {option.value}
                </option>
              );
            })
            : null}
        </select>
      </div>
    );
  }
}
