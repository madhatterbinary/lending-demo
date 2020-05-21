import React from 'react';
import AuthWrapper from 'js/Screens/Authentication';
import Opacity from 'js/Components/Animations/Opacity';
import TimelineNavigation from 'js/Components/TimelineNavigation';
import { savingsJourneyDefinition } from 'js/Definitions/savingsJourneyDefinition';


const Signup = () => {
  return (
    <Opacity speed={ 300 }>
      <TimelineNavigation timelineItems={ savingsJourneyDefinition.onboarding.details } localmatch='/savings/signup' />
      <div className='container'>
        <div className='row'>
          <div className='col mb-4'>
            <h1
              ref={ (el) => {
                if (el) {
                  el.style.setProperty('margin-bottom', '30px', 'important');
                }
              } }
            >Create your login</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col mb-4'>
            <div>Please provide an email and password.</div>
            <div>You&apos;ll need these details whenever you login to your account.</div>
          </div>
        </div>
        <div className='row'>
          <div className='col mb-5'>
            <AuthWrapper registration outline={ false } />
          </div>
        </div>
        <div className='row'>
          <div className='col mb-2'>
            <h2>Existing customer?</h2>
          </div>
        </div>
        <div className='row'>
          <div className='col mb-4'>
            <div>Check your details are correct.</div>
            <div>If you&apos;re already registered with us please <AuthWrapper login textOnly /></div>
          </div>
        </div>
      </div>
    </Opacity>
  );
};

export default Signup;
