import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Slider from 'js/Components/Rangeslider';

function HorizontalSlider(props) {
  const {
    defaultValue,
    min,
    max,
    sliderType,
    sliderTitle,
    steps,
    name,
    input,
    meta,
    dataCy,
    extraLabel,
    extraLabelPosition,
    reduxFormChange,
  } = props;

  const [currentValue, setCurrentValue] = useState(defaultValue);


  useEffect(() => {
    setCurrentValue(currentValue);
  }, [setCurrentValue]);

  const handleSliderChange = value => {
    setCurrentValue(Number(value));
    reduxFormChange(value);
  };

  const handleFieldChange = e => {
    let actualValue = e.target.value;

    actualValue = e.target.value > max ? max : e.target.value;

    setCurrentValue(Number(actualValue));
    reduxFormChange(e.target.value);
  };

  const handleFieldBlur = e => {
    let actualValue = e.target.value;

    actualValue = e.target.value < min ? min : e.target.value;
    setCurrentValue(Number(actualValue));
    reduxFormChange(e.target.value);
  };

  return (
    <div className={ `container ${ localStorage.getItem('journeyType') }` }>
      <div className={ `row ${ localStorage.getItem('journeyType') }` }>
        <div className='col pl-0 pr-0'>
          <h1 className='grey-color'>{sliderTitle}</h1>
        </div>
      </div>
      <div className={ `row ${ localStorage.getItem('journeyType') }` }>
        <div className={ `col-9 pl-0 pr-1 ${ localStorage.getItem('journeyType') }` }>
          <div className='container'>
            <div className='row'>
              <div className='col pl-0 pr-0'>
                <Slider
                  min={ min }
                  max={ max }
                  value={ currentValue }
                  sliderTitle={ sliderTitle }
                  onChange={ handleSliderChange }
                  step={ steps }
                  className='slider-bar'
                  dataCy={ dataCy }
                />
              </div>
            </div>
            <div className='row'>
              <div className='col text-left pl-0 pr-0'>
                <span>
                  {sliderType === 'money' ? '£' : null}
                  {min}
                </span>
              </div>
              <div className='col text-right pl-0 pr-0'>
                <span>
                  {sliderType === 'money' ? '£' : null}
                  {max}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={ `col pl-4 pr-0 ${ localStorage.getItem('journeyType') }` }>
          <div className={ `border border-primary pb-2 pt-0 text-center ${ localStorage.getItem('journeyType') }` } style={{ borderRadius: `${ 20 }px` }}>
            <h1 className='pb-1'>{sliderType === 'money' ? extraLabel + currentValue : `${ currentValue } ${ extraLabel }`}</h1>
          </div>
        </div>
      </div>
      <div className='slider-box'>
        <div className='horizontal-slider-input'>
          <input
            { ...input }
            data-cy={ dataCy }
            name={ name }
            value={ currentValue }
            onChange={ handleFieldChange }
            onBlur={ handleFieldBlur }
            type='hidden'
            className={ `value ${ extraLabelPosition }` }
              // step={ steps }
          />
          {meta.error && meta.touched && !meta.active ? (
            <div className='feedback-text error-text'>{meta.error}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

HorizontalSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  steps: PropTypes.number,
  sliderType: PropTypes.string,
  sliderTitle: PropTypes.string,
  extraLabel: PropTypes.string,
  extraLabelPosition: PropTypes.string,
  defaultValue: PropTypes.number,
  reduxFormChange: PropTypes.func,
  name: PropTypes.string,
  input: PropTypes.object,
  dataCy: PropTypes.string,
  meta: PropTypes.object,
};

HorizontalSlider.defaultProps = {
  min: 0,
  max: 100,
  steps: 0,
  sliderType: '',
  sliderTitle: '',
  extraLabel: '',
  extraLabelPosition: '',
  defaultValue: 0,
  reduxFormChange: () => {},
  name: '',
  meta: null,
};

export default HorizontalSlider;
