import React from 'react';
import TopBarNavigation from 'js/Components/TopBarNavigation';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import InitialLoad from 'js/Screens/LendingJourney/InitialLoad';
import StartLoanApplication from 'js/Screens/LendingJourney/StartLoanApplication';
import Onboarding from 'js/Screens/LendingJourney/Onboarding';
import Signup from 'js/Screens/LendingJourney/Authentication/Signup';
import Login from 'js/Screens/LendingJourney/Authentication/Login';
import Authentication from 'js/Screens/Authentication';
import ErrorPage from 'js/Screens/ErrorPage';
import LendingServicing from 'js/Screens/LendingServicing';
import _ from 'lodash';

const getMenuItem = (title, link) => {
  return { title, link };
};

const menuItems = [getMenuItem('Home', '/'), getMenuItem('Borrow', '/lending/getaloan'), getMenuItem('Save', '/savings/getsaving'), getMenuItem('FAQ', '/faq'),
  {
    title: 'Sign in',
    customRender: () => <div className='login'> <Authentication login outline /></div>,
  },
];

const renderNavBar = (pathname) => {
  if (_.includes(pathname, 'lending/onboarding') || _.includes(pathname, 'lending/getaloan') || _.includes(pathname, 'lending/signup')) {
    return (
      <TopBarNavigation menuItems={ menuItems } pathname={ pathname } />
    );
  }
  return <div />;
};

const LendingJourney = (props) => {
  const { pathname } = props;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <div id='main-app'>
      {renderNavBar(pathname)}
      <Switch>
        <Route path='/lending' exact component={ InitialLoad } />
        <Route path='/lending/continuejourney' exact component={ InitialLoad } />

        {/* App start points */}
        <Route path='/lending/getaloan' exact component={ StartLoanApplication } />

        {/* APP forms for onboarding journey */}
        <Route path='/lending/onboarding' component={ Onboarding } />

        {/* APP forms for servicing */}
        <Route path='/lending/servicing' component={ LendingServicing } />
        {/* APP auth0 interactions */}
        <Route path='/lending/signup' render={ Signup } />
        <Route path='/lending/login' render={ Login } />
        <Route path='/errorpage' component={ ErrorPage } />
      </Switch>
    </div>
  );
};


LendingJourney.propTypes = {
  pathname: PropTypes.string,
};

LendingJourney.defaultProps = {
  pathname: '',
};

export default LendingJourney;
