import AppState from './app-state';

export default {
  AppState,
};

export const createStoreMap = () => ({
  appState: new AppState(),
});
