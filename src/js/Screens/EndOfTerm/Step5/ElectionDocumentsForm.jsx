import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ElectionDocuments.scss';
import { Field } from 'redux-form';
import { required } from 'js/Validation';
import CheckBoxField from 'js/Components/Forms/CheckBoxField';
import DocumentContainer from 'js/Components/DocumentViewer/DocumentContainer';

const ElectionDocumentsForm = props => {
  const { submitting, invalid, handleSubmit, pageData } = props;
  const [doc1, setDoc1] = useState(false);
  const [doc2, setDoc2] = useState(false);
  const [doc3, setDoc3] = useState(false);
  const [doc4, setDoc4] = useState(false);
  useEffect(() => {

  }, [doc1, doc2, doc3, doc4]);
  if (!pageData.documents || !pageData.documents.length) {
    return (
      <div>no docs provided</div>
    );
  }
  //docId
  const markDocumentAsRead = (docId) => {
    if (docId === 'doc0') {
      setDoc1(true);
    }
    if (docId === 'doc1') {
      setDoc2(true);
    }
    if (docId === 'doc2') {
      setDoc3(true);
    }
    if (docId === 'doc3') {
      setDoc4(true);
    }
  };

  return (
    <form className='container' onSubmit={ handleSubmit } style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', marginTop: 40, maxWidth: 990 }}>
      <div className='container red-box d-flex flex-column' style={{ maxWidth: 990 }}>
        <div style={{ margin: 30 }} className='form-container'>
          <h2>Before you continue please read and understand the following:</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40 }}>
            {pageData.documents.map((doc, index) => (
              <div key={ doc.document_name } className='docs-read'>
                <p>{ doc.document_display_name.replace('SmartSave', '') }</p>
                <div className='row'>
                  <div className='col' style={{ textAlign: 'center' }}>
                    <DocumentContainer
                      dataCy='loan-information-document'
                      btnText='Read'
                      docType='firstDoc'
                      url={ `${ doc.document_url.replace('doc_type=HTML', 'doc_type=PDF') }` }
                      onLoadAction={ () => markDocumentAsRead(`doc${ index }`) }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='form-row'>
            <Field
              name='documents_agreement_given'
              id='documents_agreement_given'
              label='I have read, understood and accepted the above documents.'
              component={ CheckBoxField }
              validate={ [required] }
            />
          </div>
        </div>
      </div>
      <button className='btn btn-primary' type='submit' disabled={ submitting } data-cy='action-get-rate' style={{ alignSelf: 'flex-end', marginTop: 40 }}>
        Open new savings account
      </button>
      <label style={{ textAlign: 'end', marginTop: 5 }} htmlFor='submit-warning' className='warning'>{ invalid || (!doc1 || !doc2 || !doc3 || !doc4) ? 'form incomplete, check above.' : ''}</label>
    </form>
  );
};

ElectionDocumentsForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pageData: PropTypes.object.isRequired,
};

export default ElectionDocumentsForm;
