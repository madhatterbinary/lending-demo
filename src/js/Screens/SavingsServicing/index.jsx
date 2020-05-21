/* eslint-disable prefer-destructuring */
import React, { useState, useEffect, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import SavingsPanel from 'js/Components/SavingsPanel';
import Congratulations from 'js/Screens/SavingsJourney/Congratulations';
import TopBarNavigation from 'js/Components/TopBarNavigation';
import Dropdown from 'js/Components/Dropdown';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useSelector } from 'react-redux';
import EndOfTerm from 'js/Screens/EndOfTerm';
import CommunicationPreferences from 'js/Screens/SavingsServicing/CommunicationPreferences';
import Overview from 'js/Screens/SavingsServicing/Overview';
import MyAccount from 'js/Screens/SavingsServicing/MyAccount';
import ContactUs from 'js/Screens/SavingsServicing/ContactUs';
import Inbox from 'js/Screens/SavingsServicing/Inbox';
import Login from 'js/Screens/LendingJourney/Authentication/Login';
import UserSecurityQuestions from './UserSecurityQuestions';

import './SavingsServicing.scss';

let menuTitle = '';
let activeSaving = null;
const options = ['Overview', 'Account', 'Preferences', 'Inbox', 'Password reset', 'Logout'];

// import Authentication from 'js/Screens/Authentication';

// const menuItemsDesktop = [
//   {
//     title: 'Overview',
//     link: '/savings/servicing/overview',
//   },
//   {
//     title: 'My account',
//     link: '/savings/servicing/myaccount',
//   },
//   {
//     title: 'Contact us',
//     link: '/savings/servicing/contactus',
//   },
//   {
//     title: 'Inbox',
//     link: '/savings/servicing/inbox',
//     customRender: () => (
//       <Fragment>
//         <i className='material-icons inbox' style={{ fontSize: '1.8em' }}>
//           mail_outline
//         </i>
//       </Fragment>
//     ),
//   },
//   {
//     title: 'Logout',
//     link: '/savings',
//     customRender: () => <div> <button type='button'>Logout</button></div>,
//   },
// ];

function SavingsServicing(props) {
  const { pageData } = useSelector(state => ({
    pageData: state.stepData.pageData,
  }));
  const [menuItems, setMenuItems] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { location: { pathname }, dispatch } = props;

  if (((pageData || {}).deposits || []).length !== 0) {
    if (pathname === '/savings/servicing/myaccount') {
      menuTitle = 'Account';
    }
    if (localStorage.getItem('loanActionType') === 'Password reset') {
      menuTitle = 'Password reset';
    }

    if (localStorage.getItem('loanActionType') === 'Preferences') {
      menuTitle = 'Preferences';
    }
    if (pathname === '/savings/servicing/contactus') {
      menuTitle = 'Contact';
    }
    if (pathname === '/savings/servicing/inbox') {
      menuTitle = 'Inbox';
    }
    if (pathname === '/savings/servicing' || pathname === '/savings/servicing/' || pathname === '/savings/servicing/overview') {
      if (pageData.page_messages && pageData.page_messages.length !== 0) {
        menuTitle = '1 year fixed rate saver';
        if (document.getElementsByClassName('container savings-servicing-header')[0]) {
          document.getElementsByClassName('container savings-servicing-header')[0].style.display = 'none';
        }
      } else {
        menuTitle = '1 year fixed rate saver';
        if (document.getElementsByClassName('container savings-servicing-header')[0]) {
          document.getElementsByClassName('container savings-servicing-header')[0].style.display = 'block';
        }
      }
    }
    if (pathname === '/savings/servicing/endofterm'
  || pathname === '/savings/servicing/endofterm/electionpersondetails'
  || pathname === '/savings/servicing/endofterm/electionreinvestamount'
  || pathname === '/savings/servicing/endofterm/electiondocuments'
  || pathname === '/savings/servicing/endofterm/electionsuccess') {
      menuTitle = '';
      if (document.getElementsByClassName('container savings-servicing-header')[0]) {
        document.getElementsByClassName('container savings-servicing-header')[0].style.display = 'none';
      }
    }
  } else if (document.getElementsByClassName('container savings-servicing-header')[0]) {
    document.getElementsByClassName('container savings-servicing-header')[0].style.display = 'none';
  }
  const menuItemsDesktop = [
    {
      title: 'Logout',
      link: '/savings',
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
      title: 'Overview',
      link: '/savings/servicing/overview',
      customRender: () => (
        <Fragment>
          <i className='material-icons overview' style={{ fontSize: '1.8em' }}>
            bar_chart
          </i>
          <div>Overview</div>
        </Fragment>
      ),
    },
    {
      title: 'Account',
      link: '/savings/servicing/myaccount',
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
      link: '/savings/servicing/contactus',
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
      link: '/savings/servicing/inbox',
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
      link: '/savings',
      customRender: () => <div> <button type='button'>Logout</button></div>,
    },
  ];

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    if (windowWidth <= 1024) {
      setMenuItems(menuItemsMobile);
    } else {
      setMenuItems(menuItemsDesktop);
    }
  };

  useEffect(() => {
    //const { location: { pathname } } = props;
    window.addEventListener('resize', handleResize);
    if (windowWidth <= 1024) {
      setMenuItems(menuItemsMobile);
    } else {
      setMenuItems(menuItemsDesktop);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [((pageData || {}).deposits || []).length]);
  if (pageData && pageData.deposits && pageData.deposits !== undefined) {
    activeSaving = pageData.deposits[0];
  }
  if (document.getElementsByClassName('container savings-servicing-header')[0] !== undefined) {
    if (pathname === '/savings/servicing') {
      document.getElementsByClassName('container savings-servicing-header')[0].style.maxWidth = '990px';
      document.getElementsByClassName('container savings-servicing-header')[0].getElementsByClassName('row mb-3')[0].style.display = 'block';
    } else if (pathname === '/savings/servicing/endofterm') {
      document.getElementsByClassName('container savings-servicing-header')[0].getElementsByClassName('row mb-3')[0].style.display = 'block';
      document.getElementsByClassName('container savings-servicing-header')[0].style.maxWidth = '794px';
    } else {
      document.getElementsByClassName('container savings-servicing-header')[0].style.maxWidth = '794px';
      document.getElementsByClassName('container savings-servicing-header')[0].getElementsByClassName('row mb-3')[0].style.display = 'none';
    }
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <div id='main-app'>
      <div className='servicing-bg pt-4 savings'>
        <div className='savings-servicing' style={{ display: 'flex', flexDirection: 'column' }}>
          <TopBarNavigation
            login
            windowWidth={ windowWidth }
            menuItems={ menuItems }
          />
          { pathname === '/savings/servicing/endofterm/electionreinvestamount'
            ? <SavingsPanel /> : null
        }
          <div className='container savings-servicing-header' style={{ paddingLeft: 0, paddingTop: 50 }}>
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
                <div className='row mb-3' style={{ marginLeft: 0 }}>
                  <div className='col'>
                    { pathname === '/savings/servicing/securityquestions' || pathname === '/savings/servicing/congratulations'
                      ? (
                        null
                      ) : (<div className='red-line' style={{ width: 235, height: 2 }} />)
                }
                    { pageData.deposits && activeSaving
                      ? (
                        <div style={{ display: 'flex', width: 950, justifyContent: 'space-between' }}>
                          <div className='subTitle' style={{ display: 'flex', marginTop: 10 }}>
                            <p style={{ marginRight: 20 }}><strong>Reference</strong> { activeSaving.account_number }</p>
                            <p><strong>Maturity date</strong> { moment(activeSaving.maturity_date).format('ll') }</p>
                          </div>
                        </div>
                      ) : null
                }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Switch>
            <Route path='/savings/servicing' exact component={ Overview } />
            <Route path='/savings/servicing/overview' component={ Overview } />
            <Route path='/savings/servicing/securityquestions' component={ UserSecurityQuestions } />
            <Route path='/savings/servicing/communicationpreferences' exact component={ CommunicationPreferences } />
            <Route path='/savings/servicing/myaccount' component={ MyAccount } />
            <Route path='/savings/servicing/contactus' component={ ContactUs } />
            <Route path='/savings/servicing/inbox' component={ Inbox } />
            <Route path='/savings/servicing/login' component={ Login } />
            <Route path='/savings/servicing/congratulations' component={ Congratulations } />
            <Route path='/savings/servicing/endofterm' render={ () => <EndOfTerm pathname={ pathname } /> } />
          </Switch>
        </div>
      </div>
    </div>
  );
}

SavingsServicing.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

SavingsServicing.defaultProps = {
  location: {},
  dispatch: null,
};

export default SavingsServicing;
