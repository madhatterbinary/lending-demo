import moment from 'moment';

const todayDate = moment();
const totalPeriod = 35;

moment.suppressDeprecationWarnings = true;

export const validateAddresses = (values) => {
  let totalMonths = 0;

  if (values !== undefined) {
    if (values.addresses !== undefined) {
      if (values.addresses.length) {
        if (values.addresses[0] && values.addresses[0].move_in_date) {
          if (todayDate.diff(moment(values.addresses[0].move_in_date, 'YYYY/MM/DD'), 'months') >= totalPeriod) {
            return undefined;
          }

          values.addresses.forEach((address) => {
            const moveIn = moment(address.move_in_date, 'YYYY/MM/DD');
            const moveOut = address.move_out_date ? moment(address.move_out_date, 'YYYY/MM/DD') : todayDate;

            totalMonths += parseInt(moveOut.diff(moveIn, 'months') || 0, 10);
          });

          if (totalMonths >= totalPeriod) {
            return undefined;
          }
        }
        if (values.addresses[0] && values.addresses[0].update_move_in_date) {
          if (todayDate.diff(moment(values.addresses[0].update_move_in_date, 'YYYY/MM/DD'), 'months') >= totalPeriod) {
            return undefined;
          }

          values.addresses.forEach((address) => {
            const moveIn = moment(address.update_move_in_date, 'YYYY/MM/DD');
            const moveOut = address.move_out_date ? moment(address.move_out_date, 'YYYY/MM/DD') : todayDate;

            totalMonths += parseInt(moveOut.diff(moveIn, 'months') || 0, 10);
          });

          if (totalMonths >= totalPeriod) {
            return undefined;
          }
        }
      }
    }
  }
  return { form_valid: 'errors' };
};
