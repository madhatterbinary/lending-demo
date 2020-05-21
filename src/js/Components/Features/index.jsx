import React from 'react';
import PropTypes from 'prop-types';
// TODO: leave in here untill we see if it ever changes
const Features = ({ text1, text2, text3 }) => (
  <div>
    <p className='mp-0 mb-0'>
      {text1}
    </p>
    <p className='mp-0'>
      {text2}
    </p>
    <p className='mp-0'>
      {text3}
    </p>
  </div>
);

Features.propTypes = {
  text1: PropTypes.string,
  text2: PropTypes.string,
  text3: PropTypes.string,
};

Features.defaultProps = {
  text1: '',
  text2: '',
  text3: '',
};

export default Features;
