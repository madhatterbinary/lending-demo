import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
// import './Inbox.scss';
import EmailList from 'js/Store/hoc/Inboxes/EmailList';

export default function (Inbox, url) {
  function InboxHC() {
    const { emails } = useSelector(state => ({
      emails: state.stepData.pageData.messages,
    }));

    const { loadStepDataPublic } = useActions(actions);

    useEffect(() => {
      loadStepDataPublic(`/${ url }/messages/`);
    }, []);
    if (document.getElementsByClassName('servicing-header')[0]) {
      document.getElementsByClassName('servicing-header')[0].style.display = 'block';
    }

    return (
      <Inbox>
        <div
          className='row mb-5'
          ref={ (el) => {
            if (el) {
              el.style.setProperty('padding-top', '5px', 'important');
            }
          } }
        >
          <div className='col'>
            <div className='container red-box d-flex flex-column' style={{ height: '100%', paddingLeft: 20, maxWidth: 754 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3
                  className='title'
                  ref={ (el) => {
                    if (el) {
                      el.style.setProperty('margin-top', '10px');
                      el.style.setProperty('padding-bottom', '0px', 'important');
                    }
                  } }
                >Documents and Info</h3>
                <i className='material-icons' style={{ fontSize: '1.8em', color: 'rgb(232, 61, 82)', lineHeight: 'unset', marginRight: 0, position: 'relative', bottom: 0, marginTop: 6 }}>email</i>
              </div>
              <div className='row' style={{ marginBottom: 20 }}>
                <div className='col'>
                  <div className='red-line' />
                </div>
              </div>
              <EmailList emails={ emails } />
            </div>
          </div>
        </div>
      </Inbox>
    );
  }
  return InboxHC;
}
