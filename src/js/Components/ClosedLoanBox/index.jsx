import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import InfoBox from 'js/assets/images/info-box.png';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import './ClosedLoanBox.scss';

const ClosedLoanBox = (props) => {
  const { repaymentAmount, repaymentDate, text1, text2, customRender } = props;
  const [screenCapture, setScreenCapture] = useState(null);

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
    const { pathname } = props;
    if (pathname === '/lending/servicing/manageloan/withdrawal/completed'
      || pathname === '/lending/servicing/manageloan/earlysettlement/completed') {
      localStorage.setItem('loanClosed', true);
    }
  };

  if (screenCapture === null) return null;
  ((document.getElementById('screenshot') || {}).style || {}).display = 'none';

  return (
    <Fragment>
      <img alt='screenshot' id='screenshot' style={{ display: 'none' }} src={ screenCapture } />
      <div className='red-box info'>
        <div className='infobox'>
          <div className='col ml-3'>
            <h3>Thanks for your payment</h3>
            <p>Your transation was successful</p>
            <hr className='dottedline' />
            <div className='container m-0 p-0'>
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
                  { repaymentDate }
                </div>
              </div>
              <div className='row mt-2'>
                <div className='col'>
                  <div className='red-line' />
                </div>
              </div>
              { customRender ? customRender() : null }
            </div>
            <br />
            <p style={{ textAlign: 'left' }}><strong>{ text1 }</strong></p>
            <p style={{ textAlign: 'left' }}>{ text2 }</p>

          </div>
          <img alt='info box' src={ InfoBox } />
          <div className='row'>
            <div className='col text-right'>
              <div className='downloadIcon'>
                <br />
                <a id='download' download='receipt.png' style={{ color: '#E83D52' }} href={ screenCapture }>Download Receipt</a>
                <i className='material-icons custom' style={{ color: '#E83D52' }}>file_download</i>
              </div>
              <div>
                <Link to='/lending/servicing'>
                  <button type='button' className='btn btn-primary' onClick={ closeLoanHandler } style={{ width: 185, margin: 20 }} data-cy='action-back-to-servicing'>Go to my products</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ClosedLoanBox.propTypes = {
  text1: PropTypes.string,
  text2: PropTypes.string,
  repaymentAmount: PropTypes.string,
  repaymentDate: PropTypes.string,
  customRender: PropTypes.func,
  pathname: PropTypes.string,
};

ClosedLoanBox.defaultProps = {
  text1: '',
  text2: '',
  repaymentAmount: '',
  repaymentDate: '',
  customRender: null,
  pathname: '',
};

export default ClosedLoanBox;
