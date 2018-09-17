import { hot } from 'react-hot-loader'; // eslint-disable-line
import React, { Component } from 'react';
import App from './App';

// Remove the server-side injected CSS.
const deleteServerCss = (TheApp) => {
  class Main extends Component {
    componentDidMount () {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render () {
      return <TheApp />;
    }
  }
  return Main;
};

export default hot(module)(deleteServerCss(App));
