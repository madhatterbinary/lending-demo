import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
// Web Fonts for icons
import WebFontLoader from 'webfontloader';

// App
import App from 'App';

// Redux
import configureStore, { history } from 'js/configureStore';
import { Provider } from 'react-redux';
import rootReducer from 'js/Store/Reducers';
import { ConnectedRouter } from 'connected-react-router';
// CSS import
import 'scss/index.scss';


WebFontLoader.load({
  google: {
    families: ['Material Icons', 'Comic Sans MS'],
  },
  custom: {
    families: ['FontAwesome'],
    urls: ['https://use.fontawesome.com/releases/v5.0.4/css/all.css'],
  },
});

// Creating store + apply middleware
const store = configureStore(rootReducer, history);

// Render it to DOM
const rootEl = document.getElementById('root');
//
ReactDOM.render(
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <Route path='/' component={ App } />
    </ConnectedRouter>
  </Provider>,
  rootEl
);
