import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmailListItem from './EmailListItem';

class EmailList extends Component {
  static propTypes = {
    emails: PropTypes.array,
  }

  static defaultProps = {
    emails: [],
  };

  render() {
    const { emails } = this.props;
    if (!emails) {
      return <span className='is-loading'>Loading...</span>;
    }
    const data = Array.from(emails);
    const emailItems = data.map((email) => {
      return (
        <EmailListItem
          key={ email.subject }
          email={ email }
          pdfUrl={ email.url }
        />
      );
    });

    return (
      <div className='container p-0'>
        {emailItems}
      </div>
    );
  }
}

export default EmailList;
