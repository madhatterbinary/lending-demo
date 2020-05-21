import React from 'react';
import Opacity from 'js/Components/Animations/Opacity';
import Authentication from 'js/Screens/Authentication';

const Login = () => {
  return (
    <Opacity speed={ 300 }>
      <div className='auth-screen'>
        <h1>Login</h1>
        <Authentication login />
      </div>
    </Opacity>
  );
};

export default Login;
