import React, { PureComponent } from 'react';
import Auth0Component from './Auth0Component';

import './Authentication.scss';

type Props = {
  registration: boolean,
  login: boolean,
  outline: boolean,
  textOnly: boolean,
};

class AuthWrapper extends PureComponent<Props> {
  static defaultProps = {
    registration: false,
    login: false,
    outline: true,
    textOnly: false,
  }

  render() {
    const { login, registration, outline, textOnly } = this.props;
    return (
      <Auth0Component login={ login } registration={ registration } outline={ outline } textOnly={ textOnly } />
    );
  }
}

export default AuthWrapper;
