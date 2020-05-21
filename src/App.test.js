/* global it, expect, describe */
import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore, { history } from 'js/configureStore.js';
import rootReducer from 'js/Store/Reducers';
import App from './App.jsx';

describe('Application Main Component', () => {
  it('App renders without crashing', () => {
    const store = configureStore(rootReducer, history);
    const component = shallow(<Provider store={ store }><App /></Provider>);
    expect(component.exists()).toEqual(true);
  });
});
