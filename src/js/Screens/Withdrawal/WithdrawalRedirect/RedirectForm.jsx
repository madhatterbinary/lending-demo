import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Spinner from 'js/Components/Spinner';

/*
  Redirect for security verification form
  This form is a standard HTMl form that triggers a browser redirect (outside of the app)

  Information required from GET:
    data.page_data.post_url
    data.page_data.redirect_payload.PaReq
    data.page_data.redirect_payload.TermUrl
    data.page_data.redirect_payload.MD
  Information submitted via POST:
    MD
    PaReq
    TermUrl
  IMPORTANT NOTE:
    This is an off-pattern POST request, all the above values need to be submitted to data.page_data.post_url via regular HTTP post (not async)
*/

class RedirectForm extends PureComponent {
  static propTypes = {
    pageData: PropTypes.object,
  }

  static defaultProps = {
    pageData: {},
  }

  state = {
    exisitingPostUrl: '',
    exisitngPaReq: '',
    exisitingTermUrl: '',
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.pageData.post_url !== prevState.exisitingPostUrl
      && nextProps.pageData.redirect_payload
      && nextProps.pageData.redirect_payload.PaReq !== prevState.exisitngPaReq
      && nextProps.pageData.redirect_payload.TermUrl !== prevState.exisitingTermUrl
    ) {
      setTimeout(() => {
        // Form needs to be posted externally to the payment processor in order to perform security checks
        // This will redirect the user off site and load the security steps as provided by the payment provider
        // Redux form does not support external form submissions with redirect, so we are manually submitting the form through the browser
        // We also add a small delay toi prevent the screen from flashing before submit
        document.getElementById('redirectWorldpayForm').submit();
      }, 1000);
    }
  }

  render() {
    const { pageData } = this.props;

    if (!pageData.post_url) return null;

    return (
      <div className='form-container'>
        <Spinner />;
        <form id='redirectWorldpayForm' action={ pageData.post_url } method='POST' style={{ display: 'none' }}>
          <input type='hidden' value={ pageData.redirect_payload.MD } name='MD' />
          <input type='hidden' value={ pageData.redirect_payload.PaReq } name='PaReq' />
          <input type='hidden' value={ pageData.redirect_payload.TermUrl } name='TermUrl' />
          <input type='submit' value='send' />
        </form>
      </div>
    );
  }
}

export default RedirectForm;
