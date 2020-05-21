import React, { Fragment, useState, useEffect } from 'react';
import './ChooseLoan.scss';
import PropTypes from 'prop-types';
import Opacity from 'js/Components/Animations/Opacity';
import TextField from 'js/Components/Forms/TextField';
import { phoneNumber, required } from 'js/Validation';
import { Field } from 'redux-form';
import uuid from 'uuid';
import ProductItem from './ProductItem.jsx';


/*
  rate selection screen. It can display more than one rate if multiple products are available for selection
  Information required from GET:
    data.page_data.products.ask: {term_in_months, borrowing_amount, lend_date, repayment_day, request_id}
  Information submitted via POST:
    loan_product_id
  Unlike previous forms, data is submitted manuallyu on button click as this prevents having to do hidden fields in the form
*/

// TODO: this should probably be distributor start form?
const DistributorStartForm = (props) => {
  const { handleSubmit, pageData, change } = props;
  const [selected, setSelected] = useState(null);
  const [chosen, setChosen] = useState();

  useEffect(() => {

  }, [selected]);
  const selectedChoice = (e, index) => {
    change('loan_product_id', pageData.loan_offers[index].product_id);
    setChosen(index);
    setSelected(pageData.loan_offers[index].product_id);
  };
  return (
    <Fragment>
      <form className='container choose-loan-form form-container' style={{ maxWidth: 794 }} onSubmit={ handleSubmit }>
        {/* If data is not loaded yet, display a temporary message */}
        {pageData.loan_offers
          ? (
            <Opacity speed={ 300 }>
              <h1 style={{ marginBottom: 0 }}>Your loan from {pageData.distributor_name}</h1>
              <h3 style={{ marginTop: 40, marginBottom: 0 }}>This is your approved loan offer with your
                real rate.</h3>
              <h3 style={{ marginBottom: 20, marginTop: 0 }}>You&apos;ll need to verify your identity
                and sign the required legal documents.</h3>
              {pageData.loan_offers.map((product, index) => (
                <ProductItem
                  key={ uuid.v4() }
                  product={ product }
                  active={ index === chosen }
                  onClick={ (e) => { selectedChoice(e, index); } }
                />
              ))}

              <h3 style={{ marginTop: 20, marginBottom: 20 }}>We will need your phone number before you
                can proceed.</h3>
              <Field
                name='phone_number'
                dataCy='phone-number'
                placeholder='Phone number*'
                component={ TextField }
                type='text'
                validate={ [required, phoneNumber] }
              />
              <Field
                className='segmentsList'
                name='loan_product_id'
                value={ selected }
                component={ TextField }
                type='hidden'
              />
              <article>
                <button
                  className='btn btn-primary'
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
};

DistributorStartForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pageData: PropTypes.object,
  change: PropTypes.func,
};

DistributorStartForm.defaultProps = {
  pageData: null,
  change: () => {},
};

export default DistributorStartForm;
