import React, { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import TableRow from 'js/Components/Table/TableRow.jsx';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import uuid from 'uuid';
import moment from 'moment';

const EndOfTermSuccess = () => {
  const { pageData, endpointResources } = useSelector(state => ({
    pageData: state.stepData.pageData,
    endpointResources: state.stepData,
  }));
  const { loadStepDataPublic } = useActions(actions);
  const [displayPersonallDetailsDialog, setDisplayPersonalDetailsDialog] = useState(false);
  let personDetails = {};

  useEffect(() => {
    loadStepDataPublic('/savings/election_journey/success/');
  }, [loadStepDataPublic]);
  if (pageData === undefined || pageData.original_account === undefined || pageData.allocations === undefined || pageData.allocations[0] === undefined) { return null; }
  const originalAccount = pageData.original_account;
  const allocations = pageData.allocations || [];
  const newAccount = allocations[0].new_account;
  const startDate = moment((originalAccount || {}).funding_deadline).format('ll');
  const endDate = moment((originalAccount || {}).maturity_date).format('ll');
  // eslint-disable-next-line prefer-destructuring
  const aer = (originalAccount || {}).aer;
  const getAERAmount = (aerValue) => {
    let decimalAer = 0;
    const parsePercent = parseFloat(`${ aerValue }%`);
    if (parsePercent !== null) {
      decimalAer = parsePercent / 100;
    }
    return decimalAer;
  };
  const balanceMaturity = parseInt((originalAccount || {}).current_balance, 10) + parseInt((originalAccount || {}).current_balance * getAERAmount(aer), 10);
  const reinvesting = (allocations[0] || []).amount;
  let remainingBalance = 0;
  //opening soon account
  const newAccStartDate = moment(((newAccount || {}).funding_window || {}).deadline).format('ll');
  const newAccEndDate = moment((newAccount || {}).maturity_date).format('ll');

  const newAccAer = (newAccount || {}).aer;
  const oldAccTotalInterest = reinvesting * getAERAmount(aer);
  const newAccTotalInterest = reinvesting * getAERAmount(newAccAer);

  if (reinvesting) {
    remainingBalance = balanceMaturity - reinvesting;
  }

  const handleTogglePersoanlDetailsDialog = () => {
    setDisplayPersonalDetailsDialog(true);
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
    <div className='container savings-servicing-overview'>
      <h1 style={{ marginBottom: 50 }}>You&apos;ve chosen to reinvest your savings</h1>
      <p>Take a look at the details below and check everything&apos;s correct.</p>
      <div className='savings-servicing-election-success'>
        <h1 style={{ marginBottom: 50 }}>Your savings account - closing soon</h1>
        { reinvesting === parseFloat(balanceMaturity).toFixed(2)
          ? (
            <table className='table' style={{ backgroundColor: 'transparent' }}>
              <tbody>
                <tr style={{ backgroundColor: 'rgba(232, 61, 82, 0.07)' }}>
                  <th><strong>Start date</strong></th>
                  <th><strong>End date</strong></th>
                  <th><strong>AER%</strong></th>
                  <th><strong>Total deposited</strong></th>
                  <th><strong>Interest Earned</strong></th>
                </tr>
                <>
                  <TableRow
                    key={ uuid.v4() }
                    item1={ startDate }
                    item2={ endDate }
                    item3={ `${ parseFloat(aer).toFixed(2) }%` }
                    item4={ `£${ parseFloat(balanceMaturity).toFixed(2) }` }
                    item5={ `£${ parseFloat(oldAccTotalInterest).toFixed(2) }` }
                    color='grey'
                  />
                </>
              </tbody>
            </table>
          )
          : (
            <table className='table' style={{ backgroundColor: 'transparent' }}>
              <tbody>
                <tr style={{ backgroundColor: 'rgba(232, 61, 82, 0.07)' }}>
                  <th><strong>Start date</strong></th>
                  <th><strong>End date</strong></th>
                  <th><strong>AER%</strong></th>
                  <th><strong>Balance on <br />Maturity</strong></th>
                  <th><strong>Reinvesting</strong></th>
                  <th><strong>Remaining <br />Balance</strong></th>
                </tr>
                <>
                  <TableRow
                    key={ uuid.v4() }
                    item1={ startDate }
                    item2={ endDate }
                    item3={ `${ parseFloat(aer).toFixed(2) }%` }
                    item4={ `£${ balanceMaturity }` }
                    item5={ `£${ reinvesting }` }
                    item6={ `£${ remainingBalance }` }
                    color='grey'
                  />
                </>
              </tbody>
            </table>
          )
      }
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
        {/* <div className='form-container'>
          <h2>From:</h2>
          <p>Original account id: {(originalAccount || {}).original_deposit_account_id}</p>
          <p>Current balance: {(originalAccount || {}).current_balance}</p>
          <p>Roll date: {(originalAccount || {}).maturity_date}</p>
        </div>

        {allocations.map((allocation) => (
          <div className='form-container'>
            <h2>To:</h2>
            <p>Account number code: {allocation.new_account.account_number}</p>
            <p>Maturity date: {allocation.new_account.maturity_date}</p>
            <p>Funding deadline: {allocation.new_account.funding_deadline}</p>
            <p>AER: {allocation.new_account.aer}</p>
            <p>Amount moved: {allocation.amount}</p>
          </div>
        ))} */}
      </div>
      {/* /////////////////////////////////////////// */}
      <Fragment>
        <div className='savings-servicing-election-success'>
          <h1 style={{ marginTop: 50, marginBottom: 40 }}>Your savings account - Opening soon</h1>
          <table className='table' style={{ backgroundColor: 'transparent' }}>
            <tbody>
              <tr style={{ backgroundColor: 'rgba(232, 61, 82, 0.07)' }}>
                <th><strong>Start date</strong></th>
                <th><strong>End date</strong></th>
                <th><strong>AER%</strong></th>
                <th><strong>Starting balance</strong></th>
                <th><strong>Total interest</strong></th>
              </tr>
              {/* {pageData.election_decision_options.available_roll_products.map((account) => ( */}
              <>
                <TableRow
                  key={ uuid.v4() }
                  item1={ newAccStartDate }
                  item2={ newAccEndDate }
                  item3={ `${ parseFloat(newAccAer).toFixed(2) }%` }
                  item4={ `£${ reinvesting }` }
                  item5={ `£${ parseFloat(newAccTotalInterest).toFixed(2) }` }
                  color='grey'
                />
              </>
              {/* // ))} */}
            </tbody>
          </table>
          <p>Once your new fixed term begin, you’ll have a 14 day deposit window to top up your funds if you want,
            Up to the balance of £85,000</p>
          <div className='container' style={{ width: 990, paddingLeft: 0 }}>
            <div className='row'>
              <div className='col'>
                <h1 style={{ marginBottom: 30 }}>Planning on topping up your savings balance?</h1>
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
      </Fragment>
      <div style={{ textAlign: 'end', marginTop: 50 }}>
        <Link to='/savings/servicing'>
          <button
            className='btn btn-primary'
            type='submit'
          >Back to overview</button>
        </Link>
      </div>
    </div>
  );
};

export default EndOfTermSuccess;
