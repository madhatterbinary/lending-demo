import React, { useState, useEffect, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as actions from 'js/Store/Actions/application';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import TopBarNavigation from 'js/Components/TopBarNavigation';
import Login from 'js/Screens/LendingJourney/Authentication/Login';
import useWindowSize from 'js/Components/Hooks/useWindowSize';
import MyLoan from 'js/Screens/LendingServicing/MyLoan';
import Dropdown from 'js/Components/Dropdown';
import UserSecurityQuestions from './UserSecurityQuestions';
import CommunicationPreferences from './CommunicationPreferences';
import ManageLoan from './ManageLoan';
import MyAccount from './MyAccount';
import ContactUs from './ContactUs';
import Inbox from './Inbox';

let menuTitle = '';
const options = ['Account', 'Preferences', 'Inbox', 'Password reset', 'Logout'];

function LendingServicing(props) {
  const { location: { pathname }, dispatch } = props;
  if (pathname === '/lending/servicing/myaccount') {
    menuTitle = 'Account';
  }
  if (localStorage.getItem('loanActionType') === 'Password reset') {
    menuTitle = 'Password reset';
  }

  if (localStorage.getItem('loanActionType') === 'Preferences') {
    menuTitle = 'Preferences';
  }
  if (localStorage.getItem('loanActionType') === 'Withdraw loan' || localStorage.getItem('loanActionType') === 'Cancel your loan' || pathname === '/lending/servicing/manageloan/makepayment') {
    menuTitle = 'Manage loan';
  }
  if (pathname === '/lending/servicing/contactus') {
    menuTitle = 'Contact';
  }
  if (pathname === '/lending/servicing/inbox') {
    menuTitle = 'Inbox';
  }
  if (pathname === '/lending/servicing' || pathname === '/lending/servicing/') {
    menuTitle = 'My loan';
  }
  if (pathname === '/lending/account/management/payment/start/' || pathname === '/lending/servicing/manageloan/payment/carddetails' || pathname === '/lending/servicing/manageloan/payment/redirect' || pathname === '/lending/servicing/manageloan/payment/finalising' || pathname === '/lending/servicing/manageloan/payment/completed') {
    menuTitle = 'Overpayment';
  }
  if (pathname === '/lending/servicing/manageloan/withdrawal/agreement'
  || pathname === '/lending/servicing/manageloan/withdrawal/carddetails'
  || pathname === '/lending/servicing/manageloan/withdrawal/redirect'
  || pathname === '/lending/servicing/manageloan/withdrawal/processing'
  || pathname === '/lending/servicing/manageloan/withdrawal/finalising'
  || pathname === '/lending/servicing/manageloan/withdrawal/completed') {
    menuTitle = 'Withdrawal';
  }
  if (pathname === 'lending/servicing/securityquestions') {
    document.getElementsByClassName('servicing-header')[0].style.display = 'none';
  }
  const size = useWindowSize();
  const [menuItems, setMenuItems] = useState([]);
  const { resetSession } = useActions(actions);
  const menuItemsDesktop = [
    {
      title: 'Loan',
      link: '/lending/servicing',
    },
    {
      title: 'Manage',
      link: '/lending/servicing/manageloan/makepayment',
    },
    {
      title: 'Contact',
      link: '/lending/servicing/contactus',
    },
    {
      title: 'Logout',
      link: '/lending',
      customRender: () => (
        <Dropdown
          title={ <i className='material-icons' style={{ pointerEvents: 'none' }}>account_circle</i> }
          options={ options }
          dispatch={ dispatch }
        />
      ),
    },
  ];

  const menuItemsMobile = [
    {
      title: 'My loan',
      link: '/lending/servicing',
    },
    {
      title: 'Manage',
      link: '/lending/servicing/manageloan/makepayment',
      customRender: () => (
        <Fragment>
          <i className='material-icons equalizer' style={{ fontSize: '1.8em' }}>
            equalizer
          </i>
          <div>Manage</div>
        </Fragment>
      ),
    },
    {
      title: 'Account',
      link: '/lending/servicing/myaccount',
      customRender: () => (
        <Fragment>
          <i className='material-icons identity' style={{ fontSize: '1.8em' }}>
            perm_identity
          </i>
          <div>Account</div>
        </Fragment>
      ),
    },
    {
      title: 'Contact',
      link: '/lending/servicing/contactus',
      customRender: () => (
        <Fragment>
          <i className='material-icons contact' style={{ fontSize: '1.8em' }}>
            textsms
          </i>
          <div>Contact</div>
        </Fragment>
      ),
    },
    {
      title: 'Inbox',
      link: '/lending/servicing/inbox',
      customRender: () => (
        <Fragment>
          <i className='material-icons inbox' style={{ fontSize: '1.8em' }}>
            mail_outline
          </i>
          <div>Inbox</div>
        </Fragment>
      ),
    },
    {
      title: 'Logout',
      link: '/lending',
      customRender: () => <div> <span onClick={ resetSession }>Logout</span></div>,
    },
  ];

  useEffect(() => {
    if (size.width <= 1024) {
      setMenuItems(menuItemsMobile);
    } else {
      setMenuItems(menuItemsDesktop);
    }
  }, [size, menuTitle]);

  if (document.getElementsByClassName('servicing-header')[0]) {
    document.getElementsByClassName('servicing-header')[0].style.display = 'none';
  }

  return (
    <div id='main-app'>
      <Fragment>
        <TopBarNavigation
          login
          windowWidth={ Number(size) }
          menuItems={ menuItems }
          pathname={ pathname }
        />
        <div
          className='servicing-bg pt-4'
          ref={ (el) => {
            if (el) {
              el.style.setProperty('margin-top', '0px', 'important');
            }
          } }
        >
          <div className='servicing-header'>
            <div className='row'>
              <div
                className='col mt-4'
                ref={ (el) => {
                  if (el) {
                    el.style.setProperty('margin-top', '0px', 'important');
                  }
                } }
              >
                <h3 className='bigger' style={{ marginLeft: 20 }}>{ menuTitle }</h3>
              </div>
            </div>
            <div className='row mb-3'>
              <div className='col'>
                <div className='red-line' style={{ width: 200, height: 2 }} />
              </div>
              <div className='col' />
            </div>
          </div>
          <Switch>
            <Route path='/lending/servicing' exact component={ MyLoan } />
            <Route path='/lending/servicing/securityquestions' component={ UserSecurityQuestions } />
            <Route path='/lending/servicing/communicationpreferences' component={ CommunicationPreferences } />
            <Route path='/lending/servicing/manageloan' component={ ManageLoan } />
            <Route path='/lending/servicing/myaccount' component={ MyAccount } />
            <Route path='/lending/servicing/contactus' component={ ContactUs } />
            <Route path='/lending/servicing/inbox' component={ Inbox } />
            <Route path='/lending/servicing/login' component={ Login } />
          </Switch>
        </div>
      </Fragment>
    </div>
  );
}

LendingServicing.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

LendingServicing.defaultProps = {
  location: {},
  dispatch: null,
};

export default LendingServicing;
