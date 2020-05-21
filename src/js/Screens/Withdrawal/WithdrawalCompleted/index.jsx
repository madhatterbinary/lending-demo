import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as actions from 'js/Store/Actions/generic';
import PropTypes from 'prop-types';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import ConfirmationBox from 'js/Components/ConfirmationBox';
import WithdrawalBg from 'js/assets/images/WithdrawalBg.png';
import Spinner from 'js/Components/Spinner';

const WithdrawalCompelted = (props) => {
  const { pageData, repaymentAmount, repaymentDate } = useSelector(state => ({
    pageData: state.stepData.pageData,
    repaymentAmount: state.stepData.pageData.REPAYMENT_AMOUNT,
    repaymentDate: state.stepData.pageData.REPAYMENT_DATE,
  }));
  const { loadStepDataPublic } = useActions(actions);
  const { location: { pathname } } = props;

  useEffect(() => {
    loadStepDataPublic('/lending/account/management/withdrawal/completed/');
  }, [loadStepDataPublic]);

  if (!pageData.payment_status) return null;
  if (document.getElementsByClassName('servicing-header')[0]) {
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
            background={ WithdrawalBg }
            pathname={ pathname }
            paymentTable
            fileDownload
            status={ pageData.payment_status }
            btnText='Go to my products'
            btnLink='/lending/servicing'
            text1='We’ve got your payment and we will send
  you an email confirmation shortly.'
            text2='Your regular
            repayment will go out as usual,
            but we’ll refund the money back to you as
            soon as we can.'
          />
        ) : (
          <p><Spinner /></p>
        )
        }

    </div>
  );
};

WithdrawalCompelted.propTypes = {
  location: PropTypes.object,
};

WithdrawalCompelted.defaultProps = {
  location: {},
};

export default WithdrawalCompelted;
