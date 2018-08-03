import {
  observable,
  computed,
  action
} from 'mobx';

class AppState {
  @observable count = 0;

  @observable name = 'graceji';

  @computed get msg () {
    return `${this.name} say count is ${this.count}`;
  }

  @action add () {
    this.count += 1;
  }
}

export default AppState;
