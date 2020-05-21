import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { push } from 'connected-react-router';
import CheckBoxField from 'js/Components/Forms/CheckBoxField';
import 'js/Components/ServicingForms/CommunicationPreferencesForm.scss';
import Spinner from 'js/Components/Spinner';

class CommunicationPreferencesForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  render() {
    const { handleSubmit, submitting, dispatch } = this.props;

    if (submitting) return <Spinner />;
    return (
      <form className='communication-preferences-screen' onSubmit={ handleSubmit }>
        <div className='container'>
          <div style={{ marginBottom: 50 }} className='row mt-4'>
            <div className='col'>
              <h1>Preferences</h1>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col'>
              <div>You can select your preferences here for optional communications.</div>
              <div>We&apos;ll still need to send you legal documents by email.</div>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col'>
              <strong>Tell us how you would like us to get in touch</strong>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col'>
              <Field
                name='email'
                dataCy='input-communication-method-email'
                key='email'
                label='Email'
                component={ CheckBoxField }
                id='i5'
              />
            </div>
            <div className='col'>
              <Field
                name='sms'
                dataCy='input-communication-method-sms'
                key='sms'
                label='Text message'
                component={ CheckBoxField }
                id='i6'
              />
            </div>
            <div className='col'>
              <Field
                name='phone'
                dataCy='input-communication-method-phone'
                key='phone'
                label='Phone'
                component={ CheckBoxField }
                id='i7'
              />
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col'>
              <strong>Tell us what topics you want to hear about</strong>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col'>
              <Field
                name='account_changes'
                dataCy='input-communication-preference-account-changes'
                key='account_changes'
                label='Account changes'
                component={ CheckBoxField }
                id='i8'
              />
            </div>
            <div className='col'>
              <Field
                name='product_offers'
                dataCy='input-communication-preference-product-offers'
                key='product_offers'
                label='Product offers'
                component={ CheckBoxField }
                id='i9'
              />
            </div>
            <div className='col' />
          </div>
          <div className='row'>
            <div className='col text-right'>
              <button
                data-cy='action-agree-to-communication-preferences'
                className='btn btn-primary'
                style={{ margin: 50, marginRight: 160 }}
                type='submit'
                disabled={ submitting }
                onClick={ () => {
                  handleSubmit();
                  dispatch(push('/servicing'));
                } }
              >
                Save preferences
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default CommunicationPreferencesForm;
