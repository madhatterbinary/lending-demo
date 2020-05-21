import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import './LoanPanel.scss';

const LoanPanel = () => {
  const { quickQuote } = useSelector(state => ({
    quickQuote: state.application.quickQuote,
  }));
  return (
    <div className='bg-light-gray border-top border-bottom'>
      {quickQuote.totalRepayable === 0
        ? (
          <div style={{ height: 50 }}>&nbsp;</div>
        ) : (
          <Fragment>
            <div className='container'>
              <div className='row pt-1 pb-1'>
                <div className='col-3 p-2 pl-4 border-right'>
                  <div>Monthly repayment</div>
                  <div><strong>{`£${ quickQuote.monthlyRepayment }`}</strong></div>
                </div>
                <div className='col-4 pl-4 p-2 border-right'>
                  <div>Total amount repayable</div>
                  <div><strong>{`£${ quickQuote.totalRepayable }`}</strong></div>
                </div>
                <div className='col-3 pl-4 p-2 border-right'>
                  <div>Representative APR</div>
                  <div><strong>{`${ quickQuote.representativeAPR }%`}</strong></div>
                </div>
                <div className='col-2 p-2 d-flex align-items-center pl-4'>
                  <Link to='/lending/getaloan'>
                    <i className='material-icons text-primary'>edit</i>
                  </Link>
                </div>
              </div>
            </div>
          </Fragment>
        )
        }
    </div>
  );
};


export default LoanPanel;
