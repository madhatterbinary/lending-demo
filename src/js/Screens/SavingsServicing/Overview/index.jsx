/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import SavingsServIcon1 from 'js/assets/images/savings-servIcon1.png';
import SavingsServIcon2 from 'js/assets/images/savings-servIcon2.png';
import SavingsServIcon3 from 'js/assets/images/savings-servIcon3.png';
import MaturityChart from 'js/assets/images/maturityChart.png';
import TableRow from 'js/Components/Table/TableRow.jsx';
import moment from 'moment';
import './Overview.scss';
import Popup from 'js/Components/Popup';
import uuid from 'uuid';
import ConfirmationBox from 'js/Components/ConfirmationBox';
import ContinueAppliaction from 'js/assets/images/ContinueAppliaction.png';

moment.suppressDeprecationWarnings = true;

const Overview = () => {
  const { pageData, maturity } = useSelector(state => ({
    pageData: state.stepData.pageData,
    maturity: state.stepData.pageData.election_decision_options,
  }));
  let activeSaving = null;
  const { loadStepDataPublic } = useActions(actions);
  const [toggleStateAddMoney, setToggleStateAddMoney] = useState(false);
  const [toggleStateBalance, setToggleStateBalance] = useState(false);
  const [toggleStateInterest, setToggleStateInterest] = useState(false);

  useEffect(() => {
    loadStepDataPublic('/savings/overview/');
  }, []);
  if (document.getElementsByClassName('servicing-header')[0]) {
    document.getElementsByClassName('servicing-header')[0].style.display = 'none';
  }
  // TODO: Update when backend can support actions on multiple loans at once
  if (pageData && pageData.deposits && pageData.deposits !== undefined) {
    activeSaving = pageData.deposits[0];
  }
  if (document.getElementsByClassName('servicing-header')[0]) {
    document.getElementsByClassName('servicing-header')[0].style.display = 'block';
  }
  if (activeSaving === null) return null;
  // TODO: Update when backend can support actions on multiple loans at once
  if (!pageData || !pageData.deposits || pageData.deposits === undefined) return <span>No Data</span>;
  activeSaving = pageData.deposits[0]; //funding_deadline
  const bookedAccounts = (pageData.deposits || []).filter((d) => d.status === 'BOOKED');
  // { `/savings/?tok=${ pageData.journeys_in_progress.ELECTION_JOURNEY_SINGLE_PRODUCT }` }
  if (pageData && pageData.journeys_in_progress && pageData.journeys_in_progress.ELECTION_JOURNEY_SINGLE_PRODUCT) {
    document.getElementsByClassName('container savings-servicing-header')[0].style.display = 'none';
    return (
      <div className='continue-maturity'>
        <ConfirmationBox
          header='Continue'
          subheader='It seems you have not yet completed your maturity application.'
          background={ ContinueAppliaction }
          btnText=' Continue application'
          btnLink={ `/savings/?tok=${ pageData.journeys_in_progress.ELECTION_JOURNEY_SINGLE_PRODUCT }` }
        />
      </div>
    );
  }
  if (pageData && pageData.journeys_in_progress && pageData.journeys_in_progress.SAVINGS_JOURNEY) {
    document.getElementsByClassName('container savings-servicing-header')[0].style.display = 'none';
    return (
      <div className='continue-maturity'>
        <ConfirmationBox
          header='Continue'
          subheader='It seems you have not yet completed your application journey.'
          background={ ContinueAppliaction }
          btnText=' Continue application'
          btnLink={ `/savings/?tok=${ pageData.journeys_in_progress.SAVINGS_JOURNEY }` }
        />
      </div>
    );
  }
  document.getElementsByClassName('container savings-servicing-header')[0].style.display = 'block';

  const togglePopupAddMoney = () => {
    setToggleStateAddMoney(!toggleStateAddMoney);
  };
  const togglePopupBalance = () => {
    setToggleStateBalance(!toggleStateBalance);
  };
  const togglePopupInterest = () => {
    setToggleStateInterest(!toggleStateInterest);
  };
  const expectedInterest = (activeSaving.current_balance * 2) / 100;
  const endOfTermBalance = parseInt(activeSaving.current_balance, 10) + parseInt(expectedInterest, 10);
  return (
    <div
      className='container mt-4'
      ref={ (el) => {
        if (el) {
          el.style.setProperty('margin-top', '0rem', 'important');
          el.style.setProperty('max-width', '990px', 'important');
        }
      } }
    >
      <div className='container red-box d-flex flex-column' style={{ alignSelf: 'center', marginBottom: 20, maxWidth: 990 }}>
        { pageData.deposits && activeSaving
          ? (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className='infobox' style={{ display: 'flex', paddingTop: 15 }}>
                <p style={{ marginRight: 20 }}><strong>Payment reference</strong> { activeSaving.funding_window.savings_reference }</p>
                <p><strong>Payee name</strong> Yobota | 20-00-00 | 3068765</p>
              </div>
              { activeSaving.current_balance !== '0.00' ? (
                <div style={{ paddingTop: 15, cursor: 'pointer' }} onClick={ togglePopupAddMoney }>How to add money to your account<i className='material-icons' style={{ paddingLeft: 10, color: '#E83D52' }}>
                  help_outline
                </i></div>
              ) : null}


            </div>
          ) : null
      }
        <div className='row mb-2'>
          <div className='col'>
            <div className='grey-line' />
          </div>
        </div>
        { activeSaving && activeSaving.current_balance
          ? (
            <div className={ activeSaving.current_balance !== '0.00' ? 'infochart maturity' : 'infochart' } style={{ display: 'flex', paddingTop: 0 }}>
              <p style={{ display: 'flex', flexDirection: 'column-reverse' }}><span style={{ fontSize: '2em' }}><strong>{ `£${ Number(activeSaving.current_balance).toFixed(2) }` }</strong></span> Deposit balance</p>
              <p style={{ display: 'flex', flexDirection: 'column-reverse' }}><span style={{ fontSize: '2em' }}><strong>{ `${ Number(activeSaving.aer) }%` }</strong></span> Interest rate</p>
              <div style={{ display: 'flex', flexDirection: 'column-reverse', lineHeight: '0.5' }} onClick={ togglePopupInterest }><span style={{ fontSize: '2em', color: '#06B713', marginBottom: 31 }}><strong>{ `£${ Number(expectedInterest).toFixed(2) }` }</strong></span><div style={{ display: 'flex', cursor: 'pointer' }}><p>Expected interest</p><i className='material-icons' style={{ paddingLeft: 10, color: '#E83D52' }}>
                help_outline
              </i></div></div>
              <div style={{ display: 'flex', flexDirection: 'column-reverse', lineHeight: '0.5' }} onClick={ togglePopupBalance }><span style={{ fontSize: '2em', color: '#06B713', marginBottom: 31 }}><strong>{ `£${ Number(endOfTermBalance).toFixed(2) }` }</strong></span><div style={{ display: 'flex', cursor: 'pointer' }}><p>End of term balance</p> <i className='material-icons' style={{ paddingLeft: 10, color: '#E83D52' }}>
                help_outline
              </i></div></div>
            </div>
          ) : null
      }

        <div className='row mb-2'>
          <div className='col'>
            <div className='grey-line' />
          </div>
        </div>
        { activeSaving.current_balance !== '0.00' ? (
          <div className='p-4'><img style={{ width: '100%' }} src={ MaturityChart } alt='maturity chart' /></div>
        ) : null}

      </div>
      { ((maturity || {}).accounts_eligible_for_rolling || {}).length !== 0 && activeSaving.current_balance !== '0.00' && pageData.deposits.length === 1 ? (
        <div className='endofterm-box' style={{ display: 'flex', flexDirection: 'column', border: 'solid #E83D52', padding: 10, marginBottom: 20, paddingLeft: 15, paddingRight: 15 }}>
          <h1>Don&apos;t forget</h1>
          <div className='endofterm-btn' style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10 }}>
            <div><p>You have until { moment(activeSaving.funding_deadline).format('ll') }  to choose your end of term option</p></div>
            <div className='row'>
              <div className='col text-right' style={{ marginTop: '-20px' }}>
                <Link to='/savings/servicing/endofterm'>
                  <button
                    className='btn btn-primary'
                    type='button'
                    data-cy='action-start-withdraw-agreement'
                  >
                    View your options
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className='container red-box d-flex flex-column' style={{ alignSelf: 'center', maxWidth: 990 }}>
        <div className='infobox'>
          <h2 style={{ marginBottom: 15, color: '#E83D52', marginTop: 10 }}>Transactions</h2>
          { activeSaving.current_balance !== '0.00' ? (
            <table className='table first-screen' style={{ backgroundColor: 'transparent' }}>
              <tbody>
                <tr>
                  <th><strong>Date</strong></th>
                  <th><strong>Type</strong></th>
                  <th><strong>Money in (£)</strong></th>
                  <th><strong>Balance (£)</strong></th>
                </tr>
                {((activeSaving || []).transactions || []).map((d, i) => {
                  return (
                    <TableRow
                      key={ uuid.v4() }
                      item1={ moment(d.date).format('ll') }
                      item2={ d.description }
                      item3={ d.money_in }
                      item4={ d.balance }
                      color='#06B713'
                    />
                  );
                })}
              </tbody>
            </table>
          ) : (
            <>
              <p><strong>You have no transactions to display at the moment</strong></p>
              <p>Your deposit window will close on <span style={{ color: '#E83D52' }}><strong>{ moment(activeSaving.funding_deadline).format('ll') }</strong></span></p>
              <p>Your must transfer between £1.000 and and £85.000 before your deposit window closes</p>
            </>
          )}


        </div>
      </div>

      { activeSaving.current_balance === '0.00' ? (
        <>
          <h1 style={{ textAlign: 'center', marginBottom: 50, marginTop: 20 }}>How to add money to your account</h1>
          <div className='container pb-5' style={{ maxWidth: 990 }}>
            <div className='row text-center' style={{ marginRight: '-21px', marginLeft: '-21px' }}>
              <div className='col' style={{ border: '1px solid', borderTop: 'transparent' }}>
                <div className='p-4'><img style={{ height: 100 }} src={ SavingsServIcon1 } alt='quick approve' /></div>
                <div className='p-4'>
                  <p><b>Go to your current account</b><br />you could do this online, on the phone or in branch depending on your bank.</p>
                </div>
              </div>
              <div className='col' style={{ border: '1px solid', borderTop: 'transparent', borderLeft: 'transparent' }}>
                <div className='p-4'><img style={{ height: 100 }} src={ SavingsServIcon2 } alt='no charges' /></div>
                <div
                  className='p-4'
                  style={{ width: 255 }}
                  ref={ (el) => {
                    if (el) {
                      el.style.setProperty('padding-left', '0rem', 'important');
                      el.style.setProperty('padding-right', '0rem', 'important');
                    }
                  } }
                >
                  <p><b>Using the details below, make the transfer</b><br /><br />use the reference <strong>{ activeSaving.funding_window.savings_reference }</strong></p>
                  <div style={{ display: 'flex', width: 244, justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ margin: 5 }}>Payee name</p>
                      <p><strong>Yobota</strong></p>
                    </div>
                    <div>
                      <p style={{ margin: 5 }}>Sort code</p>
                      <p><strong>{ activeSaving.sort_code }</strong></p>
                    </div>
                    <div>
                      <p style={{ margin: 5 }}>Account no.</p>
                      <p><strong>{ activeSaving.bank_account }</strong></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col' style={{ border: '1px solid', borderTop: 'transparent', borderLeft: 'transparent' }}>
                <div className='p-4'><img style={{ height: 100 }} src={ SavingsServIcon3 } alt='flexible loans' /></div>
                <div className='p-4'><p>You&nbsp;ll need to allow 1 working day for the money to show in your deposit account.</p></div>
              </div>
            </div>
          </div>
        </>
      ) : null}


      { toggleStateBalance ? (
        <Popup
          header=''
          closePopup={ togglePopupBalance }
          customRender={ () => (
            <div>HELLO 1</div>
          )
  }
        />
      ) : null
    }
      { toggleStateInterest ? (
        <Popup
          header=''
          closePopup={ togglePopupInterest }
          customRender={ () => (
            <div>HELLO 2</div>
          )
  }
        />
      ) : null
    }
      { toggleStateAddMoney ? (
        <Popup
          header='How to add money to your account'
          closePopup={ togglePopupAddMoney }
          customRender={ () => (
            <>
              <div className='container pb-5' style={{ maxWidth: 990 }}>
                <div className='row text-center' style={{ marginRight: '-21px', marginLeft: '-21px' }}>
                  <div className='col' style={{ border: '1px solid', borderTop: 'transparent' }}>
                    <div className='p-4'><img style={{ height: 100 }} src={ SavingsServIcon1 } alt='quick approve' /></div>
                    <div className='p-4'>
                      <p><b>Go to your current account</b><br />you could do this online, on the phone or in branch depending on your bank.</p>
                    </div>
                  </div>
                  <div className='col' style={{ border: '1px solid', borderTop: 'transparent', borderLeft: 'transparent' }}>
                    <div className='p-4'><img style={{ height: 100 }} src={ SavingsServIcon2 } alt='no charges' /></div>
                    <div
                      className='p-4'
                      style={{ width: 255 }}
                      ref={ (el) => {
                        if (el) {
                          el.style.setProperty('padding-left', '0rem', 'important');
                          el.style.setProperty('padding-right', '0rem', 'important');
                        }
                      } }
                    >
                      <p><b>Using the details below, make the transfer</b><br /><br />use the reference <strong>{ activeSaving.funding_window.savings_reference }</strong></p>
                      <div style={{ display: 'flex', width: 244, justifyContent: 'space-between' }}>
                        <div>
                          <p style={{ margin: 5 }}>Payee name</p>
                          <p><strong>Yobota</strong></p>
                        </div>
                        <div>
                          <p style={{ margin: 5 }}>Sort code</p>
                          <p><strong>{ activeSaving.sort_code }</strong></p>
                        </div>
                        <div>
                          <p style={{ margin: 5 }}>Account no.</p>
                          <p><strong>{ activeSaving.bank_account }</strong></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col' style={{ border: '1px solid', borderTop: 'transparent', borderLeft: 'transparent' }}>
                    <div className='p-4'><img style={{ height: 100 }} src={ SavingsServIcon3 } alt='flexible loans' /></div>
                    <div className='p-4'><p>You&nbsp;ll need to allow 1 working day for the money to show in your deposit account.</p></div>
                  </div>
                </div>
              </div>
            </>
          )
  }
        />
      ) : null
    }
    </div>
  );
};

export default Overview;
