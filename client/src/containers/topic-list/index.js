import React, { Component } from 'react';
import axios from 'axios';
import { observer, inject, propTypes } from 'mobx-react';
import { Helmet } from 'react-helmet';
import Button from '@material-ui/core/Button';

@inject('appState') @observer
export default class TopicList extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  bootstrap () {
    // 做数据的初始化
    return new Promise((resolve) => {
      this.props.appState.count = 4;
      resolve(true);
    });
  }

  handleClick1 () {
    axios.get('http://localhost:3333/api/v1/topics')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleClick2 () {
    axios({
      url: 'http://localhost:3333/api/user/login',
      method: 'post',
      data: {
        accessToken: 'db7fda3e-2589-4cba-a2c0-218681b665f6',
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleClick3 () {
    axios({
      url: 'http://localhost:3333/api/v1/message/mark_all',
      method: 'post',
      withCredentials: true,
      params: {
        needAccessToken: true,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render () {
    return (
      <div>
        <Helmet>
          <title>
            This is Topic List
          </title>
          <meta name="decription" content="This is Description" />
        </Helmet>
        topic-detail
        <button onClick={() => this.handleClick1()} type="button">
          请求topics
        </button>
        <br />
        <button onClick={() => this.handleClick2()} type="button">
          登录
        </button>
        <br />
        <button onClick={() => this.handleClick3()} type="button">
          mark All
        </button>
        <br />
        <span>
          {this.props.appState.msg}
        </span>
        <Button variant="raised" color="primary">
          Primary
        </Button>
      </div>
    );
  }
}

TopicList.propTypes = {
  appState: propTypes.objectOrObservableObject,
};
