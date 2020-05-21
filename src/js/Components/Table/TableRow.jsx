import React from 'react';
import PropTypes from 'prop-types';

const TableRow = (props) => {
  const { item1, item2, item3, item4, item5, item6, color } = props;
  return (
    <tr>
      <td>{ item1}</td>
      <td>{ item2}</td>
      <td style={{ color }}>{ item3}</td>
      <td>{ item4}</td>
      { item5 ? <td>{ item5}</td> : null }
      { item6 ? <td>{ item6}</td> : null }
    </tr>
  );
};

TableRow.propTypes = {
  item1: PropTypes.any,
  item2: PropTypes.any,
  item3: PropTypes.any,
  item4: PropTypes.any,
  item5: PropTypes.any,
  item6: PropTypes.any,
  color: PropTypes.any,
};

TableRow.defaultProps = {
  item1: null,
  item2: null,
  item3: null,
  item4: null,
  item5: null,
  item6: null,
  color: null,
};

export default TableRow;
