import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import topBarStyles from './style';

@withStyles(topBarStyles) @withRouter
class TopBar extends Component {
  constructor (props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin () {
    // 登录跳转
    this.props.history.replace('/login');
  }

  render () {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton>
              <HomeIcon />
            </IconButton>
            <Typography variant="title" className={classes.flex}>
              Cnode
            </Typography>
            <Button onClick={this.handleLogin} className={classes.button}>
              登录
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

TopBar.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
};

export default TopBar;
