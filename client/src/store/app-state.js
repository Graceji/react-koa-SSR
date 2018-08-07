import {
  observable,
  computed,
  action
} from 'mobx';

class AppState {
  constructor ({ count, name } = { count: 0, name: 'Graceji' }) {
    this.count = count;
    this.name = name;
  }

  @observable count;

  @observable name;

  @computed get msg () {
    return `${this.name} say count is ${this.count}`;
  }

  @action add () {
    this.count += 1;
  }

  toJson () {
    return ({
      count: this.count,
      name: this.name,
    });
  }
}

export default AppState;
