import AppState from './app-state';
import TopicStore from './topic';
import UserStore from './user';

export {
  AppState,
  TopicStore,
  UserStore
};

export const createStoreMap = () => ({
  appState: new AppState(),
  topicStore: new TopicStore(),
  userStore: new UserStore(),
});
