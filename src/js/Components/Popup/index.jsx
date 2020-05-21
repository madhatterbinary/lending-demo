import React from 'react';
import PropTypes from 'prop-types';
import './Popup.scss';

const Popup = (props) => {
  const { closePopup, header, customRender } = props;
  return (
    <div className='popup'>
      <div className='popup_small'>
        <div style={{ margin: 10, fontSize: '1.5em', cursor: 'pointer', color: '#E83D52', display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }} onClick={ closePopup }><i className='material-icons'>
          close
        </i></div>
        <h1 style={{ textAlign: 'center', marginBottom: 50 }}>{ header }</h1>
        { customRender ? customRender() : null }
      </div>
    </div>
  );
};

Popup.propTypes = {
  header: PropTypes.string,
  closePopup: PropTypes.func,
  customRender: PropTypes.func,
};

Popup.defaultProps = {
  header: '',
  closePopup: null,
  customRender: null,
};

export default Popup;
