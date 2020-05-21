/* global it, expect, describe */
import React from 'react';
import { shallow } from 'enzyme';
import TextField from './TextField';

describe('Input TextField Component', () => {
  let component;

  it('renders without crashing', () => {
    component = shallow(
      <TextField
        input={{ name: 'field-name' }}
        meta={{ touched: true, error: 'error text', warning: 'warning text' }}
      />
    );
    expect(component.exists()).toEqual(true);
  });
  it('should display the correct label as provided by a prop', () => {
    component = shallow(
      <TextField
        input={{ name: 'field-name' }}
        label='label'
        meta={{ touched: true }}
      />
    );
    expect(
      component
        .find('.form-field-label')
        .last()
        .text()
    ).toEqual('label');
  });

  it('should display error text when meta.error is provided as prop', () => {
    component = shallow(
      <TextField
        input={{ name: 'field-name' }}
        label='label'
        meta={{ touched: true, error: 'error text', warning: 'warning text' }}
      />
    );
    expect(component.find('.input-error').exists()).toEqual(true);
  });
  it('should display the corerct error text when meta.error is provided as prop', () => {
    component = shallow(
      <TextField
        input={{ name: 'field-name' }}
        label='label'
        meta={{ touched: true, error: 'error text', warning: 'warning text' }}
      />
    );
    expect(
      component
        .find('.input-error')
        .last()
        .text()
    ).toEqual(' error text');
  });
  it('should prioritize the error text when both error and warning are provided', () => {
    component = shallow(
      <TextField
        input={{ name: 'field-name' }}
        label='label'
        meta={{ touched: true, error: 'error text', warning: 'warning text' }}
      />
    );
    expect(component.find('.input-error').exists()).toEqual(true);
    expect(component.find('.input-warning').exists()).toEqual(false);
  });

  it('should display warning text when meta.warning is provided as prop', () => {
    component = shallow(
      <TextField
        input={{ name: 'field-name' }}
        label='label'
        meta={{ touched: true, warning: 'warning text' }}
      />
    );
    expect(component.find('.input-warning').exists()).toEqual(true);
    expect(component.find('.input-error').exists()).toEqual(false);
  });
  it('should display the corerct warning text when meta.warning is provided as prop', () => {
    component = shallow(
      <TextField
        input={{ name: 'field-name' }}
        label='label'
        meta={{ touched: true, warning: 'warning text' }}
      />
    );
    expect(
      component
        .find('.input-warning')
        .last()
        .text()
    ).toEqual(' warning text');
  });
});
