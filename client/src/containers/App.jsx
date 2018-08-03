import React, { Component } from 'react';
import Routes from '../router';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <React.Fragment>
        <div>
          服务端渲染dem0
        </div>
        <Routes />
      </React.Fragment>
    );
  }
}

export default App;
