/* eslint-disable import/no-unused-modules */
/* eslint-disable no-restricted-globals*/
import moment from 'moment';

moment.suppressDeprecationWarnings = true;
const todayDate = moment();

export const threeYearsAgo = value => (moment(value, 'YYYY/MM/DD').isSameOrBefore(todayDate.subtract(3, 'years')) ? 'Date required to be more than three years ago' : undefined);
export const notFutureDate = value => (moment(value, 'YYYY/MM/DD').isSameOrAfter(todayDate) ? 'Dates in the future are not valid' : undefined);

export const required = value => (value ? undefined : 'required*');
export const email = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined);

export const alphaNumeric = value => (value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Only alphanumeric characters' : undefined);
export const noNegativeNum = value => (value && /-(?=\d)/i.test(value) ? 'Ensure this value is greater than or equal to 0.' : undefined);
export const noLeadingZeros = value => (value && !/(?:^0$)|(?:^[^0][0-9]*$)/i.test(value) ? 'Leading 0s are no valid numbers.' : undefined);
export const noZero = value => (value && !/^\d*[1-9]\d*$/i.test(value) ? 'Ensure this value is greater than or equal to 0.01.' : undefined);

// eslint-disable-next-line no-useless-escape
export const phoneNumber = value => (value && !/^(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|(?:\(?0))(?:(?:\d{5}\)?[\s-]?\d{4,5})|(?:\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3}))|(?:\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4})|(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}))(?:[\s-]?(?:x|ext\.?|\#)\d{3,4})?$/i.test(value) ? 'Invalid phone number' : undefined);

export const onlyLetters = value => (value && !/^[a-z][a-z\s]*$/i.test(value) ? 'Name cannot be numbers' : undefined);

export const minLoanValue = min => value => (value && value < min ? `Minimum amout is £${ min }` : undefined);
export const maxLoanValue = max => value => (value && value > max ? `Maximum amout is £${ max }` : undefined);

export const minPeriodValue = min => value => (value && value < min ? `Minimum period is ${ min } months` : undefined);
export const maxPeriodValue = max => value => (value && value > max ? `Maximum period is ${ max } months` : undefined);

export const maxLength = max => value => (value && value.length > max ? `Must be ${ max } characters or less` : undefined);
export const minLength = min => value => (value && value.length < min ? `Must be ${ min } characters or more` : undefined);
export const exactLength = len => value => (value && value.length !== len ? `Must be ${ len } characters` : undefined);
export const minNumLength = min => value => (value && value.length < min ? `Must be ${ min } characters` : undefined);
export const maxNumLength = max => value => (value && value.length > max ? `Must be ${ max } characters` : undefined);

export const maxLength15 = maxLength(15);
export const maxLength10 = maxLength(10);
export const minLength2 = minLength(2);
export const maxLength8 = maxNumLength(8);
export const minLength8 = minNumLength(8);
export const exactLength6 = exactLength(6);
export const exactLength8 = exactLength(8);
export const maxLength20 = maxNumLength(8);


export const number = value => (value && isNaN(Number(value)) ? 'Must be a number*' : undefined);
export const checkMonth = value => (value === '31' ? 'Must be characters' : undefined);
