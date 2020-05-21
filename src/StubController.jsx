import React, { useEffect, Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import * as actions from 'js/Store/Actions/application';
import * as actionsGeneric from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import { hot } from 'react-hot-loader';
import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();
const BRAND_NAME = env.REACT_APP_BRAND_NAME;

const StubController = () => {
  const { feStubsOn, beStubsOn } = useSelector(state => ({
    feStubsOn: state.stepData.feStubsOn,
    beStubsOn: state.stepData.beStubsOn,
  }));
  const { toggleBackendStubs, resetSession, disableBackendStubs } = useActions(actions);
  const { toggleFrontendStubs } = useActions(actionsGeneric);
  const [toggleStubsBtn, setToggleStubsBtn] = useState(false);
  const journeyType = localStorage.getItem('journeyType');

  useEffect(() => {
  }, [beStubsOn, feStubsOn]);

  const toggleStubsWindow = () => {
    setToggleStubsBtn(!toggleStubsBtn);
  };

  return (
    <Fragment>
      <button
        type='button'
        data-cy='action-settings'
        className='button secondary-small'
        style={{ position: 'fixed', bottom: 5, right: 5, height: 35, minWidth: 50 }}
        onClick={ toggleStubsWindow }
      >
        <i className='material-icons'>build</i>
      </button>
      {toggleStubsBtn
        ? (
          <div style={{ display: 'block', position: 'fixed', bottom: 45, right: 5, height: 'auto', width: 300, background: 'white', border: '2px dashed red' }}>
            <div style={{ display: 'block', margin: '20px 0' }}>
              <h1 className='title brand-primary' style={{ marginBottom: 30 }}>{BRAND_NAME} - {journeyType}</h1>

              <h2 className='title brand-primary'>Frontend stubs - {feStubsOn ? 'ON' : 'OFF'}</h2>
              <h2 className='title brand-primary' style={{ marginBottom: 30 }}>Backend stubs - {beStubsOn ? 'ON' : 'OFF'}</h2>

              <p className='brand-primary' style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                <span onClick={ resetSession }>Reset session</span>
              </p>
              <p data-cy='action-frontend-stubs' className='brand-primary' style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                {feStubsOn
                  ? (<span onClick={ toggleFrontendStubs }>Disable frontend autofill</span>)
                  : (<span onClick={ toggleFrontendStubs }>Enable frontend autofill</span>)
                }
              </p>
              <p className='brand-primary' style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                <span onClick={ toggleBackendStubs }>Enable backend stubs</span>
              </p>
              <p className='brand-primary' style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                <span onClick={ disableBackendStubs }>Disable backend stubs</span>
              </p>

            </div>
          </div>
        ) : null
        }
    </Fragment>
  );
};

export default hot(module)(StubController);
