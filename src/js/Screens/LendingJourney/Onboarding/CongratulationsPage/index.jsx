import React from 'react';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import './CongratulationsPage.scss';
import Opacity from 'js/Components/Animations/Opacity';

const CongratulationsPage = () => {
  const { continueJourney } = useActions(actions);

  return (
    <Opacity speed={ 300 }>
      <div className='personal-page-screen form-container'>
        <h1 className='odd'>Congratulation!</h1>
        <h1>Your loan is confirmed</h1>
        <h3>
          We sent you some loan and legal documents.
          <br />
          You should receive it to your email in a few minutes.
        </h3>
        <h3>
          You can see all your loan details
          <br />
          in your personal space.
        </h3>
        <button className='button secondary-invert-color' type='submit' onClick={ () => continueJourney() } data-cy='action-go-to-servicing'>
          Go to my personal page
        </button>
      </div>
    </Opacity>
  );
};

export default CongratulationsPage;
