/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import DirectDebit from 'js/assets/images/directdebit.png';
import Opacity from 'js/Components/Animations/Opacity';
import { BASE_URL } from 'js/Store/Api/axios';
import Spinner from 'js/Components/Spinner';

const download = (fileUrl) => {
  // give browser time to load file
  setTimeout(() => {
    const response = {
      file: fileUrl,
    };
    window.open(response.file);
  }, 100);
};

/*
  Download direct debit mandate
  Information required from GET:
    data.page_data.mandate_pdf_url
  Information submitted via POST:
    direct_debit_confirmation: true
*/
const DirectDebitConfirmation = () => {
  const { pageData, inWaitingRoom } = useSelector(state => ({
    inWaitingRoom: state.application.inWaitingRoom,
    pageData: state.stepData.pageData,
  }));

  const { loadStepDataPublic, submitStepDataCSRF } = useActions(actions);

  useEffect(() => {
    loadStepDataPublic('/lending/directdebitconfirmed/');
  }, [loadStepDataPublic]);

  if (inWaitingRoom) return <Spinner />;

  return (
    <Opacity speed={ 300 }>
      <div className='container'>
        <div className='row'>
          <div
            className='col mb-4'
            ref={ (el) => {
              if (el) {
                el.style.setProperty('margin-bottom', '50px', 'important');
              }
            } }
          >
            <h1>Direct Debit Confirmed</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <img src={ DirectDebit } className='mb-4' alt='direct debit logo' />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <div className='mb-2'>The name on your bank statement will be LiveLend.</div>
            <div className='mb-2'>You will receive an email within three business days confirming the Direct Debit has been set up.</div>
          </div>
        </div>
        <div className='row'>
          <div className='col mb-4'>
            <div
              data-cy='action-download-direct-debit-mandate'
              className='color-primary'
              onClick={ () => download(`${ BASE_URL }${ pageData.mandate_pdf_url }&host_organisation_name=LiveLend`) }
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              You can download your Direct Debit mandate here
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <button
              className='btn btn-primary'
              type='submit'
              data-cy='action-confirm-direct-debit'
              onClick={ () => {
                submitStepDataCSRF('/lending/directdebitconfirmed/', { direct_debit_confirmation: true });
              } }
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </Opacity>
  );
};

export default DirectDebitConfirmation;
