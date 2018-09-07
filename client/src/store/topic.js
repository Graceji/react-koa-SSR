import {
  observable,
  action,
  extendObservable,
  computed
} from 'mobx';
import { topicSchema } from '../utils/variable-define';
import { get } from '../utils/http';

const createTopic = topic => (Object.assign({}, topicSchema, topic));

class Topic {
  constructor (data) {
    extendObservable(this, data);
    // Object.assign(this, data);
  }

  @observable syncing = false;
}

class TopicStore {
  @observable topics;
  @observable syncing;
  @observable details;

  constructor ({ syncing = false, topics = [], details = [] } = {}) {
    this.syncing = syncing;
    this.topics = topics.map(topic => new Topic(createTopic(topic)));
    this.details = details.map(detail => new Topic(createTopic(detail)));
  }

  @computed get detailMap () {
    return this.details.reduce((result, detail) => {
      result[detail.id] = detail;
      return result;
    }, {});
  }

  @action addTopic (topic) {
    this.topics.push(new Topic(createTopic(topic)));
  }

  // 获取话题列表
  @action.bound fetchTopics (tab) {
    return new Promise((resolve, reject) => {
      this.syncing = true;
      get('/topics', {
        mdrender: false,
        tab,
      })
        .then((data) => {
          if (data.success) {
            this.topics = [];
            data.data.forEach(item => this.addTopic(item));
            resolve();
          } else {
            reject();
          }
          this.syncing = false;
        })
        .catch((error) => {
          reject(error);
          this.syncing = false;
        });
    });
  }

  @action.bound async fetchTopicDetail (id) {
    this.syncing = true;
    // 将details定义为数组是使用了本地缓存？？
    // 如果已经有数据就不再请求
    if (this.detailMap[id]) {
      this.syncing = false;
      return this.detailMap[id];
    }

    await get(`/topic/${id}`, {
      mdrender: false,
    })
      .then((res) => {
        if (res.success) {
          this.details.push(new Topic(createTopic(res.data)));
        }
        this.syncing = false;
      })
      .catch((error) => {
        console.log(error);
        this.syncing = false;
      });
  }
}

export default TopicStore;
