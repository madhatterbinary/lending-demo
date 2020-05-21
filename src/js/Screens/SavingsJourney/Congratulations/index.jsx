import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import Spinner from 'js/Components/Spinner';
import ConfirmationBox from 'js/Components/ConfirmationBox';
import CongratsBg from 'js/assets/images/CongratsBg.png';
import './Congratulations.scss';

const Congratulations = () => {
  const { pageData } = useSelector(state => ({
    pageData: state.stepData.pageData,
  }));

  const { loadStepDataPublic } = useActions(actions);

  useEffect(() => {
    loadStepDataPublic('/savings/confirmation/');
  }, []);
  if (!pageData || pageData === undefined) return null;
  if (!pageData.saving_account || pageData.saving_account === undefined) return null;
  if (!pageData.saving_account.maturity_date || pageData.saving_account.maturity_date === undefined) return null;

  return (
    <div className='payment-completed-screen' style={{ height: 650, display: 'flex', justifyContent: 'space-evenly' }}>
      {pageData
        ? (
          <ConfirmationBox
            header='Congratulations!'
            subheader='1 Year Fixed Rate Saver account is confirmed'
            repaymentDate={ pageData.saving_account.maturity_date }
            background={ CongratsBg }
            congratsTable
            accountType='Annual Saver'
            interestRate='2.0% AER'
            btnText='Go to my personal page'
            btnLink='/savings/servicing'
            text1='We sent you some legal documents. You should receieve it to your email in a few minutes'
            text2='You can see all of your account details in your personal space.'
          />
        ) : (
          <p><Spinner /></p>
        )
        }
    </div>
  );
};

export default Congratulations;
