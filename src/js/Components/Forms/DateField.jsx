/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useEffect } from 'react';
import { generateDaysList, generateMonthsList, generateYearsList } from 'js/Utils/formUtils';
import uuid from 'uuid';
import moment from 'moment';

const DateField = ({
  input,
  label,
  meta: { touched, error, warning },
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

  const [date, setDate] = useState({});

  const updateDate = (value, key) => {
    if (key === 'DD') date.day = value;
    if (key === 'MM') date.month = value;
    if (key === 'YYYY') date.year = value;
    setDate(date);
    if (date.day && date.month && date.year) {
      input.onChange(`${ date.year }-${ date.month }-${ date.day }`);
    }
  };

  const getDefaultValue = (key) => {
    if (input.value) {
      const currentDate = moment(input.value, 'YYYY-MM-DD');
      const day = currentDate.format('DD');
      const month = currentDate.format('MM');
      const year = currentDate.format('YYYY');
      if (key === 'DD') return day;
      if (key === 'MM') return month;
      if (key === 'YYYY') return year;
    }
    return '';
  };

  const renderDropdown = (dataCy, name, placeholder, options) => {
    return (
      <div className='form-group'>
        <select
          id={ uuid.v4() }
          name={ name }
          onChange={ (event) => updateDate(event.target.value, placeholder) }
          data-cy={ dataCy }
          className={ fieldCssClasses }
        >
          <option value=''>{placeholder}</option>
          {options.map(option => {
            if (String(option.id) === String(getDefaultValue(placeholder))) {
              return (
                <option key={ uuid.v4() } value={ option.id } selected>{option.value}</option>
              );
            }
            return (
              <option key={ uuid.v4() } value={ option.id }>{option.value}</option>
            );
          })}
        </select>
      </div>
    );
  };

  return (
    <div className='container m-0 p-0'>
      <div className='row'>
        <div className='col' style={{ opacity: 0.75, fontSize: `${ 1 }rem` }}>{label}</div>
      </div>
      <div className='row m-0 p-0'>
        <div className='col m-0 p-0 pr-3'>
          {renderDropdown('input-day-of-date', 'day_of_date', 'DD', generateDaysList())}
        </div>
        <div className='col m-0 p-0 pr-3'>
          {renderDropdown('input-month-of-date', 'month_of_date', 'MM', generateMonthsList())}
        </div>
        <div className='col m-0 p-0'>
          {renderDropdown('input-year-of-date', 'year_of_date', 'YYYY', generateYearsList())}
        </div>
      </div>
    </div>
  );
};

export default DateField;
