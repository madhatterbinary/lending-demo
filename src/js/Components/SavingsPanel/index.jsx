import React, { Fragment } from 'react';
// import './LoanPanel.scss';

const SavingsPanel = () => {
  return (
    <div className='bg-light-gray border-top border-bottom'>
      <Fragment>
        <div className='container'>
          <div className='row pt-1 pb-1'>
            <div className='col-3 pl-4 p-2 border-right'>
              <div>Interest rate</div>
              <div><strong>2.0% Gross</strong></div>
              <div><strong>2.0% AER</strong></div>
            </div>
            <div className='col-3 pl-4 p-2 border-right'>
              <div>How is it paid?</div>
              <div><strong>Annually</strong></div>
            </div>
            <div className='col-3 pl-4 p-2 border-right'>
              <div>When is it paid?</div>
              <div><strong>12/12/2020</strong></div>
            </div>
            <div className='col-3 pl-4 p-2'>
              <div>Account type</div>
              <div><strong>Annual Saver</strong></div>
            </div>
          </div>
        </div>
      </Fragment>
    </div>
  );
};


export default SavingsPanel;
