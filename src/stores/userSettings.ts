import { createStore } from 'solid-js/store';

type UserSettingsStore = {
  apiKey?: string;
};

const initValue = {
  apiKey: undefined,
};

const [userSettings, setUserSettings] =
  createStore<UserSettingsStore>(initValue);

export { userSettings, setUserSettings };
