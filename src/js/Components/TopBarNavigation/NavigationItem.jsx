import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './NavigationItem.scss';

const NavigationItem = props => {
  const { link, exact, children } = props;
  return (
    <li data-cy='action-topbar-nav-item' className='topbar-navigation-item'>
      <NavLink to={ link } exact={ exact } activeClassName='active' data-cy={ `action-${ children }` }>
        {children}
        <article>
          <span className='bar'>
            <div className='bar-timeline' />
          </span>
        </article>
      </NavLink>
    </li>
  );
};

NavigationItem.propTypes = {
  link: PropTypes.string,
  exact: PropTypes.bool,
  children: PropTypes.node,
};

NavigationItem.defaultProps = {
  link: '',
  exact: true,
  children: null,
};

export default NavigationItem;
