/* eslint-disable react/no-array-index-key*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Table.scss';

class Table extends Component {
  static propTypes = {
    header: PropTypes.string,
    columns: PropTypes.array,
    rows: PropTypes.array,
    tableType: PropTypes.string,
  }

  static defaultProps = {
    header: '',
    columns: [],
    rows: [],
    tableType: '',
  };

  createRows = () => {
    const { rows, columns } = this.props;

    return rows.map((row, rowIndex) => {
      const values = columns.map((column, columnIndex) => {
        return (
          <td data-label={ column } key={ column + columnIndex }>{row[column]}</td>
        );
      });
      return (
        <tr key={ `row${ rowIndex }` }>{values}</tr>
      );
    });
  }

  render() {
    const { tableType, header } = this.props;
    return (
      <table className={ `responsive-table ${ tableType }` } data-cy='info-table'>
        <thead>
          <tr><th>{header}</th></tr>
        </thead>
        <tbody style={{ display: 'block', maxHeight: 285 }}>
          {this.createRows()}
        </tbody>
      </table>
    );
  }
}

export default Table;
