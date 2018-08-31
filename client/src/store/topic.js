import { observable, action } from 'mobx';
import { topicSchema } from '../utils/variable-define';
import { get } from '../utils/http';

const createTopic = topic => (Object.assign({}, topicSchema, topic));

class Topic {
  constructor (data) {
    // extendObservable(this, data);
    Object.assign(this, data);
  }

  @observable syncing = false;
}

class TopicStore {
  @observable topics;

  @observable syncing;

  constructor ({ syncing, topics } = { syncing: false, topics: [] }) {
    this.syncing = syncing;
    this.topics = topics.map(topic => new Topic(createTopic(topic)));
  }

  @action addTopic (topic) {
    this.topics.push(new Topic(createTopic(topic)));
  }

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
}

export default TopicStore;
