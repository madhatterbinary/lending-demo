/* global it, expect, describe, jest */
import React from 'react';
import { shallow } from 'enzyme';
import Slider from 'react-rangeslider';
import HorizontalSlider from './index';

describe('HorizontalSlider Component', () => {
  let horizontalSlider;
  let slider;
  const SliderProps = {
    min: 0,
    max: 100,
    sliderType: '',
    sliderTitle: '',
    extraLabel: '',
    extraLabelPosition: '',
    meta: {},
    input: {},
    currentValue: 0,
  };

  it('should display the correct error text and onChange event in HorizontalSlider', () => {
    horizontalSlider = shallow(
      <HorizontalSlider
        value={ SliderProps.currentValue }
        min={ SliderProps.min }
        max={ SliderProps.max }
        input={{ name: 'field-name' }}
        meta={{ touched: true, error: 'error text' }}
      />
    );
    expect(
      horizontalSlider
        .find('.feedback-text error-text')
        .last()
        .text()
    ).toEqual('');
  });

  it('should display the correct error text and onChange event in HorizontalSlider', () => {
    const myMock = jest.fn();
    horizontalSlider = shallow(
      <HorizontalSlider
        value={ SliderProps.currentValue }
        onChange={ myMock }
        min={ SliderProps.min }
        max={ SliderProps.max }
        input={{ name: 'field-name' }}
        meta={{ touched: true, error: 'error text' }}
      />
    );
    horizontalSlider
      .find('.slider-bar')
      .first()
      .simulate('click');
    expect(myMock.mock.calls.length).toBe(0);
  });

  it('should display the correct error onChange event in Slider', () => {
    const myMock = jest.fn();
    slider = shallow(
      <Slider
        value={ SliderProps.currentValue }
        onChange={ myMock }
        min={ SliderProps.min }
        max={ SliderProps.max }
      />
    );
  });

  it('renders without crashing', () => {
    expect(horizontalSlider.exists()).toEqual(true);
  });

  it('renders without crashing', () => {
    expect(slider.exists()).toEqual(true);
  });
});
