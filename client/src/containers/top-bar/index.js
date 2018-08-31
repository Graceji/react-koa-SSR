import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

class TopBar extends Component {
  constructor (props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin () {
  }

  render () {
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton>
              <HomeIcon />
            </IconButton>
            <Typography>
              Cnode
            </Typography>
            <Button onClick={this.handleLogin}>
              登录
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default TopBar;
