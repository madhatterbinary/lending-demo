import React, { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import * as appActions from 'js/Store/Actions/application';
import { Link } from 'react-router-dom';
import './Overview.scss';
import moment from 'moment';
import * as LoanStatus from 'js/Store/Constants/LoanStatus';
import Spinner from 'js/Components/Spinner';
import ChartLoan from 'js/assets/images/chart-loan.png';
import MoneyIcon from 'js/assets/images/money.png';
import uuid from 'uuid';
import html2canvas from 'html2canvas';
import ConfirmationBox from 'js/Components/ConfirmationBox';
import ContinueAppliaction from 'js/assets/images/ContinueAppliaction.png';


moment.suppressDeprecationWarnings = true;

const Overview = () => {
  const { pageData, loans } = useSelector(state => ({
    pageData: state.stepData.pageData,
    loans: (((state || {}).stepData || {}).pageData || {}).loans,
  }));

  const { loadStepDataPublic } = useActions(actions);
  const [pathnameCloseLoan, setPathnameCloseLoan] = useState('');
  const [screenCapture, setScreenCapture] = useState(null);
  const [newLoan, setNewLoan] = useState(null);
  const { resetSession } = useActions(appActions);
  let amountPaid = 0;
  let balanceOriginal = 0;

  const takeScreenShot = () => {
    const body = document.getElementById('root');
    html2canvas(body).then((canvas) => {
      const croppedCanvas = document.createElement('canvas');
      const rect = body.getBoundingClientRect();
      const croppedCanvasContext = croppedCanvas.getContext('2d');
      croppedCanvasContext.translate(-rect.left, -rect.top);
      croppedCanvas.width = rect.width;
      croppedCanvas.height = rect.height;
      croppedCanvas.scale = window.devicePixelRatio;
      croppedCanvasContext.drawImage(canvas, 0, 0, rect.width, rect.height, 0, 0, rect.width, rect.height);
      setScreenCapture(croppedCanvas.toDataURL());
    });
  };

  useEffect(() => {
    takeScreenShot();
    loadStepDataPublic('/lending/overview/');
    const getPathnameCloseLoan = localStorage.getItem('pathnameCloseLoan');
    setPathnameCloseLoan(getPathnameCloseLoan);
    if (Number(balanceOriginal) === Number(amountPaid) && balanceOriginal !== 0) {
      setNewLoan(true);
      localStorage.setItem('createNewLoan', 'true');
    } else {
      localStorage.setItem('createNewLoan', 'false');
    }
  }, [pathnameCloseLoan, newLoan]);
  // TODO: Update when backend can support actions on multiple loans at once

  const closeLoanHandler = () => {
    if (newLoan) {
      resetSession();
    }
  };

  if (pageData && pageData.journeys_in_progress && pageData.journeys_in_progress.LOAN_APPLICATION) {
    return (
      <div className='home-content-screen'>
        <ConfirmationBox
          header='Continue'
          subheader='It seems you have not yet completed your loan application.'
          background={ ContinueAppliaction }
          btnText=' Continue application'
          btnLink={ `/lending/?${ pageData.journeys_in_progress.LOAN_APPLICATION.params }` }
        />
      </div>
    );
  }

  if (pageData && pageData.journeys_in_progress && pageData.journeys_in_progress.CLEARSCORE_JOURNEY) {
    return (
      <div className='home-content-screen'>
        <ConfirmationBox
          header='Continue'
          subheader='It seems you have not yet completed your loan application.'
          background={ ContinueAppliaction }
          btnText=' Continue application'
          btnLink={ `/lending/?${ pageData.journeys_in_progress.CLEARSCORE_JOURNEY.params }` }
        />
      </div>
    );
  }
  if (!pageData || !pageData.loans || !pageData.loans.length || !loans.length) {
    if (document.getElementsByClassName('servicing-header')[0]) {
      document.getElementsByClassName('servicing-header')[0].style.display = 'none';
    }
    return <Spinner />;
  }

  if (document.getElementsByClassName('servicing-header')[0]) {
    document.getElementsByClassName('servicing-header')[0].style.display = 'block';
  }
  // Check for closed loan(s)
  const { 'has_closed_loans(s)': hasClosedLoans } = pageData;

  // Get the primary loan or null. Future may have more loans?!
  let primaryLoan = pageData && loans && loans.length ? loans[0] : null;

  // const arrearsAmmount = primaryLoan.arrears_amount ? primaryLoan.arrears_amount : 300;


  if (!primaryLoan && hasClosedLoans) {
    // Can assume the user has no open loan and never had a loan so...
    primaryLoan = { loan_status: LoanStatus.ASSUME_CLOSED }; // Make up a fake status that we can map to panels
  }
  if (loans.length) {
    amountPaid = loans[0].last_payments.reduce((accum, currentValue) => {
      return accum + Number(currentValue.payment_amount);
    }, 0);
  }

  if (screenCapture === null) return null;
  ((document.getElementById('screenshot') || {}).style || {}).display = 'none';
  balanceOriginal = Number(loans[0].balance_original).toFixed(0);
  if (Number(loans[0].current_capital_balance) === 0) {
    localStorage.setItem('createNewLoan', 'true');
  } else {
    localStorage.setItem('createNewLoan', 'false');
  }

  return (
    <Fragment>
      <img alt='screenshot' id='screenshot' style={{ display: 'none' }} src={ screenCapture } />
      <div className='container mt-4'>
        { Number(loans[0].current_capital_balance) === 0
          ? (
            <div className='row mb-4'>
              <div className='col'>
                <div className='red-box container pt-3 pb-3 mb-3' data-cy='info-your-balance'>
                  <div className='row'>
                    <div className='col' style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h3 className='title' style={{ color: '#707070', marginTop: 5 }}>Your loan has been successfully closed.</h3>
                      <div style={{ marginTop: 3 }}>
                        <Link to='/lending/getaloan'>
                          <button type='button' className='btn btn-primary' onClick={ closeLoanHandler } style={{ width: 185, margin: 0 }} data-cy='action-back-to-servicing'>Open a new loan</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null }
        <div className='row mb-4'>
          <div className='col'>
            <div className='red-box container pt-3 pb-3 mb-3' data-cy='info-your-balance'>
              <div className='row'>
                <div className='col' style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <h3 className='title'>Your Balance</h3>
                  <img alt='money icon' src={ MoneyIcon } width='20px' height='20px' style={{ marginBottom: 5 }} />
                </div>
              </div>
              <div className='row'>
                <div className='col m4-3'>
                  <div className='chart-loan-holder'>
                    <div className='chart-balance text-white text-center'><strong>Current<br />balance<br />£{Number(loans[0].current_capital_balance)}</strong></div>
                    <img alt='chart' src={ ChartLoan } width='102%' />
                  </div>
                </div>

                <div className='col ml-3'>
                  <div className='container m-0 p-0'>
                    <div className='row'>
                      <div className='col'>
                        <strong>Amount</strong>
                      </div>
                      <div className='col text-right'>
                        £{Number(loans[0].balance_original)}
                      </div>
                    </div>
                    <div className='row mt-2'>
                      <div className='col'>
                        <div className='grey-line' />
                      </div>
                    </div>
                    <div className='row mt-2'>
                      <div className='col'>
                        <strong>Your rate</strong>
                      </div>
                      <div className='col text-right'>
                        {Number(loans[0].apr).toFixed(2)}%
                      </div>
                    </div>
                    <div className='row mt-2'>
                      <div className='col'>
                        <div className='grey-line' />
                      </div>
                    </div>
                    <div className='row mt-2'>
                      <div className='col'>
                        <strong>Monthly payments</strong>
                      </div>
                      <div className='col text-right'>
                        £{Number(loans[0].payment_amount)}
                      </div>
                    </div>
                    <div className='row mt-2'>
                      <div className='col'>
                        <div className='grey-line' />
                      </div>
                    </div>
                    <div className='row mt-2 mb-2'>
                      <div className='col'>
                        <strong>Total amount payable</strong>
                      </div>
                      <div className='col text-right'>
                        £{Number(loans[0].current_capital_balance)}
                      </div>
                    </div>
                    <div className='row mt-2'>
                      <div className='col'>
                        <div className='grey-line' />
                      </div>
                    </div>
                    <div className='row mt-2 mb-2'>
                      <div className='col'>
                        <strong>Total amount paid</strong>
                      </div>
                      <div className='col text-right'>
                        £{Number(amountPaid)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className='row mt-3'
                ref={ (el) => {
                  if (el) {
                    el.style.setProperty('margin-top', '-15px', 'important');
                  }
                } }
              >
                <div className='col'>
                  <div className='red-line' />
                </div>
                <div className='col' />
              </div>
              <div className='row mt-1'>
                <div className='col-3'>
                  £{Number(loans[0].balance_original)}
                </div>
                <div className='col-3 text-right'>£0</div>
                <div className='col-6' />
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <div className='red-box container pt-3 pb-3' data-cy='info-monthly-statement'>
              <div className='row'>
                <div className='col' style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 0 }}>
                  <h3 className='title'>Your Monthly Statement</h3>
                  <i className='material-icons' style={{ marginBottom: 5, fontSize: '1.8em', color: '#E83D52', lineHeight: 'unset', marginRight: '-5px', position: 'relative', bottom: 5 }}>description</i>
                </div>
              </div>
              <div className='row mt-2'>
                <div className='col'>
                  <strong>Next payment date</strong>
                </div>
                <div className='col text-right'>{moment(loans[0].next_payment.payment_date).format('ll')}</div>
              </div>
              <div className='row mt-2'>
                <div className='col'>
                  <strong>Loan amount</strong>
                </div>
                <div className='col text-right'>£{Number(loans[0].balance_original).toFixed(2)}</div>
              </div>
              <div className='row mt-2'>
                <div className='col'>
                  <strong>APR</strong>
                </div>
                <div className='col text-right'>{Number(loans[0].apr).toFixed(2)}%</div>
              </div>
              <div className='row mt-2'>
                <div className='col'>
                  <strong>Amount due</strong>
                </div>
                <div className='col text-right'>£{Number(loans[0].current_capital_balance).toFixed(2)}</div>
              </div>
              <div className='row mt-2' style={{ marginBottom: 15 }}>
                <div className='col'>
                  <div className='grey-line' />
                </div>
              </div>
              <div className={ Number(loans[0].current_capital_balance) === 0 ? 'row mt-2 closed-loan' : 'row mt-2' }>
                <div className='col text-right'>
                  <Link to='/lending/servicing/manageloan/makepayment'>
                    <button className='btn btn-primary' data-cy='action-make-payment' type='button'>Make a payment</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='red-box container  pt-3 pb-3' data-cy='info-previous-payments'>
              <div className='row'>
                <div className='col' style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 0 }}>
                  <h3 className='title'>Previous Payments</h3>
                  <i className='material-icons' style={{ marginBottom: 5, fontSize: '1.8em', color: '#E83D52', lineHeight: 'unset', position: 'relative', bottom: 5 }}>date_range</i>
                </div>
              </div>
              {loans[0].last_payments.length === 0 ? (
                <div className='row mt-2'>
                  <div className='col'>
                    Your payment history will be shown here.
                  </div>
                </div>
              ) : (
                <div className='row mt-2'>
                  <div className='col'>
                    <div id='scrollbar' style={{ maxHeight: `${ 200 }px`, overflowY: 'auto', overflowX: 'hidden', marginTop: '-9px' }}>
                      {loans[0].last_payments.map(payment => (
                        <div key={ uuid.v4() }>
                          <div className='mt-2' data-cy='info-payment-date'>
                            <div className='row mt-2'>
                              <div className='col'>
                                <div className='grey-line' style={{ marginBottom: 10 }} />
                              </div>
                            </div>
                            <strong>{moment(payment.payment_date).format('ll')}</strong>
                          </div>
                          <div className='container p-0 m-0'>
                            <div className='row'>
                              <div className='col'>Amount paid</div>
                              <div
                                className='col text-right mr-3'
                                ref={ (el) => {
                                  if (el) {
                                    el.style.setProperty('margin-right', '0px', 'important');
                                  }
                                } }
                                data-cy='info-payment-amount'
                              >
                                £{Number(payment.payment_amount).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {loans[0].last_payments.length !== 0 ? (
                <div className='row'>
                  <div className='col text-right'>
                    <div className='downloadIcon'>
                      <br />
                      <a id='download' download='receipt.png' style={{ color: '#E83D52' }} href={ screenCapture }>Download Receipt</a>
                      <i className='material-icons custom' style={{ color: '#E83D52', marginLeft: 10, marginRight: '-3px', fontSize: '1.8em' }}>file_download</i>
                    </div>
                  </div>
                </div>
              ) : null }
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Overview;
