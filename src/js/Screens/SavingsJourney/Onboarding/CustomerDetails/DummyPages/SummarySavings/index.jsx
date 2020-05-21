import React, { useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import { Link } from 'react-router-dom';
import moment from 'moment';

const SummarySavings = () => {
  const { pageData } = useSelector(state => ({
    pageData: state,
  }));
  const { loadStepDataPublic } = useActions(actions);

  pageData.annual_interest_rate_gross = 2;
  pageData.annual_interest_rate_aer = 2;
  pageData.interest_paid = 'Annually';
  pageData.account_type = '1 Year Fixed Rate Saver';

  useEffect(() => {
    loadStepDataPublic('/saving/summarysavings.json');
  }, [loadStepDataPublic]);

  return (
    <Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div className='container bg-light-gray pl-5 pt-4 pb-4 pr-5 mt-5 mb-4'>
              <div className='row pb-2'>
                <div className='col pb-4'>
                  <h1>1 Year Fixed Rate Saver</h1>
                  <h2
                    className='grey-color'
                    style={{ position: 'relative', marginTop: 20 }}
                    ref={ (el) => {
                      if (el) {
                        el.style.setProperty('font-weight', '300', 'important');
                      }
                    } }
                  >Lock away your savings for a guaranteed rate.</h2>
                </div>
              </div>
              <div className='row pb-3' style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className='col-3'>
                  <div className='pb-3'>Interest rate</div>
                  <div><h2>{`${ parseFloat(pageData.annual_interest_rate_gross).toFixed(1) }% Gross`}</h2></div>
                  <div><h2>{`${ parseFloat(pageData.annual_interest_rate_aer).toFixed(1) }% AER`}</h2></div>
                </div>
                <div className='col-3'>
                  <div className='pb-3'>How is it paid?</div>
                  <div><h2>{pageData.interest_paid}</h2></div>
                </div>
                <div className='col-3'>
                  <div className='pb-3'>When is it paid?</div>
                  <div><h2>{moment(pageData.maturity_date).add(1, 'years').format('ll')}</h2></div>
                </div>
              </div>
              <div className='row pb-0'>
                <div className='col pb-2 text-right'>
                  <Link to='/savings/getsaving'>
                    <button type='submit' className='btn btn-outline-primary pr-4 mr-4'><i className='material-icons'>chevron_left</i>Back</button>
                  </Link>
                  <Link to='/savings/termsandconditions'>
                    <button
                      className='btn btn-primary'
                      type='submit'
                      data-cy='action-open-savings-account'
                    >
                      Open your savings account
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <div className='container'>
              <div className='row'>
                <div className='col mb-3 pt-4'>
                  <h1>About your interest rate?</h1>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <p className='m-0 p-0'><span className='text-primary mr-3' style={{ position: 'relative', top: '0.35rem', fontSize: '2rem' }}>&bull;</span>These rates are effective from Launch Date is now 2018 and are fixed until the end of your product term.</p>
                  <p className='m-0 p-0'><span className='text-primary mr-3' style={{ position: 'relative', top: '0.35rem', fontSize: '2rem' }}>&bull;</span>All interest is paid gross and will be added to your account.</p>
                  <p className='m-0 p-0'><span className='text-primary mr-3' style={{ position: 'relative', top: '0.35rem', fontSize: '2rem' }}>&bull;</span>Interest is paid annually, on the anniversary of the account opening.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SummarySavings;
