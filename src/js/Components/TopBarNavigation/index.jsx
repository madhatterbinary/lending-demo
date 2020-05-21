import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ChildrenContainer from 'js/Components/ChildrenContainer';
import useWindowSize from 'js/Components/Hooks/useWindowSize';
import NavigationContainer from './NavigationContainer.jsx';

function TopBarNavigation(props) {
  const size = useWindowSize();
  const [showBottomDrawer, setShowBottomDrawer] = useState(false);
  const { children, menuItems, pathname } = props;
  useEffect(() => {
    if (props.menuItems.length > 1 && size.width <= 1024 && !showBottomDrawer) {
      setShowBottomDrawer(true);
    }
  }, [size, pathname]);

  // eslint-disable-next-line no-unused-vars
  let attachedClasses = ['bottom-drawer', 'bottom-close'];

  if (showBottomDrawer) {
    attachedClasses = ['bottom-drawer', 'bottom-open'];
  }

  return (
    <ChildrenContainer>
      <NavigationContainer
        menuItems={ menuItems }
        pathname={ pathname }
      />
      <main className='layout-container'>{children}</main>
    </ChildrenContainer>
  );
}

TopBarNavigation.propTypes = {
  children: PropTypes.node,
  menuItems: PropTypes.array,
  pathname: PropTypes.string,
};
TopBarNavigation.defaultProps = {
  children: null,
  menuItems: [],
  pathname: '',
};

export default TopBarNavigation;
