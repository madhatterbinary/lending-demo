import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import * as actionsGeneric from 'js/Store/Actions/generic';
import Opacity from 'js/Components/Animations/Opacity';
import moment from 'moment';

const UserInputOverview = () => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    emailAddress,
    phoneNumber,
    addressLineOne,
    addressLineTwo,
    moveInDate,
    residentialStatus,
    postcode,
    postTown,
    accountNumber,
    sortCode,
    employmentStatus,
    userProvidedIncomeAmount,
    userProvidedIncomePeriod,
    totalMonthlyExpenditure,
    loanAmount,
    termInMonths,
    loanMonthlyPayments,
    loanTotalPayable,
    loanPersonalisedRate,
  } = useSelector(state => ({
    pageData: state.stepData.pageData,
    firstName: ((((state || {}).stepData || {}).pageData || {}).overview_data || {}).first_name,
    lastName: ((((state || {}).stepData || {}).pageData || {}).overview_data || {}).last_name,
    dateOfBirth: ((((state || {}).stepData || {}).pageData || {}).overview_data || {}).date_of_birth,
    emailAddress: ((((state || {}).stepData || {}).pageData || {}).overview_data || {}).email_address,
    phoneNumber: ((((state || {}).stepData || {}).pageData || {}).overview_data || {}).phone_number,
    addressLineOne: ((((((state || {}).stepData || {}).pageData || {}).overview_data || {}).addresses || [])[0] || []).line_1,
    addressLineTwo: ((((((state || {}).stepData || {}).pageData || {}).overview_data || {}).addresses || [])[0] || []).line_2,
    postcode: ((((((state || {}).stepData || {}).pageData || {}).overview_data || {}).addresses || [])[0] || []).postcode,
    postTown: ((((((state || {}).stepData || {}).pageData || {}).overview_data || {}).addresses || [])[0] || []).post_town,
    moveInDate: ((((((state || {}).stepData || {}).pageData || {}).overview_data || {}).addresses || [])[0] || []).move_in_date,
    residentialStatus: ((((((state || {}).stepData || {}).pageData || {}).overview_data || {}).addresses || [])[0] || []).residential_status,
    accountNumber: ((((state || {}).stepData || {}).pageData || {}).overview_data || {}).account_number,
    sortCode: ((((state || {}).stepData || {}).pageData || {}).overview_data || {}).sort_code,
    employmentStatus: ((((state || {}).stepData || {}).pageData || {}).overview_data || {}).employment_status,
    userProvidedIncomeAmount: ((((state || {}).stepData || {}).pageData || {}).overview_data || {}).user_provided_income_amount,
    userProvidedIncomePeriod: ((((state || {}).stepData || {}).pageData || {}).overview_data || {}).user_provided_income_period,
    totalMonthlyExpenditure: ((((state || {}).stepData || {}).pageData || {}).overview_data || {}).total_monthly_expenditure,
    loanAmount: (((((state || {}).stepData || {}).pageData || {}).overview_data || {}).loan_data || {}).loan_amount,
    termInMonths: (((((state || {}).stepData || {}).pageData || {}).overview_data || {}).loan_data || {}).term_in_months,
    loanMonthlyPayments: (((((state || {}).stepData || {}).pageData || {}).overview_data || {}).loan_data || {}).loan_monthly_payments,
    loanTotalPayable: (((((state || {}).stepData || {}).pageData || {}).overview_data || {}).loan_data || {}).loan_total_payable,
    loanPersonalisedRate: (((((state || {}).stepData || {}).pageData || {}).overview_data || {}).loan_data || {}).loan_personalised_rate,
  }));

  const { loadStepDataPublic, submitStepDataCSRF } = useActions(actionsGeneric);

  useEffect(() => {
    loadStepDataPublic('/lending/user_input_overview/');
  }, [loadStepDataPublic]);

  return (
    <Opacity speed={ 300 }>
      <div className='container direct-debit-mandate-screen'>
        <h1 style={{ marginBottom: 30 }}>These are all your details</h1>
        <p>Please check that the data you&nbsp;ve provided is correct</p><br /><br />
        <div
          className='bg-light-gray pl-5 pt-4 pb-5 pr-5'
          style={{ width: 500 }}
          ref={ (el) => {
            if (el) {
              el.style.setProperty('padding', '20px', 'important');
            }
          } }
        >
          <div className='row pb-3'>
            <div className='col'>
              <h3 className='title'>About you</h3>
            </div>
          </div>
          <div className='row' style={{ marginLeft: 0, justifyContent: 'space-between', marginRight: 10 }}>
            <div className='pt-4'>Full name</div>
            <p className='pt-3'><strong>{ firstName } { lastName }</strong></p>
          </div>
          <div className='row' style={{ marginLeft: 0, justifyContent: 'space-between', marginRight: 10 }}>
            <div className='pt-4'>Date of birth</div>
            <p className='pt-3'><strong>{ moment(dateOfBirth).format('ll') }</strong></p>
          </div>
          <div className='row' style={{ marginLeft: 0, justifyContent: 'space-between', marginRight: 10 }}>
            <div className='pt-4'>Emails</div>
            <p className='pt-3'><strong>{ emailAddress }</strong></p>
          </div>
          <div className='row' style={{ marginLeft: 0, justifyContent: 'space-between', marginRight: 10 }}>
            <div className='pt-4'>Phone number</div>
            <p className='pt-3'><strong>{ phoneNumber }</strong></p>
          </div>
        </div>
        <br />
        <div
          className='bg-light-gray pl-5 pt-4 pb-5 pr-5'
          style={{ width: 500 }}
          ref={ (el) => {
            if (el) {
              el.style.setProperty('padding', '20px', 'important');
            }
          } }
        >
          <div className='row pb-3'>
            <div className='col'>
              <h3 className='title'>Living situation</h3>
            </div>
          </div>
          <div className='row' style={{ marginLeft: 0, justifyContent: 'space-between', marginRight: 10 }}>
            <div className='pt-4'>Address 1</div>
            <p className='pt-3' style={{ textAlign: 'right' }}><strong>{ addressLineOne }, <br />{ addressLineTwo } <br /> { postcode } { postTown }</strong></p>
          </div>
          <div className='row' style={{ marginLeft: 0, justifyContent: 'space-between', marginRight: 10 }}>
            <div className='pt-4'>Move in date</div>
            <p className='pt-3'><strong>{ moment(moveInDate).format('ll') }</strong></p>
          </div>
          <div className='row' style={{ marginLeft: 0, justifyContent: 'space-between', marginRight: 10 }}>
            <div className='pt-4'>Tenancy status</div>
            <p className='pt-3'><strong>{ residentialStatus }</strong></p>
          </div>
        </div>
        <br />
        <div
          className='bg-light-gray pl-5 pt-4 pb-5 pr-5'
          style={{ width: 500 }}
          ref={ (el) => {
            if (el) {
              el.style.setProperty('padding', '20px', 'important');
            }
          } }
        >
          <div className='row pb-3'>
            <div className='col'>
              <h3 className='title'>Income</h3>
            </div>
          </div>
          <div className='row' style={{ marginLeft: 0, justifyContent: 'space-between', marginRight: 10 }}>
            <div className='pt-4'>Employement status</div>
            <p className='pt-3'><strong>{ employmentStatus }</strong></p>
          </div>
          <div className='row' style={{ marginLeft: 0, justifyContent: 'space-between', marginRight: 10 }}>
            <div className='pt-4'>Income</div>
            <p className='pt-3'><strong>{ `£${ Number(userProvidedIncomeAmount).toFixed(2) } ` }</strong></p>
          </div>
          <div className='row' style={{ marginLeft: 0, justifyContent: 'space-between', marginRight: 10 }}>
            <div className='pt-4'>Salary type</div>
            <p className='pt-3'><strong>{ userProvidedIncomePeriod }</strong></p>
          </div>
        </div>
        <br />
        <div
          className='bg-light-gray pl-5 pt-4 pb-5 pr-5'
          style={{ width: 500 }}
          ref={ (el) => {
            if (el) {
              el.style.setProperty('padding', '20px', 'important');
            }
          } }
        >
          <div className='row pb-3'>
            <div className='col'>
              <h3 className='title'>Expenses</h3>
            </div>
          </div>
          <div className='row' style={{ marginLeft: 0, justifyContent: 'space-between', marginRight: 10 }}>
            <div className='pt-4'>Rent/Mortgage</div>
            <p className='pt-3'><strong>{ `£${ Number(loanMonthlyPayments).toFixed(2) } ` }</strong></p>
          </div>
          <div className='row' style={{ marginLeft: 0, justifyContent: 'space-between', marginRight: 10 }}>
            <div className='pt-4'>Total monthly expenditure</div>
            <p className='pt-3'><strong>{ `£${ Number(totalMonthlyExpenditure).toFixed(2) } ` }</strong></p>
          </div>
        </div>
        <br />
        <div
          className='bg-light-gray pl-5 pt-4 pb-5 pr-5'
          style={{ width: 500 }}
          ref={ (el) => {
            if (el) {
              el.style.setProperty('padding', '20px', 'important');
            }
          } }
        >
          <div className='row pb-3'>
            <div className='col'>
              <h3 className='title'>Your personalised loan</h3>
            </div>
          </div>
          <div className='row' style={{ marginLeft: 0, justifyContent: 'space-between', marginRight: 10 }}>
            <div className='pt-4'>Loan amount</div>
            <p className='pt-3'><strong>{ `£${ Number(loanAmount).toFixed(2) } ` }</strong></p>
          </div>
          <div className='row' style={{ marginLeft: 0, justifyContent: 'space-between', marginRight: 10 }}>
            <div className='pt-4'>Loan period</div>
            <p className='pt-3'><strong>{ termInMonths } months</strong></p>
          </div>
          <div className='row' style={{ marginLeft: 0, justifyContent: 'space-between', marginRight: 10 }}>
            <div className='pt-4'>Monthly repay</div>
            <p className='pt-3'><strong>{ `£${ Number(loanMonthlyPayments).toFixed(2) } ` }</strong></p>
          </div>
          <div className='row' style={{ marginLeft: 0, justifyContent: 'space-between', marginRight: 10 }}>
            <div className='pt-4'>Total repay</div>
            <p className='pt-3'><strong>{ `£${ Number(loanTotalPayable).toFixed(2) } ` }</strong></p>
          </div>
          <div className='row' style={{ marginLeft: 0, justifyContent: 'space-between', marginRight: 10 }}>
            <div className='pt-4'>Representative APR</div>
            <p className='pt-3'><strong>{ loanPersonalisedRate } %</strong></p>
          </div>
        </div>
        <br />
        <div
          className='bg-light-gray pl-5 pt-4 pb-5 pr-5'
          style={{ width: 500 }}
          ref={ (el) => {
            if (el) {
              el.style.setProperty('padding', '20px', 'important');
            }
          } }
        >
          <div className='row pb-3'>
            <div className='col'>
              <h3 className='title'>Your bank account details</h3>
            </div>
          </div>
          <div className='row' style={{ marginLeft: 0, justifyContent: 'space-between', marginRight: 10 }}>
            <div className='pt-4'>Name on account</div>
            <p className='pt-3'><strong>{ firstName } { lastName }</strong></p>
          </div>
          <div className='row' style={{ marginLeft: 0, justifyContent: 'space-between', marginRight: 10 }}>
            <div className='pt-4'>Account number*</div>
            <p className='pt-3'><strong>{ accountNumber }</strong></p>
          </div>
          <div className='row' style={{ marginLeft: 0, justifyContent: 'space-between', marginRight: 10 }}>
            <div className='pt-4'>Sortcode*</div>
            <p className='pt-3'><strong>{ sortCode }</strong></p>
          </div>
        </div>
        <div className='loan-buttons' style={{ width: 500, textAlign: 'right', marginTop: 20 }}>
          <article>
            <button
              className='btn btn-primary'
              type='submit'
              onClick={ () => { submitStepDataCSRF('/lending/user_input_overview/', { user_input_confirmation: true }); } }
              data-cy='action-confirm-payment-details'
            >
              Open account
            </button>
          </article>
        </div>
      </div>
    </Opacity>
  );
};

export default UserInputOverview;
