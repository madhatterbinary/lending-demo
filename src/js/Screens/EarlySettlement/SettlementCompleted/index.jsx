import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import ConfirmationBox from 'js/Components/ConfirmationBox';
import EarlySettlement from 'js/assets/images/EarlySettlement.png';
import Spinner from 'js/Components/Spinner';

const SettlementCompleted = () => {
  const { pageData, repaymentAmount, repaymentDate } = useSelector(state => ({
    pageData: state.stepData.pageData,
    repaymentAmount: state.stepData.pageData.REPAYMENT_AMOUNT,
    repaymentDate: state.stepData.pageData.REPAYMENT_DATE,
  }));
  const [runOption, setRunOption] = useState(null);
  const { loadStepDataPublic } = useActions(actions);

  useEffect(() => {
    loadStepDataPublic('/lending/account/management/early_settlement/completed/');
    setRunOption(localStorage.getItem('runOption'));
  }, [loadStepDataPublic, runOption]);

  if (!pageData.payment_status) return null;

  return (
    <div className='payment-completed-screen'>
      <h1 style={{ marginTop: 20, marginBottom: 20 }}>Early settlement summary</h1>
      <div className='row mt-2'>
        <div className='col'>
          <div className='red-line' style={{ height: 3, width: 400, marginBottom: 20 }} />
        </div>
      </div>
      {pageData.payment_status === 'SUCCESS'
        ? (
          <ConfirmationBox
            header='Thanks for your payment'
            subheader='Your transation was successful'
            background={ EarlySettlement }
            paymentTable
            fileDownload
            btnText='Go to my products'
            repaymentAmount={ repaymentAmount }
            repaymentDate={ repaymentDate }
            btnLink='/lending/servicing'
            text1='We’ve got your payment and we will send
  you an email confirmation shortly.'
            text2='As your repayment is due in the next few
            days, we can’t cancel your monthly Direct
            Debit in time. This means that your regular
            repayment will go out as usual,
            but we’ll refund the money back to you as
            soon as we can.'
            customRender={ () => (
              <div className='row mt-2'>
                <div className='col'>
                  <strong>Reduction type</strong>
                </div>
                <div className='col text-right'>
                  <div>{runOption === 'hold_term' ? 'Reduced monthly repayment' : 'Reduced loan term'}</div>
                </div>
              </div>
            ) }
          />
        ) : (
          <Spinner />
        )
        }

    </div>
  );
};

export default SettlementCompleted;
