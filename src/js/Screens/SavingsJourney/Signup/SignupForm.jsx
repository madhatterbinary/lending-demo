import React, { Component } from 'react';
import AuthWrapper from 'js/Screens/Authentication';
import Opacity from '../../../Components/Animations/Opacity';


class SignupForm extends Component {
  render() {
    return (
      <Opacity speed={ 300 }>
        <div className='auth-screen'>
          {/* <TimelineNavigation timelineItems={ timelineItems } localmatch='/signup' /> */}
          <h1 className='brand-primary'>You&apos;re openingggggg a FRS1 with 2% AER</h1>
          <h1 className='title' style={{ marginBottom: 20, marginTop: 20 }}>Create your login</h1>
          <p>Please provide an email address and password.<br />You&apos;ll need these details whenever you log in to your SmartSave account.</p>

          <h1 className='title' style={{ marginBottom: 20 }}>Existing customer?</h1>
          <p>Check your details are correct. <br />If youre already registered with us please <span className='button-login'>Login</span></p>
          <AuthWrapper registration />
        </div>
      </Opacity>
    );
  }
}

export default SignupForm;
