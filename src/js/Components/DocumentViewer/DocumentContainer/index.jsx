import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PopupDocs from 'js/Components/DocumentViewer/DocumentsPopup';
import './DocumentContainer.scss';


function DocumentContainer(props) {
  const { onLoadAction, subTitle, copy, btnText, url, documentText, dataCy, textBtn } = props;

  const [showPopup, setShowPopup] = useState(false);

  const [btnDisabled, setBtnDisabled] = useState(true);

  const onIframeLoadHandler = () => {
    onLoadAction();
    // const cssLink = document.createElement('link');
    // const doc = document.getElementById('docs').contentWindow.document;
    // const iframe = document.getElementById('docs').contentWindow;
    // cssLink.href = '/assets/css/style.css';
    // cssLink.rel = 'stylesheet';
    // cssLink.type = 'text/css';
    // doc.body.appendChild(cssLink);
    // iframe.onscroll = () => {
    //   const iframeDocHeight = document.getElementById('docs').contentWindow.document.getElementsByTagName('body')[0].scrollHeight;
    //   const newHeight = iframeDocHeight - 892;
    //   if (newHeight < iframe.frames.scrollY) {
    //     this.setState({ btnDisabled: false });
    //   }
    // };
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const openPopupHandler = () => {
    setShowPopup(true);
    setBtnDisabled(false);
  };

  return (
    <div className='documents-container' data-cy={ `container-${ dataCy }` }>
      { showPopup
        && (
          <PopupDocs
            text={ documentText }
            closePopup={ closePopup }
            disabled={ btnDisabled && false }
            btnText='close'
          >
            <iframe id='docs' title='documents' src={ url } frameBorder='0' onLoad={ onIframeLoadHandler } />
          </PopupDocs>
        )
        }
      <article className='header-content'>
        {subTitle !== '' && (
          <div className='mb-2'>
            <strong>{ subTitle }</strong>
          </div>
        )}
        {copy !== '' && (
          <div className='mb-4'>
            { copy }
          </div>
        )}
        { btnText !== '' && textBtn
          ? (
            <>
              <span>I have read and accepted the terms of your&nbsp;</span><span style={{ color: '#E83D52', cursor: 'pointer' }} onClick={ openPopupHandler }>{ btnText }</span>
            </>
          )
          : (
            <button
              className='btn btn-outline-primary mb-4'
              type='button'
              style={{ marginBottom: 10, marginRight: 0 }}
              onClick={ openPopupHandler }
              data-cy='action-open-document'
            >
              { btnText }
            </button>
          )
          }
      </article>
    </div>
  );
}

DocumentContainer.propTypes = {
  subTitle: PropTypes.string,
  copy: PropTypes.string,
  btnText: PropTypes.string,
  url: PropTypes.string,
  documentText: PropTypes.string,
  onLoadAction: PropTypes.func,
  dataCy: PropTypes.string,
  textBtn: PropTypes.bool,
};

DocumentContainer.defaultProps = {
  subTitle: '',
  copy: '',
  btnText: '',
  url: '',
  documentText: '',
  onLoadAction: () => {},
  textBtn: false,
};

export default DocumentContainer;
