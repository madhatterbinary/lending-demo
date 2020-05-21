import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BASE_URL } from 'js/Store/Api/axios';

const download = (fileUrl) => {
  // fake server request, getting the file url as response
  setTimeout(() => {
    const response = {
      file: fileUrl,
    };
    // server sent the url to the file!
    // now, let's download:
    window.open(response.file);
    // you could also do:
    // window.location.href = response.file;
  }, 100);
};

class EmailListItem extends Component {
  static propTypes = {
    email: PropTypes.object,
    pdfUrl: PropTypes.string,
  }

  static defaultProps = {
    email: {},
    pdfUrl: '',
  };

  render() {
    const { email, pdfUrl } = this.props;
    return (
      <div className='row mb-3'>
        <div className='col'>
          <strong>{ email.subject }</strong><br />{email.date}
        </div>
        <div className='col text-right'>
          <i className='material-icons text-primary' data-cy='action-open-file' style={{ cursor: 'pointer', fontSize: '1.8em' }} onClick={ () => download(`${ BASE_URL }${ pdfUrl }`) }>open_in_new</i>
        </div>
      </div>
    );
  }
}

export default EmailListItem;
