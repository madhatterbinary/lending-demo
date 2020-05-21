import React, { useState, Fragment, useEffect } from 'react';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import * as appActions from 'js/Store/Actions/application';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import './ConfirmationBox.scss';

moment.suppressDeprecationWarnings = true;

const ConfirmationBox = (props) => {
  const { header,
    subheader,
    repaymentAmount,
    repaymentDate,
    text1,
    text2,
    customRender,
    background,
    paymentTable,
    fileDownload,
    btnText,
    btnLink,
    newLoan,
    accountType,
    interestRate,
    congratsTable,
    onClick,
  } = props;
  const [screenCapture, setScreenCapture] = useState(null);
  const { resetSession } = useActions(appActions);


  const takeScreenShot = () => {
    const body = document.getElementById('root');
    html2canvas(body).then((canvas) => {
      const croppedCanvas = document.createElement('canvas');
      const rect = body.getBoundingClientRect();
      const croppedCanvasContext = croppedCanvas.getContext('2d');
      croppedCanvasContext.translate(-rect.left, -rect.top);
      croppedCanvas.width = rect.width;
      croppedCanvas.height = rect.height;
      croppedCanvas.scale = window.devicePixelRatio;
      croppedCanvasContext.drawImage(canvas, 0, 0, rect.width, rect.height, 0, 0, rect.width, rect.height);
      setScreenCapture(croppedCanvas.toDataURL());
    });
  };

  useEffect(() => {
    takeScreenShot();
  }, [screenCapture]);

  const closeLoanHandler = () => {
    if (onClick) onClick();
    if (newLoan) resetSession();
  };

  if (screenCapture === null) return null;
  ((document.getElementById('screenshot') || {}).style || {}).display = 'none';
  const { pathname } = props;
  if (pathname === '/lending/servicing/manageloan/withdrawal/completed'
  || pathname === '/lending/servicing/manageloan/earlysettlement/completed') {
    localStorage.setItem('loanClosed', true);
  }

  return (
    <Fragment>
      <img alt='screenshot' id='screenshot' style={{ display: 'none' }} src={ screenCapture } />
      <div className='container red-box info'>
        <div className='infobox'>
          <div
            className='col ml-3'
            ref={ (el) => {
              if (el) {
                el.style.setProperty('margin-left', '0px', 'important');
                el.style.setProperty('margin-top', '130px', 'important');
              }
            } }
          >
            <h3>{ header }</h3>
            <p>{ subheader }</p>
            <hr className='dottedline' style={{ marginBottom: 25 }} />
            <div className='container m-0 p-0'>
              { paymentTable ? (
                <>
                  <div className='row'>
                    <div className='col'>
                      <strong>Amount paid</strong>
                    </div>
                    <div className='col text-right'>
                      £{Number(repaymentAmount)}
                    </div>
                  </div>
                  <div className='row mt-2'>
                    <div className='col'>
                      <div className='red-line' />
                    </div>
                  </div>
                  <div className='row mt-2'>
                    <div className='col'>
                      <strong>Payment date</strong>
                    </div>
                    <div className='col text-right'>
                      { moment(repaymentDate).format('ll') }
                    </div>
                  </div>
                  <div className='row mt-2'>
                    <div className='col'>
                      <div className='red-line' />
                    </div>
                  </div>
                </>
              ) : null
            }
              { congratsTable ? (
                <>
                  <div className='row'>
                    <div className='col'>
                      <strong>Account type</strong>
                    </div>
                    <div className='col text-right'>
                      { accountType }
                    </div>
                  </div>
                  <div className='row mt-2'>
                    <div className='col'>
                      <div className='red-line' />
                    </div>
                  </div>
                  <div className='row mt-2'>
                    <div className='col'>
                      <strong>Interest rate</strong>
                    </div>
                    <div className='col text-right'>
                      { interestRate }
                    </div>
                  </div>
                  <div className='row mt-2'>
                    <div className='col'>
                      <div className='red-line' />
                    </div>
                  </div>
                  <div className='row mt-2'>
                    <div className='col'>
                      <strong>Maturity date</strong>
                    </div>
                    <div className='col text-right'>
                      {moment(repaymentDate).format('ll')}
                    </div>
                  </div>
                  <div className='row mt-2'>
                    <div className='col'>
                      <div className='red-line' />
                    </div>
                  </div>
                </>
              ) : null
            }
              { customRender ? customRender() : null }
            </div>
            <br />
            <p style={{ textAlign: 'left', marginTop: 0 }}><strong>{ text1 }</strong></p>
            <p style={{ textAlign: 'left', marginTop: 0 }}>{ text2 }</p>

          </div>
          <img alt='info box' src={ background } />
          <div className='row'>
            <div
              className={ newLoan ? 'col text-right closed-loan' : 'col text-right' }
              style={{ paddingRight: 30 }}
            >
              { fileDownload
                ? (
                  <div className='downloadIcon'>
                    <br />
                    <a id='download' download='receipt.png' style={{ color: '#E83D52' }} href={ screenCapture }>Download Receipt</a>
                    <i className='material-icons custom' style={{ color: '#E83D52', marginLeft: 10, marginRight: 0 }}>file_download</i>
                  </div>
                ) : null
          }
              <div className={ congratsTable ? 'link congrats' : ' link' }>
                <Link to={ btnLink }>
                  <button type='button' className={ congratsTable ? 'btn btn-primary congrats' : 'btn btn-primary' } onClick={ closeLoanHandler } style={{ width: 185, margin: 20 }}>{ btnText }</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ConfirmationBox.propTypes = {
  header: PropTypes.string,
  subheader: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  btnText: PropTypes.string,
  repaymentAmount: PropTypes.string,
  repaymentDate: PropTypes.string,
  customRender: PropTypes.func,
  pathname: PropTypes.string,
  background: PropTypes.any,
  paymentTable: PropTypes.bool,
  fileDownload: PropTypes.bool,
  btnLink: PropTypes.string,
  newLoan: PropTypes.bool,
  accountType: PropTypes.string,
  interestRate: PropTypes.string,
  congratsTable: PropTypes.bool,
  onClick: PropTypes.func,
};

ConfirmationBox.defaultProps = {
  header: '',
  subheader: '',
  text1: '',
  text2: '',
  btnText: '',
  repaymentAmount: '',
  repaymentDate: 'nothing',
  customRender: null,
  pathname: '',
  background: null,
  paymentTable: null,
  fileDownload: null,
  btnLink: '',
  newLoan: false,
  accountType: null,
  interestRate: null,
  congratsTable: null,
  onClick: null,

};

export default ConfirmationBox;
