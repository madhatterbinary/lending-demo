import React, { useEffect, useState, Fragment } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import './Opacity.scss';

function Opacity(props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { speed, children } = props;

  return (
    <CSSTransition
      in={ mounted }
      timeout={ speed }
      classNames={ `fade-${ 100 * Math.floor(speed / 100) }` }
      unmountOnExit
    >
      <Fragment>{children}</Fragment>
    </CSSTransition>
  );
}

Opacity.propTypes = {
  children: PropTypes.node,
  speed: PropTypes.number,
};

Opacity.defaultProps = {
  children: null,
  speed: 500,
};

export default Opacity;
