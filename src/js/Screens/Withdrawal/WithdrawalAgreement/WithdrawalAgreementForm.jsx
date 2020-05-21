import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import CheckBoxField from 'js/Components/Forms/CheckBoxField';
import Opacity from 'js/Components/Animations/Opacity.jsx';
import { required } from 'js/Validation';

class WithdrawalAgreementForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    onChange: () => {},
    invalid: null,
  };

  render() {
    const {
      submitting,
      handleSubmit,
      onChange,
    } = this.props;
    return (
      <Opacity speed={ 300 }>
        <form onSubmit={ handleSubmit } onChange={ onChange }>
          <div className='container p-0 m-0'>
            <div
              className='row mt-3'
              ref={ (el) => {
                if (el) {
                  el.style.setProperty('margin-top', 0, 'important');
                }
              } }
            >
              <div
                className='col'
                ref={ (el) => {
                  if (el) {
                    el.style.setProperty('margin-bottom', 50, 'important');
                  }
                } }
              >
                <div style={{ marginBottom: 15 }}>This cannot be reversed.</div>
                <Field
                  name='withdrawal_agreement'
                  dataCy='input-withdrawal-agreement'
                  key='agreement'
                  label='Withdrawal agreement.'
                  component={ CheckBoxField }
                  id='i119'
                  validate={ [required] }
                />
              </div>
            </div>
            <div
              className='row mb-3'
              style={{ marginTop: 25 }}
              ref={ (el) => {
                if (el) {
                  el.style.setProperty('margin-bottom', 0, 'important');
                }
              } }
            >
              <div
                className='col text-right'
                ref={ (el) => {
                  if (el) {
                    el.style.setProperty('margin-top', 0, 'important');
                    el.style.setProperty('display', 'flex');
                    el.style.setProperty('justify-content', 'space-between');
                  }
                } }
              >
                <Link to='/lending/servicing/manageloan/makepayment'>
                  <button
                    data-cy='action-cancel-withdrawal'
                    className='btn btn-white ml-3'
                    type='button'
                    ref={ (el) => {
                      if (el) {
                        el.style.setProperty('margin-left', 0, 'important');
                      }
                    } }
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  className='btn btn-primary'
                  data-cy='action-continue-withdrawal'
                  type='submit'
                  onClick={ handleSubmit }
                  disabled={ submitting }
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </form>
      </Opacity>
    );
  }
}

export default WithdrawalAgreementForm;
