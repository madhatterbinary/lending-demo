import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css'; // <i class="material-icons">check_circle_outline</i>

const ToastMessage = ({ onClosedError, message, errorCode }) => {
  return (
    <div className={ message === 'Successfully updated your person details.' || message === 'Successfully updated your communication preferences.' ? 'toast-main confirm' : 'toast-main info' }>
      { message === 'Successfully updated your person details.' || message === 'Successfully updated your communication preferences.' ? (<i className='material-icons'>check_circle_outline</i>) : <i className='material-icons'>info</i> }
      <div className='toast-text' data-cy='info-toast'>
        <p><b>INFO!</b></p>
        <p>{ message }</p>
        { errorCode ? (
          <Fragment>
            <p>error code: { errorCode }</p>
            <button type='button' onClick={ onClosedError }>Close</button>
          </Fragment>
        ) : null
        }
      </div>
    </div>
  );
};

ToastMessage.propTypes = {
  onClosedError: PropTypes.func,
  message: PropTypes.string,
  errorCode: PropTypes.number,
};

ToastMessage.defaultProps = {
  onClosedError: () => {},
  message: '',
  errorCode: 0,
};

export default ToastMessage;
