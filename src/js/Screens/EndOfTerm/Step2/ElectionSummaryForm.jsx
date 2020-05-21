import React from 'react';
import PropTypes from 'prop-types';
import './ElectionSummary.scss';
import moment from 'moment';
import Spinner from 'js/Components/Spinner';

const ElectionSummaryForm = props => {
  const { submitting, handleSubmit, pageData } = props;


  if (!pageData.election_decision_options) {
    return <Spinner />;
  }
  const headlineAer = (((pageData || {}).election_decision_options || []).new_product || {}).headline_aer;
  const forecastTermEndDate = (((pageData || {}).election_decision_options || []).new_product || {}).forecast_term_end_date;
  const termEndDate = (((pageData || {}).election_decision_options || []).original_account || {}).term_end_date;

  return (
    <div className='container savings-servicing-overview' style={{ maxWidth: 990 }}>
      <>
        <div className='container red-box d-flex flex-column' style={{ alignSelf: 'center', marginBottom: 20, maxWidth: 990, padding: 30, paddingTop: 15 }}>
          <h1 style={{ marginBottom: 20 }}>1 Year Saver</h1>
          <h3 className='medium' style={{ marginBottom: 40 }}>Here are some specifics about the interest you get with Annual Saver</h3>
          <div className='cal-box' style={{ display: 'flex', paddingTop: 0, justifyContent: 'space-between', paddingRight: 70 }}>
            <div style={{ display: 'flex', flexDirection: 'column-reverse', lineHeight: '0.5' }}><span style={{ fontSize: '2em', marginBottom: 31 }}><div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3 }} className='double-lines'><strong>{ parseFloat(headlineAer).toFixed(2) }% Gross</strong><strong>{ parseFloat(headlineAer).toFixed(2) }% AER</strong></div></span><div style={{ display: 'flex', cursor: 'pointer', justifyContent: 'space-between' }}><p>Interest rate</p></div></div>
            <div style={{ display: 'flex', flexDirection: 'column-reverse', lineHeight: '0.5' }}><span style={{ fontSize: '2em', marginBottom: 31 }}><div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3 }} className='double-lines'><strong>Annually</strong><strong>&nbsp;</strong></div></span><div style={{ display: 'flex', cursor: 'pointer', justifyContent: 'space-between' }}><p>How is it paid?</p></div></div>
            <div style={{ display: 'flex', flexDirection: 'column-reverse', lineHeight: '0.5' }}><span style={{ fontSize: '2em', marginBottom: 31 }}><div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3 }} className='double-lines'><strong>{ moment(termEndDate).format('ll') }</strong><strong>&nbsp;</strong></div></span><div style={{ display: 'flex', cursor: 'pointer', justifyContent: 'space-between' }}><p>When will it open?</p></div></div>
            <div style={{ display: 'flex', flexDirection: 'column-reverse', lineHeight: '0.5' }}><span style={{ fontSize: '2em', marginBottom: 31 }}><div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3 }} className='double-lines'><strong>{ moment(forecastTermEndDate).format('ll') }</strong><strong>&nbsp;</strong></div></span><div style={{ display: 'flex', cursor: 'pointer', justifyContent: 'space-between' }}><p>When is it paid?</p></div></div>
          </div>
          <form
            className='expenses-form form-container'
            style={{ display: 'flex', justifyContent: 'flex-end' }}
            onSubmit={ handleSubmit }
            ref={ (el) => {
              if (el) {
                el.style.setProperty('margin-top', '0px', 'important');
              }
            } }
          >
            <button className='btn btn-primary' style={{ marginBottom: 0, marginTop: 70 }} type='submit' disabled={ submitting } data-cy='action-get-rate'>
              Open account
            </button>
          </form>
        </div>
        <h2 style={{ marginTop: 50 }}>About your interest...</h2>
        <div className='row' style={{ paddingLeft: 20 }}>
          <div className='col' style={{ paddingLeft: 0 }}>
            <p className='m-0 p-0'>
              <span className='text-primary mr-3' style={{ position: 'relative', top: '0.35rem', fontSize: '2rem' }}>
                &bull;
              </span>The interest rate is fixed when you open your savings account and kept constant till the
              end of the term.
            </p>
            <p className='m-0 p-0'>
              <span className='text-primary mr-3' style={{ position: 'relative', top: '0.35rem', fontSize: '2rem' }}>
                &bull;</span>The interest is added to your savings account annually, at the end of the term.
            </p>
            <p className='m-0 p-0'>
              <span className='text-primary mr-3' style={{ position: 'relative', top: '0.35rem', fontSize: '2rem' }}>
                &bull;</span>The maximum interest is received if the lump sum you want to save is deposited in the
              account at the begging of the term.
            </p>
          </div>
        </div>
      </>
    </div>

  );
};

ElectionSummaryForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pageData: PropTypes.object.isRequired,
};

export default ElectionSummaryForm;
