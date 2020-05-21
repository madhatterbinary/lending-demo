import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { push } from 'connected-react-router';
import CheckBoxField from 'js/Components/Forms/CheckBoxField';
import './CommunicationPreferencesForm.scss';

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

    return (
      <Fragment>
        <form className='communication-preferences-screen' onSubmit={ handleSubmit }>
          <h1>Preferences</h1>
          <br /><br />
          <div className='communication-preferences-content'>
            <div className='box-preference'>
              <h4 className='title'>Tell us how you would like us to get in touch</h4>
              <Field
                name='email'
                dataCy='input-communication-method-email'
                key='email'
                label='Email'
                component={ CheckBoxField }
                id='i5'
              />
              <Field
                name='sms'
                dataCy='input-communication-method-sms'
                key='sms'
                label='Text message'
                component={ CheckBoxField }
                id='i6'
              />

              <Field
                name='phone'
                dataCy='input-communication-method-phone'
                key='phone'
                label='Phone'
                component={ CheckBoxField }
                id='i7'
              />
            </div>
            <div className='box-preference'>
              <h4 className='title'>Tell us what topics you want to hear about</h4>
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
          <button
            className='button secondary-invert-color'
            style={{ margin: 50 }}
            type='submit'
            disabled={ submitting }
            data-cy='action-agree-to-communication-preferences'
            onClick={ () => {
              handleSubmit();
              dispatch(push('/lending/servicing'));
            } }
          >
            Agree and finish
          </button>
        </form>
      </Fragment>
    );
  }
}

export default CommunicationPreferencesForm;
