import React, { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Toast from 'js/Components/Toasts';
import * as actionsGeneric from 'js/Store/Actions/generic';
import * as actionsApplication from 'js/Store/Actions/application';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import { reduxForm, formValueSelector } from 'redux-form';
import { validateAddresses } from 'js/Store/hoc/AddressHC/addressValidation.jsx';
import PersonalDetailsForm from 'js/Components/ServicingForms/PersonalDetailsForm';
import { modifyAddressArray } from 'js/Utils/formUtils';
import AddressForm from 'js/Components/JourneysForms/AddressForm.jsx';
import BankAccountForm from 'js/Components/ServicingForms/BankAccountForm';
import EditCommunicationPreferencesForm from 'js/Components/ServicingForms/EditCommunicationPreferencesForm';
import Spinner from 'js/Components/Spinner';
//
export default function (Account, url) {
  const selector = formValueSelector('update-address-form');

  const PersonalDetailsFormFieldsWrapped = reduxForm({
    form: 'personal-details-form',
    enableReinitialize: true,
  })(PersonalDetailsForm);

  const UpdateAddressFormWrapped = reduxForm({
    form: 'update-address-form',
    validate: validateAddresses,
    enableReinitialize: true,
  })(AddressForm);

  const BankAccountFormWrapped = reduxForm({
    form: 'bank-account-form',
    enableReinitialize: true,
  })(BankAccountForm);

  const EditCommunicationPreferencesFormWrapped = reduxForm({
    form: 'comm-pref-form',
    enableReinitialize: true,
  })(EditCommunicationPreferencesForm);

  function Accounts(props) {
    const { loadStepDataPublic, submitStepDataCSRF } = useActions(actionsGeneric);
    const { requestPaswordReset } = useActions(actionsApplication);
    const [displayPersonallDetailsDialog, setDisplayPersonalDetailsDialog] = useState(false);
    const [displayAddressesDialog, setDisplayAddressesDialog] = useState(false);
    const [displayBankAccountDialog, setDisplayBankAccountDialog] = useState(false);
    const [passwordSubmit, setPasswordSubmit] = useState(false);
    const { location: { pathname } } = props;
    const { updatedAddress, formData, options, addresses, addressData, data, miscMessage, message, isError, errorNumber, checkSave } = useSelector(state => {
      if (state.application.miscMessage) {
        return {
          updatedAddress: [{
            line_1: selector(state, 'addresses[0].line_1'),
            line_2: selector(state, 'addresses[0].line_2'),
            building: selector(state, 'addresses[0].building'),
            postcode: selector(state, 'addresses[0].postcode'),
            post_town: selector(state, 'addresses[0].post_town'),
            address_type: selector(state, 'addresses[0].address_type'),
            update_move_in_date: selector(state, 'addresses[0].update_move_in_date'),
            residential_status: selector(state, 'addresses[0].residential_status'),
            house_number_search: selector(state, 'addresses[0].house_number_search'),
            move_out_date: selector(state, 'addresses[0].move_out_date'),
            ptcabs: selector(state, 'addresses[0].ptcabs'),
            unique_address_id: selector(state, 'addresses[0].unique_address_id'),

          }],
          data: state.stepData.serverData,
          formData: state.stepData.formData,
          options: state.stepData.options,
          addresses: state.stepData.pageData.addresses,
          addressData: state.application.ticketChecker.addresses,
          miscMessage: state.application.miscMessage.message,
          message: (((state.stepData || {}).warning || {}).payload || {}).msg,
          isError: (((state.stepData || {}).warning || {}).payload || {}).iserror,
          errorNumber: (((state.stepData || {}).warning || {}).payload || {}).errcode,
          checkSave: state,
        };
      }
      return {
        updatedAddress: [{
          line_1: selector(state, 'addresses[0].line_1'),
          line_2: selector(state, 'addresses[0].line_2'),
          building: selector(state, 'addresses[0].building'),
          postcode: selector(state, 'addresses[0].postcode'),
          post_town: selector(state, 'addresses[0].post_town'),
          address_type: selector(state, 'addresses[0].address_type'),
          update_move_in_date: selector(state, 'addresses[0].update_move_in_date'),
          residential_status: selector(state, 'addresses[0].residential_status'),
          house_number_search: selector(state, 'addresses[0].house_number_search'),
          move_out_date: selector(state, 'addresses[0].move_out_date'),
          ptcabs: selector(state, 'addresses[0].ptcabs'),
          unique_address_id: selector(state, 'addresses[0].unique_address_id'),
        }],
        data: state.stepData.serverData,
        formData: state.stepData.formData,
        options: state.stepData.options,
        addresses: state.stepData.pageData.addresses,
        addressData: state.application.ticketChecker.addresses,
        message: (((state.stepData || {}).warning || {}).payload || {}).msg,
        isError: (((state.stepData || {}).warning || {}).payload || {}).iserror,
        errorNumber: (((state.stepData || {}).warning || {}).payload || {}).errcode,
        checkSave: state,
      };
    });
    const resetAllDialog = () => {
      setDisplayPersonalDetailsDialog(false);
      setDisplayAddressesDialog(false);
      setDisplayBankAccountDialog(false);
    };

    useEffect(() => {
      loadStepDataPublic(`/${ url }/account/`);
      if ((((checkSave.stepData || {}).warning || {}).payload || {}).msg !== 'No changes detected') {
        resetAllDialog();
      }
    }, [message]);

    const handleTogglePersoanlDetailsDialog = () => {
      setDisplayPersonalDetailsDialog(true);
      setDisplayAddressesDialog(false);
      setDisplayBankAccountDialog(false);
    };

    const handleToggleBankAccountDialog = () => {
      setDisplayPersonalDetailsDialog(false);
      setDisplayAddressesDialog(false);
      setDisplayBankAccountDialog(true);
    };

    const onSubmitPersonalDetails = (values) => {
      submitStepDataCSRF(`/${ url }/account/update_person_details/`, values);
      resetAllDialog();
    };

    const onSubmitAddress = (values) => {
      submitStepDataCSRF(`/${ url }/account/update_address/`, { addresses: modifyAddressArray(values.addresses) });
      resetAllDialog();
    };

    const onSubmitBankAccount = (values) => {
      submitStepDataCSRF(`/${ url }/account/update_bank_account/`, values);
      resetAllDialog();
    };

    const onSubmitCommunicationPreference = (values) => {
      submitStepDataCSRF(`${ url }/account/update_account_details/`, values);
    };

    const onPasswordSubmitted = () => {
      setPasswordSubmit(true);
      requestPaswordReset();
    };
    if (data === undefined || data.data === undefined) {
      if (document.getElementsByClassName('servicing-header')[0]) {
        document.getElementsByClassName('servicing-header')[0].style.display = 'none';
      }
      return <Spinner />;
    }
    if (document.getElementsByClassName('servicing-header')[0]) {
      document.getElementsByClassName('servicing-header')[0].style.display = 'block';
    }

    return (
      <Account>
        <Toast
          message={ message }
          errorCode={ errorNumber }
          toastError={ isError }
        />
        <div className='container mt-4'>
          { localStorage.getItem('MenuOption') === 'Account'
            ? (
              <div
                className='row mb-5 pt-5'
                ref={ (el) => {
                  if (el) {
                    el.style.setProperty('padding-top', '0px', 'important');
                  }
                } }
              >
                <div className='col pr-3'>
                  <div className='container red-box d-flex flex-column' style={{ height: 530 }}>
                    <div className='row'>
                      <div className='col p-0 m-3'>
                        {!displayAddressesDialog && addresses
                          ? (
                            <div className='non-editable'>
                              <h3 className='title' style={{ marginBottom: 9 }}>Current address</h3>
                              <div className='row' style={{ marginBottom: 14 }}>
                                <div className='col'>
                                  <div className='red-line' />
                                </div>
                              </div>
                              <div className='blocks'>
                                <p className='bold-text'><strong>House number</strong></p>
                                <p>{ addresses[0].building }</p>
                                <div className='row' style={{ marginBottom: 15 }}>
                                  <div className='col'>
                                    <div className='grey-dotted-line' />
                                  </div>
                                </div>
                                <p className='bold-text'><strong>Street</strong></p>
                                <p>{ addresses[0].line_1 }</p>
                                <div className='row' style={{ marginBottom: 15 }}>
                                  <div className='col'>
                                    <div className='grey-dotted-line' />
                                  </div>
                                </div>
                              </div>
                              <div className='blocks'>
                                <p className='bold-text'><strong>City/Town</strong></p>
                                <p>{ addresses[0].line_2 }</p>
                                <div className='row' style={{ marginBottom: 15 }}>
                                  <div className='col'>
                                    <div className='grey-dotted-line' />
                                  </div>
                                </div>
                                <p className='bold-text'><strong>County</strong></p>
                                <p>{ addresses[0].post_town }</p>
                                <div className='row' style={{ marginBottom: 15 }}>
                                  <div className='col'>
                                    <div className='grey-dotted-line' />
                                  </div>
                                </div>
                              </div>
                              <div className='blocks'>
                                <p className='bold-text'><strong>Postcode</strong></p>
                                <p>{ addresses[0].postcode }</p>
                                <div className='row' style={{ marginBottom: 15 }}>
                                  <div className='col'>
                                    <div className='grey-dotted-line' />
                                  </div>
                                </div>
                                <p className='bold-text'><strong>Date moved in</strong></p>
                                <p>{ addresses[0].move_in_date }</p>
                              </div>
                            </div>
                          ) : (
                            <div className='editable-form'>
                              {addresses
                                ? (
                                  <UpdateAddressFormWrapped
                                    onSubmit={ (values) => onSubmitAddress(values) }
                                    options={ options }
                                    addressData={ addressData }
                                    updatedAddress={ updatedAddress }
                                    initialValues={{ addresses: [...addresses] }}
                                    location={ pathname }
                                  />
                                ) : null
                          }
                            </div>
                          )
                        }
                      </div>
                    </div>
                    <div className='row pb-3' style={{ flexGrow: 1 }}>
                      <div className='col d-flex justify-content-end h-100'>
                        {/*<i
                          onClick={ handleToggleAddressDialog }
                          style={{ cursor: 'pointer' }}
                          className='material-icons text-primary  d-flex align-items-end'
                      >border_color</i>*/}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col pr-3'>
                  <div className='container red-box d-flex flex-column' style={{ height: '100%' }}>
                    <div className='row' style={{ marginRight: '-17px', marginLeft: '-17px' }}>
                      <div className='col p-0 m-3'>
                        {!displayPersonallDetailsDialog
                          ? (
                            <Fragment>
                              <div className='non-editable' data-cy='info-person-details' style={{ height: `${ 100 }%` }}>
                                <div
                                  className='row pb-3'
                                  ref={ (el) => {
                                    if (el) {
                                      el.style.setProperty('margin-left', '0px');
                                      el.style.setProperty('padding', '0px', 'important');
                                    }
                                  } }
                                >
                                  <h3 className='title'>Personal details</h3>
                                  <div
                                    className='col d-flex justify-content-end h-100'
                                    ref={ (el) => {
                                      if (el) {
                                        el.style.setProperty('height', '25px', 'important');
                                        el.style.setProperty('top', '10px');
                                      }
                                    } }
                                  >
                                    {!displayPersonallDetailsDialog
                                      ? (
                                        <i
                                          data-cy='action-edit-personal-details'
                                          className='material-icons text-primary d-flex align-items-end'
                                          onClick={ handleTogglePersoanlDetailsDialog }
                                          style={{ marginBottom: 0, fontSize: '1.6em', color: '#E83D52', lineHeight: 'unset', cursor: 'pointer', position: 'relative', bottom: 5 }}
                                        >edit</i>
                                      ) : null }
                                  </div>
                                </div>
                                <div className='row' style={{ marginBottom: 15 }}>
                                  <div className='col'>
                                    <div className='red-line' />
                                  </div>
                                </div>
                                <p className='bold-text'><strong>Title</strong></p>
                                <p>{ formData.person_title }</p>
                                <div className='row' style={{ marginBottom: 15 }}>
                                  <div className='col'>
                                    <div className='grey-dotted-line' />
                                  </div>
                                </div>
                                <p className='bold-text'><strong>First name</strong></p>
                                <p>{ formData.first_name }</p>
                                <div className='row' style={{ marginBottom: 15 }}>
                                  <div className='col'>
                                    <div className='grey-dotted-line' />
                                  </div>
                                </div>
                                <p className='bold-text'><strong>Last name</strong></p>
                                <p>{ formData.last_name }</p>
                                <div className='row' style={{ marginBottom: 15 }}>
                                  <div className='col'>
                                    <div className='grey-dotted-line' />
                                  </div>
                                </div>
                                <p className='bold-text'><strong>Phone number</strong></p>
                                <p>{ formData.phone_number }</p>
                              </div>
                            </Fragment>
                          ) : (

                            <div className='editable-form'>
                              <PersonalDetailsFormFieldsWrapped
                                onSubmit={ (values) => onSubmitPersonalDetails(values) }
                                initialValues={ formData }
                                options={ options }
                              />
                            </div>

                          )
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col pr-3'>
                  <div className='container red-box d-flex flex-column' style={{ height: '100%' }}>
                    <div className='row' style={{ marginRight: '-17px', marginLeft: '-17px' }}>
                      <div className='col p-0 m-3'>
                        {!displayBankAccountDialog
                          ? (
                            <Fragment>
                              <div className='non-editable' data-cy='info-person-details' style={{ height: `${ 100 }%` }}>
                                <div
                                  className='row pb-3'
                                  ref={ (el) => {
                                    if (el) {
                                      el.style.setProperty('margin-left', '0px');
                                      el.style.setProperty('padding', '0px', 'important');
                                    }
                                  } }
                                >
                                  <h3 className='title'>Bank account</h3>
                                  <div
                                    className='col d-flex justify-content-end h-100'
                                    ref={ (el) => {
                                      if (el) {
                                        el.style.setProperty('height', '25px', 'important');
                                        el.style.setProperty('top', '10px');
                                      }
                                    } }
                                  >
                                    {!displayBankAccountDialog
                                      ? (
                                        <i
                                          data-cy='action-edit-bank-details'
                                          className='material-icons text-primary d-flex align-items-end'
                                          onClick={ handleToggleBankAccountDialog }
                                          style={{ marginBottom: 0, fontSize: '1.6em', color: '#E83D52', lineHeight: 'unset', cursor: 'pointer', position: 'relative', bottom: 5 }}
                                        >edit</i>
                                      ) : null }
                                  </div>
                                </div>
                                <div className='row' style={{ marginBottom: 15 }}>
                                  <div className='col'>
                                    <div className='red-line' />
                                  </div>
                                </div>
                                <p className='bold-text'><strong>Sort code</strong></p>
                                <p>{ formData.sort_code }</p>
                                <div className='row' style={{ marginBottom: 15 }}>
                                  <div className='col'>
                                    <div className='grey-dotted-line' />
                                  </div>
                                </div>
                                <p className='bold-text'><strong>Account number</strong></p>
                                <p>{ formData.account_number }</p>
                              </div>
                            </Fragment>
                          ) : (

                            <div className='editable-form'>
                              <BankAccountFormWrapped
                                onSubmit={ (values) => onSubmitBankAccount(values) }
                                initialValues={ formData }
                              />
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ) : null
        }
          { localStorage.getItem('MenuOption') === 'Preferences'
            ? (
              <Fragment>
                <div className='container red-box mt-4' style={{ height: 280 }}>
                  <div className='row'>
                    <div className='col pt-2' style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
                      <h3 className='title' style={{ marginTop: 0 }}>Ways you like us to get in touch with you</h3>
                      <i className='material-icons' style={{ color: '#E83D52', fontSize: '1.8em', position: 'relative', top: '5px' }}>done_all</i>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col'>
                      <div className='red-line' />
                    </div>
                  </div>
                  <div className='col' style={{ paddingRight: 0, paddingLeft: 0, paddingTop: 15 }}>
                    <div className='pt-3 pb-3 mb-3'>
                      <div className='row'>
                        <div className='col m4-3'>
                          <div className='row'>
                            <div className='col pt-3' />
                          </div>
                        </div>
                        <hr />
                        <div className='col ml-3' style={{ paddingLeft: 0 }}>
                          <div className='container m-0 p-0'>
                            <div className='col' style={{ paddingRight: 0, paddingLeft: 0 }}>
                              <EditCommunicationPreferencesFormWrapped
                                onSubmit={ (values) => onSubmitCommunicationPreference(values) }
                                initialValues={ data.data.form_data.value }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
              ////////////
            ) : null
              }
          { localStorage.getItem('MenuOption') === 'Password reset'
            ? (
              <div className='row'>
                <div className='col pb-5'>
                  <div className='container red-box d-flex flex-column'>
                    <div className='row'>
                      <div
                        className='col p-0 m-3'
                        ref={ (el) => {
                          if (el) {
                            el.style.setProperty('margin-top', '0px', 'important');
                          }
                        } }
                      >
                        { miscMessage && miscMessage !== '' && passwordSubmit ? (
                          <Fragment>
                            <div className='feedback-message' data-cy='info-password-reset'>
                              <div>
                                <div className='mb-2'>
                                  <strong>Password reset link generated</strong>
                                </div>
                                <div className='mb-3'>
                                  { `${ miscMessage.replace(/\n/g, ' ').split('.')[1] }.` }
                                </div>
                              </div>
                            </div>
                            <div className='resend-msg'>
                              <p><strong>Not received the email?</strong></p>
                              <button className='btn btn-primary' type='submit' onClick={ onPasswordSubmitted }>Try again</button>
                            </div>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <div className='blocks'>
                              <div className='row'>
                                <div className='col pt-2' style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
                                  <h3 className='title' style={{ marginTop: 0 }}>Change your password</h3>
                                  <i className='material-icons' style={{ color: '#E83D52', fontSize: '1.8em', position: 'relative', top: '5px' }}>lock</i>
                                </div>
                              </div>
                              <div className='row'>
                                <div className='col'>
                                  <div className='red-line' />
                                </div>
                              </div>
                              <p style={{ marginTop: 10 }}>You can reset your password by following the instruction we send you via email.</p>
                            </div>
                            <div className='text-right'>
                              <button data-cy='action-reset-password' className='btn btn-primary' type='submit' onClick={ onPasswordSubmitted }>
                                Reset password
                              </button>
                            </div>
                          </Fragment>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null
  }
        </div>
      </Account>
    );
  }

  Accounts.propTypes = {
    location: PropTypes.object,
  };

  Accounts.defaultProps = {
    location: {},
  };
  return Accounts;
}
