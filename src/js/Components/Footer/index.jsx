import React from 'react';

const Footer = () => (
  <>
    <div
      className='d-flex align-items-center bg-secondary mt-5'
      ref={ (el) => {
        if (el) {
          el.style.setProperty('margin-top', '20px', 'important');
        }
      } }
    >
      <div className='container'>
        <div className='pt-4 pb-4 text-white'>
          Write Yobota <i className='material-icons'>arrow_right_alt</i>
        </div>
      </div>
    </div>
    <div className='d-flex align-items-center bg-light-gray'>
      <div className='container'>
        <div className='pt-4 pb-4'>
          <div className='row'>
            <div className='col col-md-3 pt-4'>
              <p>© 2018 Yobota, Inc.</p>
            </div>
            <div className='col col-md-3 pt-4'>
              <p>All Rights Reserved.</p>
            </div>
            <div className='col col-md-6 pt-4'>
              <a href='#' className='btn-primary btn-lg btn-social btn-fb' type='button' role='button'><i className='fab fa-facebook-f' /></a>
              <a href='#' className='btn-primary btn-lg btn-social btn-fb' type='button' role='button'><i className='fab fa-twitter' /></a>
              <a href='#' className='btn-primary btn-lg btn-social btn-fb' type='button' role='button'><i className='fab fa-linkedin-in' /></a>
            </div>
          </div>
          <div className='row'>
            <div className='col pt-4'>
              <p>Yobota Ltd is Registered in England and Wales. Registered Number 9949171<br />
                Registered Office: 119 The Hub C/O Hilton Consulting Ltd, 300 Kensal Road, London, England, W10 5BE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Footer;
