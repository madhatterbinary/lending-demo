import moment from 'moment';

const totalPeriod = 35;

moment.suppressDeprecationWarnings = true;

export const validateAddresses = (values) => {
  if (((values || {}).addresses || []).length && values.addresses[0] && values.addresses[0].move_in_date) {
    const todayDate = moment();

    if (todayDate.diff(moment(values.addresses[0].move_in_date, 'YYYY/MM/DD'), 'months') >= totalPeriod) {
      return undefined;
    }

    const totalMonths = values.addresses.reduce((acc, address) => {
      const moveIn = moment(address.move_in_date, 'YYYY/MM/DD');
      const moveOut = address.move_out_date ? moment(address.move_out_date, 'YYYY/MM/DD') : todayDate;

      return acc + parseInt(moveOut.diff(moveIn, 'months') || 0, 10);
    }, 0);

    if (totalMonths >= totalPeriod) {
      return undefined;
    }
  }
  if (((values || {}).addresses || []).length && values.addresses[0] && values.addresses[0].update_move_in_date) {
    const todayDate = moment();

    if (todayDate.diff(moment(values.addresses[0].update_move_in_date, 'YYYY/MM/DD'), 'months') >= totalPeriod) {
      return undefined;
    }

    const totalMonths = values.addresses.reduce((acc, address) => {
      const moveIn = moment(address.update_move_in_date, 'YYYY/MM/DD');
      const moveOut = address.move_out_date ? moment(address.move_out_date, 'YYYY/MM/DD') : todayDate;

      return acc + parseInt(moveOut.diff(moveIn, 'months') || 0, 10);
    }, 0);

    if (totalMonths >= totalPeriod) {
      return undefined;
    }
  }

  return { form_valid: 'errors' };
};
