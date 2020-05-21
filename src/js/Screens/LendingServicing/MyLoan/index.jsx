import React, { useEffect, useState } from 'react';
import Overview from './Overview.jsx';
import ContinueWithdrawal from './ContinueWithdrawal.jsx';

const MyLoan = () => {
  const [pathnameCloseLoan, setPathnameCloseLoan] = useState('');
  useEffect(() => {
    const getPathnameCloseLoan = localStorage.getItem('pathnameCloseLoan');
    setPathnameCloseLoan(getPathnameCloseLoan);
  }, [pathnameCloseLoan]);
  if (pathnameCloseLoan === '/lending/servicing/manageloan/withdrawal/carddetails') {
    return <ContinueWithdrawal />;
  }
  return <Overview />;
};

export default MyLoan;
