import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Spinner from 'js/Components/Spinner';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import { reduxForm } from 'redux-form';
import ContactUsForm from 'js/Components/ServicingForms/ContactUsForm';
import './ContactUs.scss';

//const chatUrl = 'https://livelend.secure.force.com/default/apex/Pre_Chat_Testing_Page?endpoint=https%3A%2F%2F2t17.la1-c1-fra.salesforceliveagent.com%2Fcontent%2Fs%2Fchat%3Flangu'
//  + 'age%3Den_US%23deployment_id%3D5720Y0000008Pzn%26org_id%3D00D0Y000000qO7A%26button_id%3D5730Y0000008QCf%26session_id%3D62c55525-df1f-4521-91e5-7950eb4d5997';

export default function (ContantUs, url) {
  const ContactUsFormWrapped = reduxForm({
    form: 'contact-form',
    enableReinitialize: true,
  })(ContactUsForm);

  function ContactUsHC() {
    const { formData, options, messageSent, pageData } = useSelector(state => {
      if (state.stepData) {
        if (state.stepData.serverData) {
          if (state.stepData.serverData.page_data) {
            if (state.stepData.serverData.page_data.message) {
              return {
                formData: state.stepData.formData,
                pageData: state.stepData.pageData,
                options: state.stepData.options,
                messageSent: state.stepData.serverData.page_data.message,
              };
            }
          }
        }
      }
      return {
        formData: state.stepData.formData,
        pageData: state.stepData.pageData,
        options: state.stepData.options,
      };
    });
    const { loadStepDataPublic, submitStepDataCSRF } = useActions(actions);


    const sendMessageHandler = (values) => {
      submitStepDataCSRF(`/${ url }/getintouch/`, values);
    };

    useEffect(() => {
      loadStepDataPublic(`/${ url }/getintouch/`);
    }, [loadStepDataPublic]);

    const initialValues = {
      ...formData,
    };
    if (document.getElementsByClassName('servicing-header')[0]) {
      document.getElementsByClassName('servicing-header')[0].style.display = 'none';
    }

    if (!initialValues || !pageData || !formData || !options) {
      return <Spinner />;
    }


    return (
      <ContantUs>
        <div className='container mt-4'>
          {/*<div className='row mt-5'>
            <div className='col'>
              <h2 className='title'>Looking for help?</h2>
            </div>
          </div>
          <div className='row mt-2'>
            <div className='col'>
              <h3>We've created this set of questions based on what our customer ask us most, to try and help you find the right answer.
              Alternately, you can see our full list of FAQ by clciking the button below, or you can get in touch </h3>
            </div>
          </div>*/}
          <div
            className='row pt-5'
            ref={ (el) => {
              if (el) {
                el.style.setProperty('padding-top', '0px', 'important');
              }
            } }
          >
            <div className='col'>
              <div className='container red-box p-3 m-0'>
                <div className='row'>
                  <div className='col' style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-5px', height: 30 }}>
                    <h3 className='title' style={{ paddingBottom: 0, marginBottom: 0 }}> Send us a message</h3>
                    <i className='material-icons' style={{ fontSize: '1.8em', color: 'rgb(232, 61, 82)', lineHeight: 'unset', marginRight: 0, position: 'relative', bottom: 5 }}>email</i>
                  </div>
                </div>
                <div className='row' style={{ marginBottom: 10 }}>
                  <div className='col'>
                    <div className='red-line' />
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <p style={{ maxWidth: 500 }}>We&lsquo;ll always come back to you as quickly as possible</p>
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <ContactUsFormWrapped
                      onSubmit={ (values) => sendMessageHandler(values) }
                      initialValues={ initialValues }
                      options={ options }
                    />
                  </div>
                </div>
                { messageSent && messageSent !== '' ? (
                  <div className='row'>
                    <div className='col' data-cy='info-sent-message'>
                      <div><div style={{ marginBottom: 5 }}>{ `${ messageSent.replace(/\n/g, ' ').split('.')[0] }.` }</div><div>{ `${ messageSent.replace(/\n/g, ' ').split('.')[1] }.` }</div></div>
                    </div>
                  </div>
                ) : null }
              </div>
            </div>
          </div>
          {/* <div className='row pt-5'>
            <div className='col'>
              <div className='container p-3 m-0 red-box'>
                <div className='row'>
                  <div className='col' />
                </div>
                <div className='row'>
                  <div className='col' />
                </div>
                <article>
                  <header>
                    <h3><i className='material-icons' style={{ fontSize: `${ 22 }px`, top: `${ -4 }px`, position: 'relative' }}>question_answer</i> Chat with us</h3>
                    <p>Please note, this isn&apos;t a secure channel, so don&apos;t include any personal information in your message to us.</p>
                    <button className='btn btn-primary' style={{ marginTop: 10 }} type='button'>
                      <a target='_blank' rel='noopener noreferrer' style={{ color: 'white', textDecoration: 'none' }} data-cy='action-start-chat' href={ chatUrl }>Start chat</a>
                    </button>
                  </header>
                </article>
              </div>
            </div>
          </div> */}
        </div>
      </ContantUs>
    );
  }
  return ContactUsHC;
}
