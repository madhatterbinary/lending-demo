import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import NavigationItem from './NavigationItem';

const NavigationItems = props => {
  const { menuItems, pathname } = props;
  useEffect(() => {
    if (pathname === '/lending/servicing/manageloan/payment/carddetails'
       || pathname === '/lending/servicing/manageloan/payment/completed'
       || pathname === '/lending/servicing/manageloan/withdrawal/carddetails'
       || pathname === '/lending/servicing/manageloan/withdrawal/completed'
       || pathname === '/lending/servicing/manageloan/earlysettlement/carddetails'
       || pathname === '/lending/servicing/manageloan/earlysettlement/completed') {
      localStorage.setItem('disableManageLoan', 'disabled');
    }
  }, [pathname, localStorage.getItem('disableManageLoan')]);

  if (pathname === '/lending/servicing/manageloan/withdrawal/carddetails') {
    localStorage.setItem('pathnameCloseLoan', pathname);
  }
  if (pathname === '/lending/servicing/manageloan/withdrawal/completed') {
    localStorage.removeItem('pathnameCloseLoan');
  }

  return (
    <ul className={ pathname === '/lending/servicing/manageloan/withdrawal/carddetails' || localStorage.getItem('disableManageLoan') === 'disabled' ? 'topbar-navigation-items disable-manage-loan' : 'topbar-navigation-items' }>
      {menuItems.map((item) => {
        return (
          <Fragment key={ item.link + item.title }>
            {item.customRender ? (
              <NavigationItem link={ item.link }>{ item.customRender() }</NavigationItem>
            ) : (
              <Fragment key={ item.link }>
                <NavigationItem link={ item.link }>
                  {item.title}
                </NavigationItem>
              </Fragment>
            )}
          </Fragment>
        );
      })}
    </ul>
  );
};

NavigationItems.propTypes = {
  menuItems: PropTypes.array.isRequired,
  pathname: PropTypes.string,
};

NavigationItems.defaultProps = {
  pathname: '',
};

export default NavigationItems;
