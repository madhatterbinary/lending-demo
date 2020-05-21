import React, { useEffect, Fragment } from 'react';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import Toast from 'js/Components/Toasts';
import Spinner from 'js/Components/Spinner';
import OverpaymentForm from './OverpaymentForm';

moment.suppressDeprecationWarnings = true;

const OverpaymentFormWrapped = reduxForm({
  form: 'form-screen',
  enableReinitialize: true,
})(OverpaymentForm);

const MakePayment = ({ props }) => {
  const { formData, pageData, submitStepDataCSRF, message, errorNumber, isError, pathname, journeyTypeUpdate } = props;

  const { loadStepDataPublic } = useActions(actions);
  useEffect(() => {
    if (pathname === '/lending/servicing/manageloan/makepayment') {
      loadStepDataPublic('/lending/manage/');
    }
  }, [message, pathname]);


  const confirmSettlementLoanHandler = () => {
    loadStepDataPublic(journeyTypeUpdate);
  };

  const checkPaymentFormHandler = (values) => {
    submitStepDataCSRF('lending/manage/', values);
    localStorage.setItem('runOption', values.run_option);
  };

  if (!pageData || !pageData.loan_info) {
    if (document.getElementsByClassName('servicing-header')[0]) {
      document.getElementsByClassName('servicing-header')[0].style.display = 'none';
    }
    return <Spinner />;
  }
  if (document.getElementsByClassName('servicing-header')[0]) {
    document.getElementsByClassName('servicing-header')[0].style.display = 'block';
  }
  // 'customer_start_journey/?n=RIGHT_TO_WITHDRAWAL_JOURNEY' ////
  // 'customer_start_journey/?n=EARLY_SETTLEMENT_JOURNEY'

  return (
    <Fragment>
      { isError && message ? (
        <Toast
          message={ message }
          errorCode={ errorNumber }
          toastError={ isError }
        />
      ) : null }
      <p style={{ marginLeft: 20, marginBottom: 0 }}><strong>Overpayment</strong></p>
      <div className='container red-box mt-4 payment-manage-loan payment' data-cy='payment-manage-loan'>
        <div className='row'>
          <div className='col pt-2' style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
            <h3 className='title'>Make an overpayment</h3>
            <i className='fas fa-pound-sign' style={{ fontSize: '1.5em' }} />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <div className='red-line' />
          </div>
        </div>
        <div className='col' style={{ paddingRight: 0, paddingLeft: 0, paddingTop: 15 }}>
          <div className='pt-3 pb-3 mb-3'>
            <div className='row'>
              <div className='col m4-3'>
                <div className='row'>
                  <div className='col pt-3'>
                    <p>Making an overpayment will reduce the interest you pay on your loan.</p>
                    <p><strong>Make an additional payment on top of your next payment of { `£${ Number(pageData.loan_info.next_payment.payment_amount).toFixed(2) }`} on { moment(pageData.loan_info.next_payment.payment_date).format('ll') }</strong></p>
                  </div>
                </div>
                <div className='row'>
                  <div className='col pt-3'>
                    <p>We recommend you keep your monthly repayment
                      the same, and reduce your loan term, as this will
                      always save you the most interest.</p>
                  </div>
                </div>
              </div>
              <hr />
              <div className='col ml-3' style={{ paddingLeft: 0 }}>
                <div className='container m-0 p-0'>
                  <div className='col' style={{ paddingRight: 0, paddingLeft: 0 }}>
                    <OverpaymentFormWrapped
                      onSubmit={ (values) => checkPaymentFormHandler(values) }
                      initialValues={{ ...formData }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr style={{ marginBottom: '2rem' }} id='divider' />

      { journeyTypeUpdate === 'customer_start_journey/?n=RIGHT_TO_WITHDRAWAL_JOURNEY' ? (
        <Fragment>
          <p style={{ marginLeft: 20, marginBottom: 0 }}><strong>Withdrawal</strong></p>
          <div className='container red-box mt-4 payment-manage-loan withdrawal' data-cy='payment-manage-loan'>
            <div className='col' style={{ paddingRight: 0, paddingLeft: 0 }}>
              <div className='pt-3 pb-3 mb-3'>
                <div className='row'>
                  <div className='col m4-3'>
                    <div className='row'>
                      <div className='col pt-3'>
                        <div className='row'>
                          <div className='col pt-2' style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
                            <h3 className='title'>Quote valid until 27th April 2020</h3>
                            <i className='material-icons' style={{ color: '#E83D52', lineHeight: 'unset', position: 'relative', bottom: 5, fontSize: '1.8em' }}>event_note</i>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col'>
                            <div className='red-line' />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col pt-3'>
                        <p style={{ paddingTop: 15 }}>We will take your monthly repayment as normal, unless you have settled your loan before then.</p>
                        <p>As you opened your loan within the last 14 days, you can withdraw from your agreement, by clicking ‘Withdraw from my agreement’.</p>
                        <p>If you do this you are obliged to settle your loan balance within 30 days, from the day after you give us notice.</p>
                        <p>If you don’t settle, you will be liable for the full balance of your loan plus interest, at the rate in your loan agreement.</p>
                        <p>Interest will be charged from the date you signed the agreement.</p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className='col ml-3' style={{ paddingLeft: 0, marginTop: 62 }}>
                    <div className='container m-0 p-0'>
                      <div className='col' style={{ paddingRight: 0, paddingLeft: 0 }}>
                        <div className='row'>
                          <div className='col'>
                            <div className='container pt-3 pb-3' data-cy='info-withdrawal-warning' style={{ height: 310 }}>
                              <div className='row mb-2'>
                                <div className='col-8'><strong>Initial amount</strong></div>
                                <div className='col-4 text-right'>{`£${ Number(pageData.loan_info.balance_original).toFixed(2) }`}</div>
                              </div>
                              <div className='row mb-2'>
                                <div className='col'>
                                  <div className='grey-line' />
                                </div>
                              </div>
                              <div className='row mb-2'>
                                <div className='col-8'><strong>This month&lsquo;s interest</strong></div>
                                <div className='col-4 text-right'>{`${ Number(pageData.loan_info.apr).toFixed(2) }%`}</div>
                              </div>
                              <div className='row mb-2'>
                                <div className='col'>
                                  <div className='grey-line' />
                                </div>
                              </div>
                              <div className='row mb-2'>
                                <div className='col-8'><strong>Amount to close</strong></div>
                                <div className='col-4 text-right'>{`£${ Number(pageData.loan_info.balance_current).toFixed(2) }`}</div>
                              </div>
                              <div className='row mb-3'>
                                <div className='col'>
                                  <div className='grey-line' />
                                </div>
                              </div>
                              <div className='row mb-3'>
                                <div className='col'>
                                  There are no fees to close your loan early.
                                </div>
                              </div>
                              <div className='row' style={{ position: 'absolute', bottom: 0, right: 15 }}>
                                <div className='col text-right'>
                                  <button
                                    className='btn btn-primary'
                                    type='button'
                                    onClick={ confirmSettlementLoanHandler }
                                    data-cy='action-start-withdraw-agreement'
                                  >
                                    Withdraw from my agreement
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='container mt-4' style={{ width: 754 }}>
            <div className='pt-3 pb-3' data-cy='info-right-to-withdraw'>
              <div className='row'>
                <div className='col' style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3 className='title' style={{ fontSize: '1.45em' }}>Your right to withdraw</h3>
                  <i className='material-icons' style={{ color: '#E83D52', lineHeight: 'unset', fontSize: '1.8em' }}>playlist_add_check</i>
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
                  <div className='mt-2'><strong>This cannot be reverse.</strong></div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ) : null
          }
      { journeyTypeUpdate === 'customer_start_journey/?n=EARLY_SETTLEMENT_JOURNEY' ? (
        <Fragment>
          <p style={{ marginLeft: 20, marginBottom: 0 }}><strong>Close my loan</strong></p>
          <div className='container red-box mt-4 payment-manage-loan withdrawal' data-cy='payment-manage-loan'>
            <div className='col' style={{ paddingRight: 0, paddingLeft: 0 }}>
              <div className='pt-3 pb-3 mb-3'>
                <div className='row'>
                  <div className='col m4-3'>
                    <div className='row'>
                      <div className='col pt-3'>
                        <div className='row'>
                          <div className='col pt-2' style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
                            <h3 className='title'>Quote valid until 27th April 2020</h3>
                            <i className='material-icons' style={{ color: '#E83D52', lineHeight: 'unset', position: 'relative', bottom: 5, fontSize: '1.8em' }}>event_note</i>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col'>
                            <div className='red-line' />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col pt-3'>
                        <p style={{ paddingTop: 15 }}>We will take your monthly repayment as normal, unless you have settled your loan before then.</p>
                        <p>As you opened your loan within the last 14 days, you can withdraw from your agreement, by clicking ‘Withdraw from my agreement’.</p>
                        <p>If you do this you are obliged to settle your loan balance within 30 days, from the day after you give us notice.</p>
                        <p>If you don’t settle, you will be liable for the full balance of your loan plus interest, at the rate in your loan agreement.</p>
                        <p>Interest will be charged from the date you signed the agreement.</p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className='col ml-3' style={{ paddingLeft: 0, marginTop: 62 }}>
                    <div className='container m-0 p-0'>
                      <div className='col' style={{ paddingRight: 0, paddingLeft: 0 }}>
                        <div className='row'>
                          <div className='col'>
                            <div className='container pt-3 pb-3' data-cy='info-withdrawal-warning' style={{ height: 310 }}>
                              <div className='row mb-2'>
                                <div className='col-8'><strong>Initial amount</strong></div>
                                <div className='col-4 text-right'>{`£${ Number(pageData.loan_info.balance_original).toFixed(2) }`}</div>
                              </div>
                              <div className='row mb-2'>
                                <div className='col'>
                                  <div className='grey-line' />
                                </div>
                              </div>
                              <div className='row mb-2'>
                                <div className='col-8'><strong>This month&lsquo;s interest</strong></div>
                                <div className='col-4 text-right'>{`${ Number(pageData.loan_info.apr).toFixed(2) }%`}</div>
                              </div>
                              <div className='row mb-2'>
                                <div className='col'>
                                  <div className='grey-line' />
                                </div>
                              </div>
                              <div className='row mb-2'>
                                <div className='col-8'><strong>Amount to close</strong></div>
                                <div className='col-4 text-right'>{`£${ Number(pageData.loan_info.balance_current).toFixed(2) }`}</div>
                              </div>
                              <div className='row mb-3'>
                                <div className='col'>
                                  <div className='grey-line' />
                                </div>
                              </div>
                              <div className='row mb-3'>
                                <div className='col'>
                                  There are no fees to close your loan early.
                                </div>
                              </div>
                              <div className='row' style={{ position: 'absolute', bottom: 0, right: 15 }}>
                                <div className='col text-right'>
                                  <button
                                    className='btn btn-primary'
                                    type='button'
                                    onClick={ confirmSettlementLoanHandler }
                                    data-cy='action-start-withdraw-agreement'
                                  >
                                    Close my loan
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>

      ) : null
    }
    </Fragment>
  );
};

MakePayment.propTypes = {
  props: PropTypes.object,
  formData: PropTypes.object,
  pageData: PropTypes.object,
  submitStepDataCSRF: PropTypes.func,
  message: PropTypes.string,
  errorNumber: PropTypes.number,
  isError: PropTypes.bool,
  pathname: PropTypes.string,
  journeyTypeUpdate: PropTypes.string,
};
MakePayment.defaultProps = {
  props: {},
  formData: null,
  pageData: null,
  submitStepDataCSRF: () => {},
  message: '',
  errorNumber: 0,
  isError: false,
  pathname: '',
  journeyTypeUpdate: '',
};

export default MakePayment;
