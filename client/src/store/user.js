import {
  observable,
  action
} from 'mobx';

// import axios from 'axios';
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
}
