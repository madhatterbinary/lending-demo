const _ = require('lodash');
const moment = require('moment');

const setValue = (propertyPath, value, obj) => {
  // this is a super simple parsing, you will want to make this more complex to handle correctly any path
  // it will split by the dots at first and then simply pass along the array (on next iterations)
  const properties = Array.isArray(propertyPath) ? propertyPath : propertyPath.split('.');
  // Not yet at the last property so keep digging
  if (properties.length > 1) {
    // The property doesn't exists OR is not an object (and so we overwritte it) so we create it
    // eslint-disable-next-line no-prototype-builtins
    if (!obj.hasOwnProperty(properties[0]) || typeof obj[properties[0]] !== 'object') {
      // eslint-disable-next-line no-param-reassign
      obj[properties[0]] = {};
    }
    // We iterate.
    return setValue(properties.slice(1), value, obj[properties[0]]);
    // This is the last property - the one where to set the value
  }
  // We set the value to the last property
  // eslint-disable-next-line no-param-reassign
  obj[properties[0]] = value;
  return true;// this is the end
};
/* eslint-disable import/no-unused-modules */

export const generateOptionsList = (formOptions = []) => {
  return formOptions
    .filter(option => option.id)
    .map(option => ({ id: option.id, value: option.label }));
};

export const generateDaysList = () => {
  return _.range(31).map(val => { return { id: String(val + 1).padStart(2, '0'), value: val + 1 }; });
};

export const generateMonthsList = () => {
  return _.range(12).map(val => { return { id: String(val + 1).padStart(2, '0'), value: moment().month(val).format('MMM') }; });
};

export const generateYearsList = () => {
  return _.range(100).map(val => { return { id: moment().year() - val, value: moment().year() - val }; });
};

export const generateIDVOptions = (questions) => {
  return questions
    .map(({ answer_id: id, answer_value: value }) => {
      const firstValues = value.replace('Â£ ', '£');
      // eslint-disable-next-line no-param-reassign
      value = firstValues.replace('to Â£ ', '£');
      return { id, value };
    });
};

export const modifyAddressArray = (addresses) => {
  if (!addresses.length) return [];

  const newAddresses = [...addresses];

  newAddresses.forEach((address, index) => {
    if (address) {
      newAddresses[index] = {
        ...address,
        ptcabs: address.unique_address_id ? parseInt(address.unique_address_id, 10) : parseInt(address.ptcabs, 10),
      };

      delete newAddresses[index].unique_address_id;
      delete newAddresses[index].house_number_search;
      delete newAddresses[index].county;

      if (index === 0) {
        newAddresses[index] = {
          ...newAddresses[index],
          'address_type': 'Current',
          'move_out_date': '',
        };
      } else {
        newAddresses[index] = {
          ...newAddresses[index],
          'address_type': 'Home',
        };
      }
    }
  });

  // filter for non null addresses
  return newAddresses.filter(addr => addr);
};
