import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TopBarNavigationItem from './TopBarNavigationItem';
import './TopBarNavigationItems.scss';

const TopBarNavigationItems = props => {
  const { timelineItems } = props;
  return (
    <ul className={ (timelineItems[0] || {}).customRender ? 'topbar-navigation-items nomenu' : 'topbar-navigation-items' }>
      {timelineItems.map((item) => (
        <Fragment key={ item.link + item.title }>
          {item.customRender ? (
            <TopBarNavigationItem link={ item.link }>{ item.customRender() }</TopBarNavigationItem>
          ) : (
            <Fragment key={ item.link + item.title }>
              <TopBarNavigationItem link={ item.link }>
                {item.title}
              </TopBarNavigationItem>
            </Fragment>
          )}
        </Fragment>
      ))}
    </ul>
  );
};

TopBarNavigationItems.propTypes = {
  timelineItems: PropTypes.array.isRequired,
};

export default TopBarNavigationItems;
