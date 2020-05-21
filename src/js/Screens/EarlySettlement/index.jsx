import React, { useEffect, Fragment } from 'react';
import 'js/Screens/LendingServicing/ManageLoan/ManageLoan.scss';
import PropTypes from 'prop-types';
import { Link, Route, Switch } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import EarlySettlementCardDetails from 'js/Screens/EarlySettlement/EarlySettlementCardDetails';
import SettlementRedirect from 'js/Screens/EarlySettlement/SettlementRedirect';
import SettlementCompleted from 'js/Screens/EarlySettlement/SettlementCompleted';
import SettlementFinalising from 'js/Screens/EarlySettlement/SettlementFinalising';


const EarlySettlement = (props) => {
  const { initSettlement, doSettlement, payAndSettlement, pathname, pageData, settlementLoanHandler, confirmSettlementLoanHandler } = props;
  useEffect(() => {
  }, [initSettlement, doSettlement, payAndSettlement, pathname, pageData]);

  return (
  // cut here start
    <Fragment>
      <Switch>
        <Route path='/lending/servicing/manageloan/earlysettlement/carddetails' exact component={ EarlySettlementCardDetails } />
        <Route path='/lending/servicing/manageloan/earlysettlement/redirect' component={ SettlementRedirect } />
        <Route path='/lending/servicing/manageloan/earlysettlement/finalising' component={ SettlementFinalising } />
        <Route path='/lending/servicing/manageloan/earlysettlement/completed' component={ SettlementCompleted } />
      </Switch>
      {(initSettlement || doSettlement) && pathname !== '/payment/processing'
              && !pathname.includes('/lending/servicing/manageloan/earlysettlement/')
        ? (
          <div className='container'>
            <div className='row'>
              <div className='col mt-4'>
                <h3>Close my loan</h3>
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
                  <div className='row'>
                    <div className='col'>
                      <h3>Close your loan</h3>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col'>
                      <div className='red-line' />
                    </div>
                  </div>
                  <div className='row mb-3'>
                    <div className='col'>
                      There are no fees to close your loan early.
                      Closing your loan early will reduce the interest
                      you pay.
                    </div>
                  </div>
                  <div className='row mb-2'>
                    <div className='col-8'><strong>Initial amount</strong></div>
                    <div className='col-4 text-right'>{`£${ Number(pageData.loan_info.balance_original).toFixed(2) }`}</div>
                  </div>
                  <div className='row mb-2'>
                    <div className='col'>
                      <div className='red-line' />
                    </div>
                  </div>
                  <div className='row mb-2'>
                    <div className='col-8'><strong>This month&lsquo;s interest</strong></div>
                    <div className='col-4 text-right'>{`${ Number(pageData.loan_info.apr).toFixed(2) }%`}</div>
                  </div>
                  <div className='row mb-2'>
                    <div className='col'>
                      <div className='red-line' />
                    </div>
                  </div>
                  <div className='row mb-2'>
                    <div className='col-8'><strong>Amount to close</strong></div>
                    <div className='col-4 text-right'>{`£${ Number(pageData.loan_info.balance_current).toFixed(2) }`}</div>
                  </div>
                  <div className='row mb-3'>
                    <div className='col'>
                      <div className='red-line' />
                    </div>
                  </div>
                  {initSettlement && !doSettlement ? (
                    <Fragment>
                      <div className='row'>
                        <div className='col text-right'>
                          <button
                            className='btn btn-primary'
                            type='button'
                            onClick={ settlementLoanHandler }
                            data-cy='action-start-withdraw-agreement'
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <div className='row mb-3'>
                        <div className='col text-primary'>
                          <div className='mb-2'>Your loan repayment is due soon, so we can’t
                            cancel your monthly Direct Debit on time.</div><br />
                          <div className='mb-2'>If you go ahead and close your loan today, your
                            regular repayment will go out as usual, but
                            we’ll refund the money back to you as soon as
                            we can.</div>
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
                            Close your loan
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
              </div>
            </div>
            {payAndSettlement
              ? (
                <div className='header'>
                  <h2 className='bold' style={{ position: 'relative', top: 25 }}>Thanks for your paymenttt</h2>
                  <nav className='primary-color-stripe' style={{ marginTop: 80 }}>
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
                        <h4 className='white'>Settlement amount</h4>
                        <h1 className='title white'>{ `£${ Number(pageData.loan_info.balance_original).toFixed(2) } `}</h1>
                      </article>
                    </div>
                  </nav>
                  <p style={{ marginTop: 10 }}>Making an overpayment will reduce the interest you pay on your loan.</p>
                </div>
              ) : null
            }
          </div>

        ) : null
      }
    </Fragment>
  );
};

EarlySettlement.propTypes = {
  initSettlement: PropTypes.bool,
  doSettlement: PropTypes.bool,
  payAndSettlement: PropTypes.bool,
  pageData: PropTypes.object,
  pathname: PropTypes.string,
  settlementLoanHandler: PropTypes.func,
  confirmSettlementLoanHandler: PropTypes.func,
};

EarlySettlement.defaultProps = {
  initSettlement: null,
  doSettlement: null,
  payAndSettlement: null,
  pageData: {},
  pathname: '',
  settlementLoanHandler: () => {},
  confirmSettlementLoanHandler: () => {},
};

export default EarlySettlement;
