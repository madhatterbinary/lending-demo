/* eslint-disable no-nested-ternary */
//@flow
/* eslint-disable react/button-has-type*/
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import Auth0Lock from 'auth0-lock';
import runtimeEnv from '@mars/heroku-js-runtime-env';

import { auth0SignIn, auth0Error, auth0Logout, submitAccessToken } from 'js/Store/Actions/auth';

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.stepData.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return { actions: bindActionCreators({ auth0SignIn, auth0Error, auth0Logout, submitAccessToken, push }, dispatch) };
};

const env = runtimeEnv();

const auth0ClientId = env.REACT_APP_AUTH0_CLIENTID;
const auth0Domain = env.REACT_APP_AUTH0_DOMAIN;
const allowedConnections = (env.REACT_APP_AUTH0_ALLOWED_CONNECTIONS || '').split(',');
const auth0Options = {
  // allowLogin: true,
  // allowSignUp: true,
  autoclose: true,
  closable: true,
  rememberLastLogin: false,
  socialButtonStyle: 'medium',
  theme: {
    logo: '/assets/images/yobotalogo.png',
    primaryColor: '#ec3f53',
  },
  allowedConnections,
  configurationBaseUrl: 'https://cdn.eu.auth0.com',
  auth: {
    redirect: false,
    sso: false,
    responseType: 'token',
    params: {
      scope: 'offline access openid profile', // TODO: make an actual thing here
    },
  },
};

type Props = {
  actions: Object,
  registration: boolean,
  login: boolean,
  isAuthenticated: boolean,
  textOnly: boolean,
  outline:any,
};

class Auth0Component extends PureComponent<Props> {
  static defaultProps = {
    registration: false,
    login: false,
    isAuthenticated: false,
    textOnly: false,
    outline: '',
  }

  componentDidMount() {
    const { login, registration } = this.props;

    this.mountAuth0({
      ...auth0Options,
      allowLogin: login,
      allowSignUp: registration,
      languageDictionary: {
        title: registration ? 'Sign up' : 'Log in',
      },
    });
  }

  componentWillUnmount() {
    this.lock = null;
  }

  hide = () => {
    this.lock.hide();
  }

  show = (event: any, opts: any, cb: any) => {
    const auth0 = this.mountAuth0(opts);
    auth0.show(cb);
  }

  finish = (method: any, err: any, profile: any, token: any) => {
    const { actions, registration } = this.props;

    if (err) {
      actions.auth0Error(err);
    } else {
      actions.submitAccessToken(token.accessToken, registration ? 'signup' : 'login');
      actions.auth0SignIn(profile, token);
    }
  }

  logout = () => {
    const { actions } = this.props;
    actions.auth0Logout();
  }

  mountAuth0(options: Object = {}) {
    const { actions } = this.props;
    if (!auth0ClientId || !auth0Domain) {
      actions.auth0Error({ error: 'Missing REACT_APP_AUTH0_CLIENTID or REACT_APP_AUTH0_DOMAIN' });
      return null;
    }

    try {
      this.lock = new Auth0Lock(auth0ClientId, auth0Domain, { ...options });
      this.lock.on('authenticated', (authResult: any) => {
        this.finish('login', null, null, authResult);
        // TODO: WTF IS GOING ON HERE
        // this.lock.getUserInfo(authResult.accessToken, (error: Object, profile: Object) => {
        //   if (error) {
        //     // Handle error
        //     actions.auth0Error(error);
        //     return;
        //   }
        //
        //   const method = 'login';
        //   this.finish(method, error, profile, authResult);
        // });
      });
      return this.lock;
    } catch (error) {
      actions.auth0Error(error);
    }

    return null;
  }

  showLoginModal(event: any) {
    const { registration, login } = this.props;
    this.show(event, {
      ...auth0Options,
      allowLogin: login,
      allowSignUp: registration,
      languageDictionary: {
        title: registration ? 'Sign up' : 'Log in',
      } });
  }

  render() {
    const { login, registration, isAuthenticated, textOnly, outline } = this.props;

    if (!login && !registration) return <p>reconfigure the widget, type of auth missing</p>;

    return (
      <Fragment>
        {isAuthenticated
          ? <button className='btn btn-outline-primary login-register-button' onClick={ () => { this.logout(); push('/logout'); } } data-cy='action-auth0-logout'>Logout</button>
          : (
            textOnly ? <span className='text-primary' style={{ cursor: 'pointer' }} onClick={ () => this.showLoginModal() }>Login</span>
              : (
                <button
                  className={ `btn ${ outline ? 'btn-outline-primary' : 'btn-primary' } login-register-button` }
                  type='button'
                  onClick={ () => this.showLoginModal() }
                  data-cy={ `action-auth0-${ login ? 'login' : 'register' }` }
                >{login ? 'Login' : 'Sign up'}</button>
              )
          )
        }
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth0Component);
