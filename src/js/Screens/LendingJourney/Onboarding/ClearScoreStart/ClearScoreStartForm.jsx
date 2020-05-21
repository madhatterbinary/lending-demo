import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './ChooseLoan.scss';
import PropTypes from 'prop-types';
import Opacity from 'js/Components/Animations/Opacity';
import TextField from 'js/Components/Forms/TextField';
import { required, phoneNumber } from 'js/Validation';
import { Field } from 'redux-form';


/*
  rate selection screen. It can display more than one rate if multiple products are available for selection
  Information required from GET:
    data.page_data.products.ask: {term_in_months, borrowing_amount, lend_date, repayment_day, request_id}
  Information submitted via POST:
    loan_product_id
  Unlike previous forms, data is submitted manuallyu on button click as this prevents having to do hidden fields in the form
*/
// TODO: this should probably be distributor start form?
class ClearScoreStartForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pageData: PropTypes.object,
  }

  static defaultProps = {
    pageData: null,
  };

  render() {
    const { handleSubmit, pageData } = this.props;
    return (
      <Fragment>
        <form className='choose-loan-form form-container' style={{ maxWidth: '100%' }} onSubmit={ handleSubmit }>
          {/* If data is not loaded yet, display a temporary message */}
          {pageData.loan_offer
            ? (
              <Opacity speed={ 300 }>
                <h1 style={{ marginBottom: 0 }}>Your loan from CS</h1>
                <h3 style={{ marginTop: 40, marginBottom: 0 }}>This is your approved loan offer with your real rate.</h3>
                <h3 style={{ marginBottom: 20, marginTop: 0 }}>You&apos;ll need to verify your identity and sign the required legal documents.</h3>
                { pageData.loan_offer && (
                <Fragment>
                  <nav className='primary-color-stripe odd-stripe' style={{ marginBottom: 0, marginTop: 0, padding: 0, color: 'transparent' }}>
                    <div className='primary-color-stripe-content stripe-container' style={{ paddingBottom: 20 }}>
                      <article style={{ borderTop: '1px solid #b4b4b4', borderLeft: '1px solid #b4b4b4', width: 540, paddingLeft: 50, paddingRight: 50 }}>
                        <h4 className='grey table' style={{ fontSize: '1.3em' }}>Amount</h4>
                        <h1 className='title grey table' style={{ top: 0, fontSize: '1.3em' }}>{`£${ pageData.loan_offer.initial_amount }`}</h1>
                      </article>

                      <article style={{ borderTop: '1px solid #b4b4b4', borderLeft: '1px solid #b4b4b4', width: 540, paddingLeft: 50, paddingRight: 50 }}>
                        <h4 className='grey table' style={{ fontSize: '1.3em' }}>Your real rate</h4>
                        <h1 className='title grey table' style={{ top: 0, fontSize: '1.3em' }}>{`${ Number(pageData.loan_offer.apr) }%`}</h1>
                      </article>

                      <article style={{ borderTop: '1px solid #b4b4b4', borderLeft: '1px solid #b4b4b4', borderBottom: '1px solid #b4b4b4', width: 540, paddingLeft: 50, paddingRight: 50 }}>
                        <h4 className='grey table' style={{ fontSize: '1.3em' }}>Monthly payments ({pageData.loan_offer.term})</h4>
                        <h1 className='title grey table' style={{ top: 0, fontSize: '1.3em' }}>{`£${ pageData.loan_offer.monthly_payments }`}</h1>
                      </article>
                    </div>
                    <article className='middle-container'>
                      <h4 className='white'>Total amount payable</h4>
                      <h1 className='title white' style={{ fontSize: '2.3em' }}>{ `£${ pageData.loan_offer.total_amount } `}</h1>
                      <Link className='edit-loan' to='/lending/getaloan' data-cy='action-edit-loan'>
                        <i className='material-icons'>edit</i>
                      </Link>
                    </article>
                  </nav>
                </Fragment>
                )}
                <h3 style={{ marginTop: 20, marginBottom: 20 }}>We will need your phone number before you can proceed.</h3>
                <Field
                  name='phone_number'
                  dataCy='phone-number'
                  placeholder='Phone number*'
                  component={ TextField }
                  type='text'
                  validate={ [required, phoneNumber] }
                />
                <Field
                  name='loan_product_id'
                  component={ TextField }
                  type='hidden'
                />
                <article>
                  <button
                    className='button secondary-invert-color'
                    style={{ width: 185, margin: 20 }}
                    type='submit'
                    data-cy='action-distributor-start-next-step'
                  >
                    Next step
                  </button>
                </article>
              </Opacity>
            )
            : null
        }
        </form>
      </Fragment>
    );
  }
}

export default ClearScoreStartForm;
