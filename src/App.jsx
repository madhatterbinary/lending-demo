import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import * as actions from 'js/Store/Actions/application';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';
import MainMenuScreen from 'js/Components/MainMenuScreen';
import LendingJourney from 'js/Screens/LendingJourney';
import SavingsJourney from 'js/Screens/SavingsJourney';
import ErrorPage from 'js/Screens/ErrorPage';
import ManageLoan from 'js/Screens/LendingServicing/ManageLoan';
import ToastLogout from 'js/Components/Toasts/ToastLogout.jsx';
import Footer from 'js/Components/Footer';
import StubController from './StubController';

function App(props) {
  const { errors, toastError } = useSelector(state => ({
    errors: state.stepData.errors,
    toastError: state.stepData.toastError,
  }));
  const { resetSession } = useActions(actions);
  const [message, setMessage] = useState(null);
  const [errorCode, setErrorCode] = useState(0);
  const { location: { pathname }, dispatch } = props;

  useEffect(() => {
    if ((errors || {}).system_errors !== undefined) {
      if (((errors || {}).system_errors || {}).message !== undefined) {
        if (errors.system_errors.message.toString()) {
          setMessage(((errors || {}).system_errors || {}).message);
          setErrorCode(((errors || {}).system_errors || {}).error_code);
        } else {
          setMessage(((errors || {}).system_errors || {}).message[0].db_error_message);
          setErrorCode(((errors || {}).system_errors || {}).message[0].error_log_id);
        }
      }
    }
  }, [pathname]);

  return (
    <div id='main-app'>
      <ToastLogout
        message={ message }
        errorCode={ errorCode || 0 }
        toastError={ toastError }
        pathname={ pathname }
      />
      <Switch>
        {/* Main menu */}
        <Route path='/' exact component={ MainMenuScreen } />
        {/* Lending paths */}
        <Route path='/lending' render={ () => <LendingJourney pathname={ pathname } dispatch={ dispatch } /> } />
        <Route path='/payment' component={ ManageLoan } />
        <Route path='/withdrawal' component={ ManageLoan } />
        <Route path='/earlysettlement' component={ ManageLoan } />

        {/* Saving paths */}
        <Route path='/savings' component={ SavingsJourney } />
        <Route path='/errorpage' component={ ErrorPage } />

        <Route exact path='/logout' render={ resetSession } />
      </Switch>
      <Footer />
      <StubController />
    </div>
  );
}

App.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

App.defaultProps = {
  location: {},
  dispatch: null,
};

export default hot(module)(App);
