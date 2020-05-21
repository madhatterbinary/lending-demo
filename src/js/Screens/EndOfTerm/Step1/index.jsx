/* eslint-disable prefer-destructuring */
import React, { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import moment from 'moment';
import Popup from 'js/Components/Popup';
import TableRow from 'js/Components/Table/TableRow.jsx';
import uuid from 'uuid';
import Spinner from 'js/Components/Spinner';

localStorage.setItem('MaturityWithdraw', 's');
const EndOfTermChoices = () => {
  const [selectedOriginalDepositId, selectAccount] = useState(null);
  const [toggleStateBalance, setToggleStateBalance] = useState(false);
  const [toggleStateAER, setToggleStateAER] = useState(false);
  const [toggleStateInterest, setToggleStateInterest] = useState(false);
  const [projectedBalance, setProjectedBalance] = useState([]);
  const [displayPersonallDetailsDialog, setDisplayPersonalDetailsDialog] = useState(false);
  let personDetails = {};

  const { pageData, accountId, balance, endpointResources } = useSelector(state => ({
    pageData: state.stepData.pageData,
    accountId: ((state.stepData.pageData || {}).election_decision_options || {}).accounts_eligible_for_rolling,
    balance: ((state.stepData.pageData || {}).election_decision_options || {}).accounts_eligible_for_rolling,
    endpointResources: state.stepData,
  }));

  const { loadStepDataPublic } = useActions(actions);
  let elegibleAccount = null;

  useEffect(() => {
    selectAccount(((accountId || {})[0] || []).original_deposit_account_id);
    setProjectedBalance(((balance || [])[0] || {}).projected_balance);
    if (pageData) {
      if (pageData.current_step === 'elect_full_refund') {
        localStorage.setItem('MaturityWithdraw', 'withdraw');
      }
    }
    loadStepDataPublic('/savings/end_of_term/');
  }, [((accountId || {})[0] || []).original_deposit_account_id]);
  const handleTogglePersoanlDetailsDialog = () => {
    setDisplayPersonalDetailsDialog(true);
  };
  if ((((pageData || {}).election_decision_options || {}).accounts_eligible_for_rolling || []).length) {
    elegibleAccount = pageData.election_decision_options.accounts_eligible_for_rolling[0];
  }
  const startDate = moment((elegibleAccount || {}).funding_deadline).format('ll');
  const endDate = moment((elegibleAccount || {}).roll_date).format('ll');
  const balanceMaturrity = (elegibleAccount || {}).current_balance;
  if (!(((pageData || {}).election_decision_options || {}).accounts_eligible_for_rolling || []).length) {
    return <Spinner />;
  }
  const togglePopupBalance = () => {
    setToggleStateBalance(!toggleStateBalance);
  };
  const togglePopupAER = () => {
    setToggleStateAER(!toggleStateAER);
  };
  const togglePopupInterest = () => {
    setToggleStateInterest(!toggleStateInterest);
  };

  const costumRender = (code) => {
    return (
      <button
        className='btn btn-primary'
        style={{ marginBottom: 0 }}
        type='button'
        onClick={
                  () => loadStepDataPublic(`/savings/election_journey/start?new_product_code=${ code }&original_deposit_account_id=${ selectedOriginalDepositId }`)
                }
      >
        Find out more
      </button>
    );
  };

  if ((endpointResources || {}).email_addresses && (endpointResources || {}).person_bank_accounts) {
    personDetails = {
      // eslint-disable-next-line max-len
      name: `${ ((endpointResources || {}).person_details || {}).person_title } ${ ((endpointResources || {}).person_details || {}).first_name } ${ ((endpointResources || {}).person_details || {}).last_name }`,
      email: endpointResources.email_addresses[0].email_address,
      accountNumber: endpointResources.person_bank_accounts[0].account_number,
      branchCode: endpointResources.person_bank_accounts[0].branch_code,
    };
  }

  return (
    <>
      { localStorage.getItem('MaturityWithdraw') === 'withdraw'
        ? (
          <div className='container savings-servicing-overview'>
            <h1 style={{ marginBottom: 50 }}>You&apos;ve chosen to withdraw your savings</h1>
            <p>We&apos;ll send your savings plus interest back to you</p>
            <div className='savings-servicing-election-success'>
              <h1 style={{ marginBottom: 50 }}>Your savings account - closing soon</h1>
              <table className='table' style={{ backgroundColor: 'transparent' }}>
                <tbody>
                  <tr style={{ backgroundColor: 'rgba(232, 61, 82, 0.07)' }}>
                    <th><strong>Start date</strong></th>
                    <th><strong>End date</strong></th>
                    <th><strong>AER%</strong></th>
                    <th><strong>Balance on <br />Maturity</strong></th>
                  </tr>
                  <>
                    <TableRow
                      key={ uuid.v4() }
                      item1={ startDate }
                      item2={ endDate }
                      item3={ `${ 2 }%` }
                      item4={ `£${ balanceMaturrity }` }
                      color='grey'
                    />
                  </>
                  {/* // ))} */}
                </tbody>
              </table>
              <p>Your remaining balance will be returned to the bank account we have saved for you one day after your
                fixed term ends</p>
              <div className='container' style={{ width: 990, paddingLeft: 0 }}>
                <div className='row'>
                  <div className='col'>
                    <h1 style={{ marginBottom: 30 }}>Check your bank details</h1>
                    <p>So that we can return your remaining savings balance
                      safely and securely to you, please check that your bank
                      details are correct.</p>
                  </div>
                  <div className='col'>
                    <div className='col pr-3'>
                      <div className='container red-box d-flex flex-column' style={{ height: '100%' }}>
                        <div className='row' style={{ marginRight: '-17px', marginLeft: '-17px' }}>
                          <div className='col p-0 m-3'>
                            {!displayPersonallDetailsDialog
                              ? (
                                <Fragment>
                                  <div className='non-editable' data-cy='info-person-details' style={{ height: `${ 100 }%` }}>
                                    <div
                                      className='row pb-3'
                                      ref={ (el) => {
                                        if (el) {
                                          el.style.setProperty('margin-left', '0px');
                                          el.style.setProperty('padding', '0px', 'important');
                                        }
                                      } }
                                    >
                                      <h3 className='title'>bank account details</h3>
                                      <div
                                        className='col d-flex justify-content-end h-100'
                                        ref={ (el) => {
                                          if (el) {
                                            el.style.setProperty('height', '25px', 'important');
                                            el.style.setProperty('top', '10px');
                                          }
                                        } }
                                      >
                                        {!displayPersonallDetailsDialog
                                          ? (
                                            <i
                                              data-cy='action-edit-personal-details'
                                              className='material-icons text-primary d-flex align-items-end'
                                              onClick={ handleTogglePersoanlDetailsDialog }
                                              style={{ marginBottom: 0, fontSize: '1.6em', color: '#E83D52', lineHeight: 'unset', cursor: 'pointer', position: 'relative', bottom: 5 }}
                                            >edit</i>
                                          ) : null }
                                      </div>
                                    </div>
                                    <div className='row' style={{ marginBottom: 15 }}>
                                      <div className='col'>
                                        <div className='red-line' />
                                      </div>
                                    </div>
                                    <p className='bold-text'><strong>Account holder name</strong></p>
                                    <p>{ (personDetails || {}).name }</p>
                                    <div className='row' style={{ marginBottom: 15 }}>
                                      <div className='col'>
                                        <div className='grey-dotted-line' />
                                      </div>
                                    </div>
                                    <p className='bold-text'><strong>Sort code</strong></p>
                                    <p>{ (personDetails || {}).branchCode }</p>
                                    <div className='row' style={{ marginBottom: 15 }}>
                                      <div className='col'>
                                        <div className='grey-dotted-line' />
                                      </div>
                                    </div>
                                    <p className='bold-text'><strong>Account number</strong></p>
                                    <p>{ (personDetails || {}).accountNumber }</p>
                                    <div className='row' style={{ marginBottom: 15 }}>
                                      <div className='col'>
                                        <div className='grey-dotted-line' />
                                      </div>
                                    </div>
                                  </div>
                                </Fragment>
                              ) : (
                                <div>coming soon...</div>
                            // <div className='editable-form'>
                            //   <PersonalDetailsFormFieldsWrapped
                            //     onSubmit={ (values) => onSubmitPersonalDetails(values) }
                            //     initialValues={ formData }
                            //     options={ options }
                            //   />
                            // </div>
                              )
                        }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-2' style={{ marginTop: 50 }}>
              <div className='col'>
                <div className='grey-line' />
              </div>
            </div>
            <h1 style={{ marginBottom: 30 }}>There is still time…</h1>
            <div style={{ marginBottom: 30 }}>It&apos;s not too late to change your mind and reinvest some or all your savings
              with us before your fixed term ends. Take a look at our market leading rates.</div>
          </div>
        )
        : (
          <div className='container savings-servicing-overview' style={{ maxWidth: 990 }}>
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
            { toggleStateAER ? (
              <Popup
                header=''
                closePopup={ togglePopupAER }
                customRender={ () => (
                  <div>HELLO 2</div>
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
                  <div>HELLO 3</div>
                )
          }
              />
            ) : null
          }
            <div className='form-container maturity'>
              <div style={{ paddingBottom: 7 }}>Your fixed term will end on <strong>{ moment(elegibleAccount.term_end_date).format('ll') }</strong> You have until <strong>{ moment(elegibleAccount.roll_date).format('ll') }</strong></div>
              <div style={{ paddingBottom: 15 }}>To choose what would you like to do with your savings</div>
              <div className='container red-box d-flex flex-column' style={{ alignSelf: 'center', marginBottom: 20, maxWidth: 990 }}>
                <h1 style={{ marginBottom: 50 }}>Annual Saver summary</h1>
                <div className='cal-box' style={{ display: 'flex', paddingTop: 0, justifyContent: 'space-between', paddingRight: 70 }}>
                  <div style={{ display: 'flex', flexDirection: 'column-reverse', lineHeight: '0.5' }}><span style={{ fontSize: '2em', marginBottom: 31 }}><strong>{ elegibleAccount.current_balance }</strong></span><div style={{ display: 'flex', cursor: 'pointer', justifyContent: 'space-between' }}><p>Balance</p><i className='material-icons' style={{ paddingLeft: 10, color: '#E83D52', marginBottom: 15 }} onClick={ togglePopupBalance }>
                    help_outline
                  </i></div></div>
                  <div style={{ display: 'flex', flexDirection: 'column-reverse', lineHeight: '0.5' }}><span style={{ fontSize: '2em', marginBottom: 31 }}><strong>2.00%</strong></span><div style={{ display: 'flex', cursor: 'pointer', justifyContent: 'space-between' }}><p>AER</p><i className='material-icons' style={{ paddingLeft: 10, color: '#E83D52', marginBottom: 15 }} onClick={ togglePopupAER }>
                    help_outline
                  </i></div></div>
                  <div style={{ display: 'flex', flexDirection: 'column-reverse', lineHeight: '0.5' }}><span style={{ fontSize: '2em', color: '#06B713', marginBottom: 31 }}><strong>{ elegibleAccount.interest_earned_at_end_of_term }</strong></span><div style={{ display: 'flex', cursor: 'pointer', justifyContent: 'space-between' }}><p>Interest</p><i className='material-icons' style={{ paddingLeft: 10, color: '#E83D52', marginBottom: 15 }} onClick={ togglePopupInterest }>
                    help_outline
                  </i></div></div>
                </div>
              </div>
              <div style={{ paddingBottom: 10 }}>You can choose to reinvest some or all of your savings balance into another account</div>
              <div style={{ paddingBottom: 30 }}>With us or we can send the money straight back to you.</div>
              <h1 style={{ marginBottom: 30 }}>Reinvest some or all of your savings.</h1>
              <div style={{ paddingBottom: 10 }}>Open a new fixed term savings account at a marrket-leading rate.</div>

              <div style={{ paddingBottom: 10 }}>We&apos;ll open your new savings account as soon as your current one close.</div>

              <div style={{ paddingBottom: 30 }}>Once yourr new savings account is open, you&apos;ll be able to deposit more funds during the 14 days deposit window</div>
            </div>
          </div>

        )}
      <div className={ localStorage.getItem('MaturityWithdraw') === 'withdraw' ? 'container form-container maturity withdraw' : 'container form-container maturity' }>
        <table className='table' style={{ backgroundColor: 'transparent' }}>
          <tbody>
            <tr style={{ backgroundColor: 'rgba(232, 61, 82, 0.07)' }}>
              <th><strong>Fixed term</strong></th>
              <th><strong>AER*</strong></th>
              <th><strong>Interest on £{pageData.election_decision_options.accounts_eligible_for_rolling[0].projected_balance}</strong></th>
              <th />
            </tr>
            {pageData.election_decision_options.available_roll_products.map((account) => (
              <>
                <TableRow
                  key={ uuid.v4() }
                  item1={ `${ parseInt(account.term_minimum_duration / 365, 0) } Year` }
                  item2={ `${ Number(account.headline_aer).toFixed(2) }%` }
                  item3={ `£ ${ parseInt(((projectedBalance * account.headline_aer) / 100) + parseInt(projectedBalance, 10), 10) }` }
                  item4={ costumRender(account.product_code) }
                />
              </>
              // ) : null
            ))}
          </tbody>
        </table>
        <div className='form-container' style={{ display: 'flex', flexDirection: 'column' }}>
          { localStorage.getItem('MaturityWithdraw') === 'withdraw'
            ? (
              <Link to='/savings/servicing'>
                <button
                  className='btn btn-primary'
                  style={{ marginBottom: 20, width: 250, alignSelf: 'end' }}
                  type='button'
                >
                  Back to overview
                </button>
              </Link>
            )
            : (
              <>
                <h1 style={{ marginBottom: 50 }}>Withdraw your savings</h1>
                <div style={{ paddingBottom: 15 }}>If you&apos;d like your saving balance plus interest to be sent back to you, choose this option.</div>
                <div style={{ paddingBottom: 15 }}>We&apos;ll transfer your money back to you one day after your fixed term ends.</div>
                <button
                  className='btn btn-primary'
                  style={{ marginBottom: 20, width: 250, alignSelf: 'end' }}
                  type='button'
                  onClick={
                  () => loadStepDataPublic(`/savings/elect_full_refund?deposit_account_id=${ selectedOriginalDepositId }`)
                }
                >
                  Send my savings back to me
                </button>
              </>
            )
          }

        </div>
      </div>
    </>
  );
};

export default EndOfTermChoices;
