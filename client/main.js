import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { lightBlue, pink } from '@material-ui/core/colors';
import HotApp from './src/containers/HotApp';
import { AppState, TopicStore } from './src/store';

const initialState = window.__INITIAL_STATE__ || {};

const appState = new AppState(initialState.appState);
const topicStore = new TopicStore(initialState.topicStore);
// import App from './src/containers/App';

const renderMethod = !module.hot ? ReactDOM.hydrate : ReactDOM.render;

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: pink,
    type: 'light',

  },
});

renderMethod(
  <Provider appState={appState} topicStore={topicStore}>
    <Router>
      <MuiThemeProvider theme={theme}>
        <HotApp />
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);
