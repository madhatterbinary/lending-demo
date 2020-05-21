/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import { BASE_URL } from 'js/Store/Api/axios';
import DocumentContainer from 'js/Components/DocumentViewer/DocumentContainer';
import './TermsAndConditions.scss';

const TermsAndConditions = () => {
  const { loadStepDataPublic } = useActions(actions);

  const deleteCookie = (name) => {
    document.cookie = `${ name }=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  };

  return (
    <Fragment>
      <div className='container mt-5 savings-docs'>
        <div className='row'>
          <div className='col-6 bg-light-gray p-4'>
            <h1>You&apos;re opening a FRS1 with 2% AER</h1>
            <br />
            <h2>You will need:</h2>
            <p className='m-0 p-0'><span className='text-primary mr-3' style={{ position: 'relative', top: '0.35rem', fontSize: '2rem' }}>&bull;</span>Your National Insurance number</p>
            <p className='m-0 p-0'><span className='text-primary mr-3' style={{ position: 'relative', top: '0.35rem', fontSize: '2rem' }}>&bull;</span>Your address details for the last three years</p>
            <p className='m-0 p-0'><span className='text-primary mr-3' style={{ position: 'relative', top: '0.35rem', fontSize: '2rem' }}>&bull;</span>The sort code and account number of the bank account from which you&apos;ll transfer your funds</p>
            <p className='m-0 p-0'><span className='text-primary mr-3' style={{ position: 'relative', top: '0.35rem', fontSize: '2rem' }}>&bull;</span>Access to your email account to verify your email</p>
            <br />
            <h2>To apply:</h2>
            <p className='m-0 p-0'><span className='text-primary mr-3' style={{ position: 'relative', top: '0.35rem', fontSize: '2rem' }}>&bull;</span>You must be over 18</p>
            <p className='m-0 p-0'><span className='text-primary mr-3' style={{ position: 'relative', top: '0.35rem', fontSize: '2rem' }}>&bull;</span>You must be a resident of the UK only</p>
            <p className='m-0 p-0'><span className='text-primary mr-3' style={{ position: 'relative', top: '0.35rem', fontSize: '2rem' }}>&bull;</span>You must pay tax only in the UK</p>
          </div>
          <div className='col-6 p-4 savings-docs'>
            <h2>Before you continue please read and understand the following:</h2>
            <div className='container mt-4'>
              <div className='row'>
                <div className='col mt-2'>Summary box</div>
                <div className='col text-right'>
                  <DocumentContainer
                    btnText='Read'
                    docType='firstDoc'
                    url={ `${ BASE_URL }lending/documents/${ 'hi' }` }
                  />
                </div>
              </div>
            </div>
            <div className='container'>
              <div className='row'>
                <div className='col mt-2'>Terms and conditions</div>
                <div className='col text-right'>
                  <DocumentContainer
                    btnText='Read'
                    docType='firstDoc'
                    url={ `${ BASE_URL }lending/documents/${ 'hi' }` }
                  />
                </div>
              </div>
            </div>
            <div className='container'>
              <div className='row'>
                <div className='col mt-2'>FSCS infomation sheet</div>
                <div className='col text-right'>
                  <DocumentContainer
                    btnText='Read'
                    docType='firstDoc'
                    url={ `${ BASE_URL }lending/documents/${ 'hi' }` }
                  />
                </div>
              </div>
            </div>
            <div className='container'>
              <div className='row'>
                <div className='col mt-2'>Privacy policy</div>
                <div className='col text-right'>
                  <DocumentContainer
                    btnText='Read'
                    docType='firstDoc'
                    url={ `${ BASE_URL }lending/documents/${ 'hi' }` }
                  />
                </div>
              </div>
            </div>
            <div>
              <input type='checkbox' id='accept_terms' />&nbsp;&nbsp;<label htmlFor='accept_terms' style={{ position: 'relative', top: `${ -3 }px`, cursor: 'pointer' }}>I have read, understood, and accepted the above documents.</label>
            </div>
            <div className='text-right mt-5'>
              <Link to='/savings/summarysavings'>
                <button type='button' className='btn btn-outline-primary pr-4 mr-4'><i className='material-icons'>chevron_left</i>Back</button>
              </Link>
              <button
                className='btn btn-primary'
                type='button'
                onClick={ () => {
                  localStorage.removeItem('journeyType');
                  // eslint-disable-next-line no-restricted-globals
                  deleteCookie('auth0.ssodata');
                  localStorage.setItem('journeyType', 'savings');
                  setTimeout(() => {
                    loadStepDataPublic('/savings/start?product_code=FRS1&privacy_policy=2019-05-18T15:53:01.321240+00:00&fscs_information_sheet=2019-05-18T15:53:01.321240+00:00&summary_box=2019-05-18T15:53:01.321240+00:00&terms_conditions=2019-05-18T15:53:01.321240+00:00&n=SAVINGS_JOURNEY');
                  }, 2000);
                } }
              >
                Next step
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TermsAndConditions;
