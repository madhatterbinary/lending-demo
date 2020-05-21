import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import DocumentContainer from 'js/Components/DocumentViewer/DocumentContainer';
import CheckBoxField from 'js/Components/Forms/CheckBoxField';
import { required } from 'js/Validation';
import { BASE_URL } from 'js/Store/Api/axios';
import Spinner from 'js/Components/Spinner';

/*
  Sign legal documents step
  Information required from GET:
    data.page_data.documents.information_about_your_loan
    data.page_data.documents.pre-credit_contract_information
    data.page_data.documents.loan_agreement
  Information submitted via POST:
    fulfilment_consent: true
    disburse_consent: true
*/
class SignDocsForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    pageData: PropTypes.object.isRequired,
  }

  static defaultProps = {
    pageData: {
      agreement_documents: {},
    },
  }

  state = {
    doc1: false,
    doc2: false,
    doc3: false,
  }

  markDocumentAsRead = (docId) => {
    this.setState(prevstate => ({ ...prevstate, [docId]: true }));
  }

  isLoading() {
    const { pageData, submitting } = this.props;
    const documents = pageData.agreement_documents || {};
    return !documents.information_about_your_loan || submitting;
  }

  renderForm() {
    const { doc1, doc2, doc3 } = this.state;
    const { handleSubmit, submitting, invalid, pageData } = this.props;
    const documents = pageData.agreement_documents || {};
    return (
      <form className='container' onSubmit={ handleSubmit }>
        <div className='row mb-4'>
          <div className='col'>
            <h1>Sign your documents</h1>
          </div>
        </div>
        <div className='row mb-2'>
          <div className='col'>
            <strong>Important information</strong><br /><br />
            We have sent your loan documents to your email address: <strong>{pageData.user_email}</strong>
          </div>
        </div>
        <div className='row mb-4'>
          <div className='col'>
            These are two important documents about your loan. You should read and consider both carefully before signing your agreement.
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <DocumentContainer
              dataCy='loan-information-document'
              subTitle='1. Important information about your loan'
              btnText='Read'
              docType='firstDoc'
              copy='You can use this document to help you assess if the loan suits your need an situation. You should read and consider this fully.'
              url={ `${ BASE_URL }${ documents.information_about_your_loan.replace('doc_type=HTML', 'doc_type=PDF') }` }
              onLoadAction={ () => this.markDocumentAsRead('doc1') }
            />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <DocumentContainer
              dataCy='pre-contract-credit-information-document'
              subTitle='2. Your Pre-Contract Credit Information'
              btnText='Read'
              docType='secondDoc'
              copy='This document explains they key features of the product, the cost of credit and other legal aspects. You should and consider this fully.'
              url={ `${ BASE_URL }${ documents['pre-credit_contract_information'].replace('doc_type=HTML', 'doc_type=PDF') }` }
              onLoadAction={ () => this.markDocumentAsRead('doc2') }
            />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <Field
              dataCy='input-fulfilment-consent'
              name='fulfilment_consent'
              key='terms'
              label='I confirm that I have read the documents above and accept their terms.'
              component={ CheckBoxField }
              validate={ [required] }
              id='fulfilment_consent'
            />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <div className='sign-your-documents-content'>
              <div style={{ height: 20 }}>&nbsp;</div>
              {doc1 && doc2
                ? (
                  <Fragment>
                    <DocumentContainer
                      dataCy='credit-agreement-document'
                      subTitle='Your credit agreement'
                      btnText='Read'
                      docType='thirdDoc'
                      copy='Once you have read and signed the agreement, we will send your loan funds immediately. This can take up to 4 hours to reach your account. Do not sign this agreement if you are aware of any changes in your circunstancies which may have impact on your ability to pay back this loan.'
                      url={ `${ BASE_URL }${ documents.loan_agreement.replace('doc_type=HTML', 'doc_type=PDF') }` }
                      onLoadAction={ () => this.markDocumentAsRead('doc3') }
                    />
                    <Field
                      dataCy='input-disburse-consent'
                      name='disburse_consent'
                      key='consent'
                      label='SIGN HERE:  I have read the agreement by clicking "read" above. I confirm that by ticking this box, I am entering into agreement for the loan on the terms set out in the credit agreement, and that I will be bound by its terms.'
                      component={ CheckBoxField }
                      validate={ [required] }
                      id='disburse_consent'
                    />
                  </Fragment>
                ) : (
                  null
                )
              }
            </div>
            {!doc1 || !doc2 || !doc3
              ? <div>Please read and accept all of the documents above.</div>
              : null
            }
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <div>
              <button
                className='btn btn-primary'
                data-cy='input-agree-and-finish'
                style={{ marginTop: 20, marginBottom: 5 }}
                type='submit'
                disabled={ submitting || (!doc1 || !doc2 || !doc3) } // disable button if any of the documents has not been opened
              >
                Agree and finish
              </button>
            </div>
            <div>
              <label htmlFor='submit-warning' className='warning'>{ invalid || (!doc1 || !doc2 || !doc3) ? 'form incomplete, check above.' : ''}</label>
            </div>
          </div>
        </div>
      </form>
    );
  }

  render() {
    if (this.isLoading()) {
      return <Spinner />;
    }
    return this.renderForm();
  }
}

export default SignDocsForm;
