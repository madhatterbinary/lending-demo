import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import CheckBoxField from 'js/Components/Forms/CheckBoxField';
// import './EditCommunicationPreferencesForm.scss';

class CommunicationPreferencesForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
  }

  static defaultProps = {
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <Fragment>
        <form className='communication-preferences-box mt-2' onSubmit={ handleSubmit }>
          <div className='communication-preferences-content' style={{ position: 'relative' }}>
            <div className='box-preference get-in-touch' style={{ position: 'absolute', marginLeft: 5 }}>
              <p className='bold' style={{ lineHeight: 1.2, marginBottom: 30 }}><strong>Tell us how you would like us to get in touch</strong></p>
              <Field
                name='email'
                key='email'
                dataCy='input-communication-method-email'
                label='Email'
                component={ CheckBoxField }
                id='i5'
              />
              <Field
                name='sms'
                key='sms'
                dataCy='input-communication-method-sms'
                label='Text message'
                component={ CheckBoxField }
                id='i6'
              />

              <Field
                name='phone'
                key='phone'
                dataCy='input-communication-method-phone'
                label='Phone'
                component={ CheckBoxField }
                id='i7'
              />
            </div>
            <div className='box-preference topics' style={{ position: 'absolute', left: '-370px', marginTop: '-20px' }}>
              <p className='bold' style={{ lineHeight: 1.2, marginBottom: 30, marginTop: 20 }}><strong>Tell us what topics you want to hear about</strong></p>
              <Field
                name='account_changes'
                dataCy='input-communication-preference-account-changes'
                key='account_changes'
                label='Account changes'
                component={ CheckBoxField }
                id='i8'
              />
              <Field
                name='product_offers'
                dataCy='input-communication-preference-product-offers'
                key='product_offers'
                label='Product offers'
                component={ CheckBoxField }
                id='i9'
              />
            </div>
          </div>
          <article style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <button className='btn btn-primary' type='submit' disabled={ submitting } style={{ marginTop: 150 }} data-cy='action-save-communication-preferences'>
              Save
            </button>
          </article>
        </form>
      </Fragment>
    );
  }
}

export default CommunicationPreferencesForm;
