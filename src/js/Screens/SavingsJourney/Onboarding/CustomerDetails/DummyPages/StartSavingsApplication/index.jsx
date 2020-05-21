import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormHOC from 'js/Store/hoc/FormContainer';
import Form from './StartSavingsApplicationForm';
import './StartSavingsApplication.scss';

class StartSavingsApplication extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  };

  render() {
    const { children } = this.props;

    return (
      <div className='start-savings-application'>
        <div className='start-savings-banner d-flex align-items-center'>
          <div className='container' style={{ paddingLeft: 0 }}>
            <div className='ml-4 pl-5 pt-4 pb-4 savings-title-container'>
              <div className='savings-title'>Watch your savings grow</div>
              <div className='savings-sub-title'>with a fixed term, fixed rate savings account.</div>
            </div>
          </div>
        </div>
        <div
          className='primary-color-stripe row'
          style={{ width: '100%', backgroundColor: '#EFEFEF', height: 236, display: 'flex', flexDirection: 'column' }}
          ref={ (el) => {
            if (el) {
              el.style.setProperty('margin', '0px', 'important');
              el.style.setProperty('padding', '0px', 'important');
            }
          } }
        >
          <div
            className='container bg-light-gray pl-5 pt-4 pb-4 pr-5 mt-5 mb-5'
            style={{ alignSelf: 'center' }}
            ref={ (el) => {
              if (el) {
                el.style.setProperty('margin', '0px', 'important');
                el.style.setProperty('padding-left', '0px', 'important');
              }
            } }
          >
            <div className='row pb-2' style={{ marginLeft: 0 }}>
              <div className='col pb-4'>
                <h1>1 Year Fixed Rate Saver. Save up to £85,000</h1>
              </div>
            </div>
            <div className='row pb-3' style={{ marginLeft: 0 }}>
              <div className='col-4'>
                <div className='pb-3'>Fixed termmm</div>
                <div><h2>1 year</h2></div>
              </div>
              <div className='col-3'>
                <div className='pb-3'>AER*</div>
                <div><h2>2%</h2></div>
              </div>
              <div className='col-5'>
                <div className='pb-3'>Save between</div>
                <div><h2>£1,000 - £85,000</h2></div>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          { children }
        </div>
      </div>
    );
  }
}

export default FormHOC(StartSavingsApplication, Form, '/saving/getsaving.json');
