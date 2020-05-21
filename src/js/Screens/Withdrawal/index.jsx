import React, { useEffect, Fragment } from 'react';
import 'js/Screens/LendingServicing/ManageLoan/ManageLoan.scss';
import PropTypes from 'prop-types';
import { Link, Route, Switch } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import WithdrawalCardDetails from 'js/Screens/Withdrawal/CardDetails';
import WithdrawalRedirect from 'js/Screens/Withdrawal/WithdrawalRedirect';
import WithdrawalProcess from 'js/Screens/Withdrawal/WithdrawalProcess';
import WithdrawalCompelted from 'js/Screens/Withdrawal/WithdrawalCompleted';
import WithdrawalFinalising from 'js/Screens/Withdrawal/WithdrawalFinalising';
import WithdrawalAgreement from 'js/Screens/Withdrawal/WithdrawalAgreement';

const Withdrawal = (props) => {
  const { initSettlement, doSettlement, payAndSettlement, pathname, pageData, settlementLoanHandler, confirmSettlementLoanHandler } = props;
  useEffect(() => {
  }, [initSettlement, doSettlement, payAndSettlement, pathname]);

  return (
    <Fragment>
      <Switch>
        <Route path='/lending/servicing/manageloan/withdrawal/agreement' exact component={ WithdrawalAgreement } />
        <Route path='/lending/servicing/manageloan/withdrawal/carddetails' component={ WithdrawalCardDetails } />
        <Route path='/lending/servicing/manageloan/withdrawal/redirect' component={ WithdrawalRedirect } />
        <Route path='/payment/processing' component={ WithdrawalProcess } />
        <Route path='/lending/servicing/manageloan/withdrawal/finalising' component={ WithdrawalFinalising } />
        <Route path='/lending/servicing/manageloan/withdrawal/completed' component={ WithdrawalCompelted } />
      </Switch>
      {(initSettlement || doSettlement) && pathname !== '/payment/processing'
              && !pathname.includes('/lending/servicing/manageloan/withdrawal/')
        ? (
          <div className='container'>
            <div className='row'>
              <div className='col mt-4'>
                <h3>Withdraw loan agreement</h3>
              </div>
            </div>
            <div className='row mb-3'>
              <div className='col'>
                <div className='red-line' />
              </div>
              <div className='col' />
            </div>
            <div className='row'>
              <div className='col'>
                <div className='red-box container pt-3 pb-3' data-cy='info-withdrawal-warning'>
                  <div className='row mb-2'>
                    <div className='col-8'><strong>Initial amount</strong></div>
                    <div className='col-4 text-right'>{`£${ Number((pageData.loan_info || {}).balance_original).toFixed(2) }`}</div>
                  </div>
                  <div className='row mb-2'>
                    <div className='col'>
                      <div className='red-line' />
                    </div>
                  </div>
                  <div className='row mb-2'>
                    <div className='col-8'><strong>This month&lsquo;s interest</strong></div>
                    <div className='col-4 text-right'>{`${ Number((pageData.loan_info || {}).apr).toFixed(2) }%`}</div>
                  </div>
                  <div className='row mb-2'>
                    <div className='col'>
                      <div className='red-line' />
                    </div>
                  </div>
                  <div className='row mb-2'>
                    <div className='col-8'><strong>Amount to close</strong></div>
                    <div className='col-4 text-right'>{`£${ Number((pageData.loan_info || {}).balance_current).toFixed(2) }`}</div>
                  </div>
                  <div className='row mb-3'>
                    <div className='col'>
                      <div className='red-line' />
                    </div>
                  </div>
                  {initSettlement && !doSettlement ? (
                    <Fragment>
                      <div className='row mb-3'>
                        <div className='col'>
                          There are no fees to close your loan early.
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col text-right'>
                          <button
                            className='btn btn-primary'
                            type='button'
                            onClick={ settlementLoanHandler }
                            data-cy='action-start-withdraw-agreement'
                          >
                            Withdraw from my agreemennt
                          </button>
                        </div>
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <div className='row mb-3'>
                        <div className='col text-primary'>
                          <div className='mb-2'>You are withdrawing from your loan agreement.</div>
                          <div className='mb-2'>There are no fees to close your loan early.</div>
                          <div className='mb-2'>If you do this you are obliged to settle your loan balance within <strong>30 days</strong> from the day after you give us notice.</div>
                        </div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col'>
                          <div className='red-line' />
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col'>
                          <Link to='/lending/servicing'>
                            <button
                              className='btn btn-primary'
                              type='button'
                              onClick={ settlementLoanHandler }
                              data-cy='action-cancel-withdraw-agreement'
                            >
                              Cancel
                            </button>
                          </Link>
                        </div>
                        <div className='col text-right'>
                          <button
                            className='btn btn-white'
                            type='button'
                            onClick={ confirmSettlementLoanHandler }
                            data-cy='action-start-withdraw-agreement'
                          >
                            Withdraw
                          </button>
                        </div>
                      </div>
                    </Fragment>
                  )}
                </div>
              </div>
              <div className='col'>
                <div className='red-box'>
                  <div className='container pt-3 pb-3' data-cy='info-right-to-withdraw-quote'>
                    <div className='row'>
                      <div className='col'>
                        <h3 className='title'>Quote valid until 27th April 2020</h3>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col'>
                        <div className='red-line' />
                      </div>
                    </div>
                    <div className='row mt-3'>
                      <div className='col'>We will take your monthly repayment as normal, unless you have settled your loan before then.</div>
                    </div>
                  </div>
                </div>
                <div className='red-box mt-4'>
                  <div className='container pt-3 pb-3' data-cy='info-right-to-withdraw'>
                    <div className='row'>
                      <div className='col'>
                        <h3 className='title' style={{ fontSize: '1.45em' }}>Your right to withdraw</h3>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col'>
                        <div className='red-line' />
                      </div>
                    </div>
                    <div className='row mt-3'>
                      <div className='col'>
                        <div>As you opened your loan within the last 14 days, you can withdraw from your agreement, by clicking ‘Withdraw from my agreement’.</div>
                        <div className='mt-2'>If you do this you are obliged to settle your loan balance within 30 days, from the day after you give us notice.</div>
                        <div className='mt-2'>If you don’t settle, you will be liable for the full balance of your loan plus interest, at the rate in your loan agreement.</div>
                        <div className='mt-2'>Interest will be charged from the date you signed the agreement.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*<Fragment>
              <h2 className='bold' style={{ marginTop: 30 }}>Withdraw from your loan agreement</h2>
              <p style={{ textAlign: 'center' }}>
                            There are not fees to close your loan early.
              </p>
              <nav className='primary-color-stripe' style={{ top: 0 }}>
                <div className='primary-color-stripe-content' style={{ justifyContent: 'space-evenly' }}>
                  <article>
                    <h4 className='white'>Loan balance</h4>
                    <h1 className='title white'>{`£${ Number(pageData.loan_info.balance_current).toFixed(2) }`}</h1>
                  </article>
                  <article>
                    <h4 className='white'>This months interest</h4>
                    <h1 className='title white'>{`${ Number(pageData.loan_info.apr).toFixed(2) }%`}</h1>
                  </article>
                  <article>
                    <h4 className='white'>Initial amount</h4>
                    <h1 className='title white'>{ `£${ Number(pageData.loan_info.balance_original).toFixed(2) } `}</h1>
                  </article>
                </div>
              </nav>
              <div className='header'>
                <h2 className='bold' style={{ marginTop: 30 }}>Your quote is valid until 27th April 2020</h2>
                <p style={{ textAlign: 'center' }}>
                            We will take your monthly repayment as normal, unless you have settled your loan before then.
                </p>
                <h2 className='bold' style={{ marginTop: 10 }}>Your right to withdraw</h2>
                <p style={{ textAlign: 'center' }}>
                            As you opened your loan within the last 14 days, you can withdraw from your agreement, by clicking ‘Withdraw from my agreement’ below.
                </p>
                <p style={{ textAlign: 'center' }}>
                            If you do this you are obliged to settle your loan balance within 30 days, from the day after you give us notice.
                </p>
                <p style={{ textAlign: 'center' }}>
                            If you don’t settle, you will be liable for the full balance of your loan plus interest, at the rate in your loan agreement.
                </p>
                <p style={{ textAlign: 'center' }}>
                            Interest will be charged from the date you signed the agreement.
                </p>
                <h2 className='bold' style={{ marginTop: 10 }}>This cannot be reversed.</h2>
                <button
                  className='button secondary-invert-color'
                  style={{ marginTop: 20, marginBottom: 30, width: 300, fontSize: '1.1em' }}
                  type='button'
                  onClick={ settlementLoanHandler }
                  data-cy='action-start-withdraw-agreement'
                >
                            Withdraw from loan
                </button>
              </div>
            </Fragment>*/}
          </div>
        ) : null
      }
    </Fragment>
  );
};

Withdrawal.propTypes = {
  initSettlement: PropTypes.bool,
  doSettlement: PropTypes.bool,
  payAndSettlement: PropTypes.bool,
  pageData: PropTypes.object,
  pathname: PropTypes.string,
  settlementLoanHandler: PropTypes.func,
  confirmSettlementLoanHandler: PropTypes.func,

};

Withdrawal.defaultProps = {
  initSettlement: null,
  doSettlement: null,
  payAndSettlement: null,
  pageData: {},
  pathname: '',
  settlementLoanHandler: () => {},
  confirmSettlementLoanHandler: () => {},
};

export default Withdrawal;
