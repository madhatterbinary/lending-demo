import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TopBarNavigation from 'js/Components/TopBarNavigation';
import { Route, Switch } from 'react-router-dom';
import SavingsServicing from 'js/Screens/SavingsServicing';
import Authentication from 'js/Screens/Authentication';
import StartSavingsApplication from './Onboarding/CustomerDetails/DummyPages/StartSavingsApplication';
import SummarySavings from './Onboarding/CustomerDetails/DummyPages/SummarySavings';
import TermsAndConditions from './Onboarding/CustomerDetails/DummyPages/TermsAndConditions';
import InitialLoad from './InitialLoad';
import Onboarding from './Onboarding';
import Signup from './Authentication/Signup';
import Login from './Authentication/Login';

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
  if (_.includes(pathname, 'savings/onboarding')
    || _.includes(pathname, 'savings/summarysavings')
    || _.includes(pathname, 'savings/termsandconditions')
    || _.includes(pathname, 'savings/signup')
    || _.includes(pathname, 'savings/getsaving')
  ) {
    return (
      <TopBarNavigation menuItems={ menuItems } pathname={ pathname } />
    );
  }
  return <div />;
};

class SavingsJourney extends Component {
  render() {
    const { location } = this.props;

    return (
      <div id='main-app'>

        {renderNavBar(location.pathname)}
        <div>
          <Switch>
            <Route path='/savings/getsaving' exact component={ StartSavingsApplication } />
            <Route path='/savings/summarysavings' component={ SummarySavings } />
            <Route path='/savings/termsandconditions' component={ TermsAndConditions } />
            <Route path='/savings/' exact component={ InitialLoad } />
            <Route path='/savings/onboarding' component={ Onboarding } />
            <Route path='/savings/signup' render={ Signup } />
            <Route path='/savings/login' render={ Login } />
            <Route path='/savings/servicing' component={ SavingsServicing } />
          </Switch>
        </div>
      </div>
    );
  }
}

SavingsJourney.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default SavingsJourney;
