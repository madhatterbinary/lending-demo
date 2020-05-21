import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastMessage from './ToastMessage.jsx';
import './Toast.scss';

const Toast = ({ toastError, message, errorCode }) => {
  const [didMount, setDidMount] = useState(false);


  useEffect(() => {
    setDidMount(true);
    if (message && toastError && errorCode) {
      toast(<ToastMessage message={ message } />);
    }
    return () => setDidMount(false);
  }, [errorCode]);

  if (!didMount || !message || !errorCode || !toastError) {
    return null;
  }
  return <ToastContainer autoClose={ 5000 } />;
};

Toast.propTypes = {
  message: PropTypes.string,
  errorCode: PropTypes.number,
  toastError: PropTypes.bool,
};

Toast.defaultProps = {
  message: null,
  errorCode: null,
  toastError: false,
};

export default Toast;
