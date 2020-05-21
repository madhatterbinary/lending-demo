/* eslint-disable no-restricted-globals */
/* eslint-disable space-infix-ops */
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { useSelector } from 'react-redux';
import { required, notFutureDate } from 'js/Validation';
import * as actions from 'js/Store/Actions/application';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import Opacity from 'js/Components/Animations/Opacity';
import SelectField from 'js/Components/Forms/SelectField';
import DateField from 'js/Components/Forms/DateField';
import TextField from 'js/Components/Forms/TextField';
import { generateOptionsList } from 'js/Utils/formUtils';
import AddressSearch from 'js/Components/AddressSearch';
import moment from 'moment';
/*
  Uses the AddressSearch component to obtain for postcode and building number and match it with a valid Equifax address
  Also contains the values of the selected address from the Search component
*/
const AddressSearchField = (props) => {
  const { fields, index, address, options, location, invalid, setCurrentIndex, addresses } = props;


  const { loadAddressesForPostcode } = useActions(actions);
  const { addressData } = useSelector(state => ({
    addressData: state.application.ticketChecker.addresses,
  }));

  const selectedAddressHandler = (indx, suggestion) => {
    // add selected address to the form reducers

    // Remove default empty value before adding data structure
    fields.remove(indx);
    fields.insert(indx, {
      ...suggestion,
      house_number_search: suggestion.building || '0',
      address_type: 'Current',
    });
  };

  const removeAddress = (indx) => {
    fields.remove(indx);
  };
  const checkMoveIn = () => (moment((addresses[index -1 || 0] || {}).move_in_date, 'YYYY/MM/DD').isSameOrAfter((addresses[index] || {}).move_in_date) ? 'Check move in dates' : undefined);
  const checkMoveOut = () => (moment((addresses[index -1 || 0] || {}).move_out_date, 'YYYY/MM/DD').isSameOrAfter((addresses[index] || {}).move_out_date) ? 'Check move out dates' : undefined);
  const checkMoveInMoveOut = (value) => (moment(value, 'YYYY/MM/DD').isSameOrAfter((addresses[index] || {}).move_out_date) ? 'Check move in and move out dates' : undefined);
  const checkMoveOutMoveIn = (value) => (moment(value, 'YYYY/MM/DD').isSameOrAfter((addresses[index] || {}).move_in_date) ? 'Check move in and move out dates' : undefined);

  useEffect(() => {
    setCurrentIndex(index);
  }, [index]);

  const loadAddressForPostcode = (postcode) => {
    loadAddressesForPostcode(postcode, fields.get(index) ? fields.get(index).house_number_search : '0');
  };

  return (
    <div className='container'>
      <div key={ index } className='row'>
        <div className='col p-0'>
          <Opacity speed={ 300 }>
            <Field
              name={ `${ address }.house_number_search` }
              component={ TextField }
              dataCy='input-house-number'
              type='text'
              selectedIndex={ index }
              placeholder='House number*'
              label='House number*'
            />
            <div className='address-picker-container'>
              <AddressSearch
                addressesData={ addressData }
                onSuggestionSelected={ (suggestion) => selectedAddressHandler(index, suggestion) }
                selectedIndex={ index }
                searchAddress={ (postcode) => loadAddressForPostcode(postcode) }
              />
            </div>
          </Opacity>
          {fields.get(index) && fields.get(index).building ? (
            <Fragment>
              <div className='bg-light-gray p-3 mt-4 mb-4' data-cy='info-address-box-container'>
                {/* <UICard className='bg-white my-4'> */}
                <div className='mb-1'>{fields.get(index).building}</div>
                <div className='mb-1'>{fields.get(index).line_1}</div>
                <div className='mb-1'>{fields.get(index).line_2}</div>
                <div className='mb-1'>{fields.get(index).post_town}</div>
                <div>{fields.get(index).postcode}</div>
                {index >= 1 && (
                <span
                  className='error'
                  style={{
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                  onClick={ removeAddress() }
                >
                  Remove entry
                </span>
                )}
                {/* </UICard> */}
              </div>
              <Field name={ `${ address }.address_type` } component='input' type='hidden' value={ fields.get(index).address_type } validate={ [required] } />
              <Field name={ `${ address }.building` } component='input' type='hidden' value={ fields.get(index).building } validate={ [required] } />
              <Field name={ `${ address }.line_1` } component='input' type='hidden' value={ fields.get(index).line_1 } validate={ [required] } />
              <Field name={ `${ address }.line_2` } component='input' type='hidden' value={ fields.get(index).line_2 } />
              <Field name={ `${ address }.post_town` } component='input' type='hidden' value={ fields.get(index).post_town } validate={ [required] } />
              <Field name={ `${ address }.postcode` } component='input' type='hidden' value={ fields.get(index).postcode } />
              <Field name={ `${ address }.ptcabs` } component='input' type='hidden' value={ fields.get(index).ptcabs } />
              {index !== fields.length - 1 && <h3 style={{ fontSize: '1em', color: '#e83d52', marginTop: 90, width: '100%' }}>Please add another address</h3>}
            </Fragment>
          ) : (
            null
          )}
        </div>
        <div className='col p-0' />
        <div className='col p-0' />
      </div>
      {fields.get(index) && fields.get(index).building ? (
        <div className='row'>
          <div className='col p-0 d-flex align-items-end flex-row'>
            <Field
              name={ `${ address }.residential_status` }
              component={ SelectField }
              label='Residential status'
              dataCy='input-residential-status'
              placeholder=''
              validate={ [required] }
              options={ generateOptionsList(options.residential_status || []) }
              selectedIndex={ index }
              invalid={ invalid }
            />
          </div>
          <div className='col p-0 pl-3 d-flex align-items-end flex-row'>
            <Field
              name={ location === '/lending/servicing/myaccount' || location === '/savings/servicing/myaccount' ? `${ address }.update_move_in_date` : `${ address }.move_in_date` }
              type='text'
              data-cy='input-move-in-date'
              component={ DateField }
              selectedIndex={ index }
              validate={ [required, notFutureDate, checkMoveIn, checkMoveInMoveOut] }
              label='Moved in date'
              placeholder='DD/MM/YYYY'
              invalid={ invalid }
            />
          </div>
          <div className='col p-0 pl-3 d-flex align-items-end flex-row'>
            {index > 0 ? (
              <Field
                name={ `${ address }.move_out_date` }
                type='text'
                data-cy='input-move-out-date'
                component={ DateField }
                selectedIndex={ index }
                validate={ [required, notFutureDate, checkMoveOut, checkMoveOutMoveIn] }
                label='Moved out date'
                invalid={ invalid }
              />
            ) : null}
          </div>
        </div>
      ) : (
        null
      )}
    </div>
  );
};

AddressSearchField.propTypes = {
  fields: PropTypes.object,
  options: PropTypes.object,
  index: PropTypes.number,
  address: PropTypes.string,
  location: PropTypes.object,
  invalid: PropTypes.bool,
  setCurrentIndex: PropTypes.func.isRequired,
  addresses: PropTypes.object,
};

AddressSearchField.defaultProps = {
  fields: null,
  options: {},
  index: 0,
  address: '',
  location: {},
  invalid: null,
  addresses: {},
};

export default AddressSearchField;
