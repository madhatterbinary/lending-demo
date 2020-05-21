/*eslint-disable no-nested-ternary*/
import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

const TimelineNavigation = ({ timelineItems, localmatch }) => {
  const location = (() => {
    let step = -1;
    let substep = -1;
    timelineItems.forEach((item, idx) => {
      if (step === -1 && substep === -1 && item.steps) {
        substep = item.steps.indexOf(localmatch);
        if (substep >= 0) {
          step = idx;
        }
      }
    });
    return { step, substep };
  })();

  const renderHeader = (header, idx) => {
    if (idx <= location.step) {
      return <div key={ uuid.v4() } className='col text-center text-primary'>{idx < location.step ? <i style={{ fontSize: `${ 1 }rem` }} key={ uuid.v4() } className='mr-4 material-icons text-primary'>check_circle</i> : null}<strong>{header.title}</strong></div>;
    }
    return <div key={ uuid.v4() } className='col text-center'>{header.title}</div>;
  };

  const renderBar = (item, idx) => {
    let width = 0;
    if (idx < location.step) {
      width = 100;
    } else if (idx === location.step) {
      width = ((location.substep + 1) / item.steps.length) * 100;
    }
    return (
      <div key={ uuid.v4() } className='col text-center'>
        <div className='outer-nav-bar'>
          <div className='inner-nav-bar' style={{ width: `${ width }%` }} />
        </div>
      </div>
    );
  };

  return (
    <div className='container mb-5 mt-5'>
      <div className='row'>
        {timelineItems.map((item, idx) => renderHeader(item, idx))}
      </div>
      <div className='row'>
        {timelineItems.map((item, idx) => renderBar(item, idx))}
      </div>
    </div>
  );
};

TimelineNavigation.propTypes = {
  timelineItems: PropTypes.array.isRequired,
  localmatch: PropTypes.string,
};

TimelineNavigation.defaultProps = {
  localmatch: '/',
};

export default TimelineNavigation;
