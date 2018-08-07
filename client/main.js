import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import HotApp from './src/containers/HotApp';
import AppState from './src/store/app-state';

const initialState = window.__INITIAL_STATE__ || {};
console.log(window.__INITIAL_STATE__);
console.log(window.__INITIAL_STATE__.appState);
const appState = new AppState(initialState.appState);

const renderMethod = !module.hot ? ReactDOM.hydrate : ReactDOM.render;

renderMethod(
  <Provider appState={appState}>
    <Router>
      <HotApp />
    </Router>
  </Provider>,
  document.getElementById('root')
);
