import React from 'react';
import Opacity from 'js/Components/Animations/Opacity';
import Authentication from 'js/Screens/Authentication';


const Signup = () => {
  return (
    <Opacity speed={ 300 }>
      <div className='auth-screen'>
        <h1 className='brand-primary'>You&apos;re opening a FRS1 with 2% AER</h1>
        <h1 className='title' style={{ marginBottom: 20, marginTop: 20 }}>Create your login</h1>
        <p>Please provide an email address and password.<br />You&apos;ll need these details whenever you log in to your SmartSave account.</p>

        <h1 className='title' style={{ marginBottom: 20 }}>Existing customer?</h1>
        <p>Check your details are correct. <br />If youre already registered with us please <span className='button-login'>Login</span></p>

        <Authentication login />
      </div>
    </Opacity>
  );
};

export default Signup;
