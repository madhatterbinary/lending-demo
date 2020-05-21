import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TextBox(props) {
  const [visible, setVisible] = useState(false);
  const { summaryText, children, dataCy } = props;

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const renderContent = () => {
    if (visible) {
      return (
        <div className='row'>
          <div className='col p-0 m-0 pt-3'>
            {children}
          </div>
        </div>
      );
    }
    return <div />;
  };

  return (
    <div className='container pt-3'>
      <div className='row'>
        <div className='col p-0 m-0'>
          <div style={{ cursor: 'pointer' }} data-cy={ dataCy } onClick={ () => toggleVisible() }>
            <p>{summaryText}<i className='material-icons ml-2'>{ visible ? 'expand_less' : 'expand_more' }</i></p>
          </div>
        </div>
      </div>
      {renderContent()}
    </div>
  );
}

TextBox.propTypes = {
  summaryText: PropTypes.string,
  children: PropTypes.node.isRequired,
  dataCy: PropTypes.string,
};

TextBox.defaultProps = {
  summaryText: '',
  children: null,
};

export default TextBox;
