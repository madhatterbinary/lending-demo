import React from 'react';
import PropTypes from 'prop-types';


const ManageLoanNav = ({ loanInfo }) => (
  <nav className='primary-color-stripe' style={{ top: 0 }}>
    <div className='primary-color-stripe-content' style={{ justifyContent: 'space-evenly' }}>
      <article>
        <h4 className='white'>Loan balance</h4>
        <h1 className='title white'>{ `£${ Number(loanInfo.balance_current)
          .toFixed(2) }` }</h1>

      </article>
      <article>
        <h4 className='white'>This months interest</h4>
        <h1 className='title white'>{ `${ Number(loanInfo.apr)
          .toFixed(2) }%` }</h1>
      </article>
      <article>
        <h4 className='white'>Initial amount</h4>
        <h1 className='title white'>{ `£${ Number(loanInfo.balance_original)
          .toFixed(2) } ` }</h1>
      </article>
    </div>
  </nav>
);

ManageLoanNav.propTypes = {
  loanInfo: PropTypes.shape({
    balance_current: PropTypes.string.isRequired,
    apr: PropTypes.string.isRequired,
    balance_original: PropTypes.string.isRequired,
  }),
};

export default ManageLoanNav;
