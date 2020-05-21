import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Opacity from 'js/Components/Animations/Opacity';
import { submitStepDataCSRF } from 'js/Store/Actions/generic';
import Spinner from 'js/Components/Spinner';
import YourLoanFeatures from './YourLoanFeatures';


/*
  rate selection screen. It can display more than one rate if multiple products are available for selection
  Information required from GET:
    data.page_data.products.ask: {term_in_months, borrowing_amount, lend_date, repayment_day, request_id}
  Information submitted via POST:
    loan_product_id

  Unlike previous forms, data is submitted manuallyu on button click as this prevents having to do hidden fields in the form
*/
class ChooseLoanForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    pageData: PropTypes.object,
  }

  static defaultProps = {
    pageData: null,
  };

  isLoadingRate() {
    const { pageData } = this.props;
    return !pageData.products || !pageData.products.responses;
  }

  renderProducts(pageData, dispatch) {
    if (pageData.products && pageData.products.responses.length > 0) {
      return (
        pageData.products.responses.map(product => {
          return (
            <div className='row bg-light-gray mb-2' key={ product.loan_product_id }>
              <div className='col-2 p-2 pt-3 pb-3 m-0 pl-4'>
                <div>Amount</div>
                <div><strong>{`£${ product.loan_amount }`}</strong></div>
              </div>
              <div className='col-2 p-2 pt-3 pb-3 m-0 pl-3'>
                <div>Your real rate</div>
                <div><strong>{`${ product.loan_personalised_rate }%`}</strong></div>
              </div>
              <div className='col-4 p-2 pt-3 pb-3 m-0 pl-3'>
                <div>12 monthly payments</div>
                <div><strong>{`£${ product.loan_monthly_payments }`}</strong></div>
              </div>
              <div className='col-4 p-2 pt-3 pb-3 m-0 bg-primary text-white' data-cy='action-choose-loan'>
                <div className='container' style={{ cursor: 'pointer' }} onClick={ () => dispatch(submitStepDataCSRF('/lending/yourdecision/', { loan_product_id: product.loan_product_id })) }>
                  <div className='row'>
                    <div className='col-9'>
                      <div>Total amount payable</div>
                      <div><strong>{ `£${ product.loan_total_payable } `}</strong></div>
                    </div>
                    <div className='col-2 d-flex align-items-center'>
                      <i className='material-icons'>chevron_right</i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      );
    }
    return <div />;
  }

  renderLoan() {
    const { handleSubmit, pageData, dispatch } = this.props;
    return (
      <Opacity speed={ 300 }>
        <form className='container' onSubmit={ handleSubmit }>
          <div className='row'>
            <div className='col p-0 m-0 mb-4'>
              <h1 style={{ marginBottom: 30 }}>Your loan</h1>
            </div>
          </div>
          <div className='row'>
            <div className='col p-0 m-0'>
              <div>This is your approved loan offer with your real rate.</div>
            </div>
          </div>
          <div className='row'>
            <div className='col p-0 m-0 mb-4'>
              <div>You&apos;ll need to verify your identity and sign the required legal documents.</div>
            </div>
          </div>
          <div className='row'>
            <div className='col p-0 m-0'>
              <div className='container'>
                {this.renderProducts(pageData, dispatch)}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col p-0 m-0'>
              <YourLoanFeatures />
            </div>
          </div>
        </form>
      </Opacity>
    );
  }

  render() {
    if (this.isLoadingRate()) {
      return <Spinner />;
    }
    return this.renderLoan();
  }
}

export default ChooseLoanForm;
