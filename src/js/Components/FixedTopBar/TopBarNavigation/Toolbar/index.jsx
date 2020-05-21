import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import YobotaLogo from '../../../../assets/images/yobotalogo.png';
import TopBarNavigationItems from '../TopBarNavigationItems';

import './Toolbar.scss';

const Toolbar = props => {
  const { drawerToggleClicked, timelineItems, emailNum } = props;
  return (
    <div className='toolbar'>
      <header className='toolbar-container'>
        <div className='toolbar-logo' style={{ bottom: 3, position: 'relative' }}>
          <div className='logo-container'>
            <img src={ YobotaLogo } alt='yobota logo' height='27px' />
          </div>
        </div>
        {timelineItems.length
          ? (
            <Fragment>
              <div className={ timelineItems[0].customRender ? 'drawer-toggle-container' : 'drawer-toggle-container nomenu' } onClick={ drawerToggleClicked }>
                <div />
                <div />
                <div />
              </div>
              <nav className={ timelineItems[0].customRender ? 'desktop-only' : 'desktop-only nomenu' }>
                <TopBarNavigationItems
                  emailNum={ emailNum }
                  timelineItems={ timelineItems }
                />
              </nav>
            </Fragment>
          ) : null
          }

      </header>
    </div>
  );
};

Toolbar.propTypes = {
  drawerToggleClicked: PropTypes.func,
  emailNum: PropTypes.number,
  timelineItems: PropTypes.array,
};
Toolbar.defaultProps = {
  timelineItems: [],
  drawerToggleClicked: () => {},
  emailNum: 0,
};

export default Toolbar;
