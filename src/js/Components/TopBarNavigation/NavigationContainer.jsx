import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import YobotaLogo from '../../assets/images/yobotalogo_mobile.png';

const NavigationContainer = props => {
  const { menuItems, pathname } = props;
  const [disableManageLoan, setDisableManageLoan] = useState('');
  const [disableMenu, setDisableMenu] = useState('false');
  const [newLoan, setNewLoan] = useState('false');

  useEffect(() => {
    setDisableManageLoan(localStorage.getItem('disableManageLoan'));
    setNewLoan(localStorage.getItem('createNewLoan'));
    if (pathname === '/lending/servicing/manageloan/withdrawal/completed'
      || pathname === '/lending/servicing/manageloan/earlysettlement/completed') {
      localStorage.setItem('disableMenu', 'false');
      setDisableMenu(localStorage.getItem('disableMenu'));
    }
    if (pathname === '/lending/servicing/manageloan/withdrawal/carddetails'
        || pathname === '/lending/account/management/withdrawal/payment/') {
      localStorage.setItem('disableMenu', 'true');
      setDisableMenu(localStorage.getItem('disableMenu'));
    }
  }, [pathname, disableManageLoan, localStorage.getItem('disableManageLoan'), localStorage.getItem('disableMenu'), disableMenu, newLoan]);

  return (
    <div className='bg-light-gray pb-2 pt-2'>
      <div id='main-menu' className={ disableMenu === 'true' ? 'container disableMenu' : 'container enableMenu' }>
        <div className={ disableManageLoan === 'disabled' || newLoan === 'true' ? 'row disable-manage-loan' : 'row enable-manage-loan' } id='nav-items'>
          <div key={ uuid.v4() } className='col' style={{ paddingTop: 5 }}>
            <img src={ YobotaLogo } alt='yobota logo' height='35px' />
          </div>
          {menuItems.map((item) => (item.customRender ? <div key={ uuid.v4() } className='col d-flex align-items-center'>{item.customRender()}</div> : <div key={ uuid.v4() } className='col d-flex align-items-center'><a className='nav-link' data-cy={ `action-${ item.title }` } href={ item.link }>{item.title}</a></div>))}
        </div>
      </div>
    </div>
  );
};

NavigationContainer.propTypes = {
  menuItems: PropTypes.array,
  pathname: PropTypes.string,
};
NavigationContainer.defaultProps = {
  menuItems: [],
  pathname: '',
};

export default NavigationContainer;
