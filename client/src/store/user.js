import {
  observable,
  action
} from 'mobx';

import { post } from '../utils/http';

export default class User {
  @observable user = {
    isLogin: false,
    info: {},
  };

  @action.bound async login (accesstoken) {
    await post('http://localhost:3333/api/user/login', {}, {
      accesstoken,
    })
      .then((res) => {
        console.log(res);
      });
  }

  toJson () {
    return ({
      user: this.user,
    });
  }
}
