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
      <div className='email-list-item'>
        <div className='email-body'>
          <h2 className='title email-heading' style={{ fontSize: '1em', height: 'auto' }}>
            <div className='email-header'>{ email.subject }</div>
            <button onClick={ () => download(`${ BASE_URL }${ pdfUrl }`) } style={{ top: 9, minWidth: 120, fontSize: '0.8em', height: 30, marginRight: 30 }} className='button secondary-invert-color' type='button'>
              Open file
            </button>
          </h2>
          <div className='email-date'>
            {email.date}
          </div>
        </div>
      </div>
    );
  }
}

export default EmailListItem;
