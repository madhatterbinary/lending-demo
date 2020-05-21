import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as actions from 'js/Store/Actions/generic';
import PropTypes from 'prop-types';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import ConfirmationBox from 'js/Components/ConfirmationBox';
import OverpaymentBg from 'js/assets/images/OverpaymentBg.png';
import Spinner from 'js/Components/Spinner';

const PaymentCompelted = (props) => {
  const { pageData, repaymentAmount, repaymentDate } = useSelector(state => ({
    pageData: state.stepData.pageData,
    repaymentAmount: state.stepData.pageData.REPAYMENT_AMOUNT,
    repaymentDate: state.stepData.pageData.REPAYMENT_DATE,
  }));
  const [runOption, setRunOption] = useState(null);
  const { loadStepDataPublic } = useActions(actions);

  useEffect(() => {
    loadStepDataPublic('/lending/account/management/payment/completed/');
    setRunOption(localStorage.getItem('runOption'));
  }, [runOption]);
  const { location: { pathname } } = props;
  if (document.getElementsByClassName('servicing-header')[0]) {
    document.getElementsByClassName('servicing-header')[0].style.display = 'none';
  }
  if (pageData.payment_status === 'SUCCESS' && document.getElementsByClassName('servicing-header')[0] && repaymentAmount && repaymentDate) {
    document.getElementsByClassName('servicing-header')[0].style.display = 'block';
  }

  return (
    <div className='payment-completed-screen'>
      {pageData.payment_status === 'SUCCESS'
        ? (
          <ConfirmationBox
            header='Thanks for your payment'
            subheader='Your transation was successful'
            repaymentAmount={ repaymentAmount }
            repaymentDate={ repaymentDate }
            pathname={ pathname }
            background={ OverpaymentBg }
            paymentTable
            fileDownload
            btnText='Go to my products'
            btnLink='/lending/servicing'
            text1='We’ve got your payment and we will send
  you an email confirmation shortly.'
            customRender={ () => (
              <>
                <div className='row mt-2'>
                  <div className='col'>
                    <strong>Reduction type</strong>
                  </div>
                  <div className='col text-right'>
                    <div style={{ width: 'max-content', alignSelf: 'flex-end' }}>{runOption === 'hold_term' ? 'Reduced monthly repayment' : 'Reduced loan term'}</div>
                  </div>
                </div>
                <div className='row mt-2'>
                  <div className='col'>
                    <div className='red-line' />
                  </div>
                </div>
              </>
            ) }
          />
        ) : (
          <Spinner />
        )
      }
    </div>
  );
};

PaymentCompelted.propTypes = {
  location: PropTypes.object,
};

PaymentCompelted.defaultProps = {
  location: {},
};

export default PaymentCompelted;
