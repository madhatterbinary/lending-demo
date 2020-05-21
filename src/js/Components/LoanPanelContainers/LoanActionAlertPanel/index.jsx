import React, { Fragment } from 'react';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import PropTypes from 'prop-types';
import './LoanActionAlertPanel.scss';


const LoanActionAlertPanel = (props) => {
  const { loadStepDataPublic } = useActions(actions);
  const { title, titleClassName, buttonText, link, children } = props;

  const startLoanActionHandler = () => {
    loadStepDataPublic(`/lending/overview/${ link }`);
  };
  // info-screen-content
  return (
    <Fragment>
      <div className='info-screen' style={{ marginTop: 30 }}>
        <div className='info-screen-content'>
          <div className='info-header'>
            <h1 className={ titleClassName } style={{ margin: 20 }}>{ title }</h1>
          </div>
          { children }
          <button
            className='btn btn-primary'
            type='submit'
            onClick={ startLoanActionHandler }
            data-cy='action-error-go-back'
            style={{ width: 200, marginBottom: 30, marginTop: 0, marginRight: 0, position: 'relative', alignSelf: 'flex-end' }}
          >{ buttonText }
          </button>
        </div>
      </div>

    </Fragment>
  );
};

LoanActionAlertPanel.propTypes = {
  title: PropTypes.string,
  titleClassName: PropTypes.string,
  buttonText: PropTypes.string,
  link: PropTypes.string,
  children: PropTypes.node,
};

LoanActionAlertPanel.defaultProps = {
  title: '',
  titleClassName: '',
  link: '',
  buttonText: '',
  children: null,
};

export default LoanActionAlertPanel;
