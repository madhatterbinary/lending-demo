import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IdleTimer from 'react-idle-timer';
import * as actions from 'js/Store/Actions/application';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import ToastMessage from './ToastMessage.jsx';
import './Toast.scss';

const ToastLogout = () => {
  const { isAuthenticated } = useSelector(state => ({
    isAuthenticated: state.stepData.isAuthenticated,
  }));
  const [isIdle, setIsIdle] = useState(false);
  const { resetSession } = useActions(actions);
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
    if (isIdle && isAuthenticated) {
      toast(<ToastMessage message='For security reasons, you will be logged out in 5 minutes' />);
    }
    return () => setDidMount(false);
  }, [isAuthenticated]);

  if (!didMount) {
    return null;
  }

  return (
    <Fragment>
      { isAuthenticated
        ? (
          <Fragment>
            <IdleTimer
              onIdle={ () => {
                setIsIdle(true);
              } }
              debounce={ 250 }
              timeout={ 1000 * 60 * 2 } // it should be 1000 * 60 * 1
            />
            { isIdle
              ? (
                <Fragment>
                  <IdleTimer
                    onIdle={ () => {
                      resetSession();
                    } }
                    onAction={ () => {
                      setIsIdle(false);
                    } }
                    debounce={ 250 }
                    timeout={ 1000 * 60 * 5 }
                  />
                </Fragment>
              )
              : null
            }
            <ToastContainer autoClose={ 15000 } />
          </Fragment>
        )
        : null
      }
    </Fragment>
  );
};

export default ToastLogout;
