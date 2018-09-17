import React, { Component } from 'react';
import { observer, inject, propTypes } from 'mobx-react';
// import PropTypes from 'prop-types';
import UserWrap from './userWrap';

@inject(stores => ({
  user: stores.userStore.user,
  login: stores.userStore.login,
})) @observer
class Login extends Component {
  state = {};

  render () {
    return (
      <UserWrap user={this.props.user}>
        <div>
          login
        </div>
      </UserWrap>
    );
  }
}

Login.propTypes = {
  // login: PropTypes.func,
  user: propTypes.observableObject,
};

export default Login;
