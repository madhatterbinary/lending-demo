import React from 'react';
import './Popup.scss';
import PropTypes from 'prop-types';

const Popup = ({ text, closePopup, disabled, children, btnText }) => (
  <div className='popup'>
    <div className='popup_inner'>
      {text ? <h1>{text}</h1> : null}
      { children }
      <div className={ disabled ? 'read-warning' : 'read-warning hide' }>Please, scroll and read the entire document to close this window.</div>
      <div className='p-2 text-right'>
        <button type='button' data-cy='action-close-document' style={{ width: `${ 130 }px` }} className={ `${ disabled ? 'btn btn-secondary disabled' : 'btn btn-primary' } close-document-button` } onClick={ closePopup } disabled={ disabled }>{ btnText }</button>
      </div>
    </div>
  </div>
);

Popup.propTypes = {
  text: PropTypes.string,
  closePopup: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  btnText: PropTypes.string,
};

Popup.defaultProps = {
  text: '',
  closePopup: () => {},
  disabled: true,
  children: null,
  btnText: '',
};

export default Popup;
