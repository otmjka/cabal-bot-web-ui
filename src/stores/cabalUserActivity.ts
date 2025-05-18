import { createStore } from 'solid-js/store';

type CabalUserActivityStore = {
  connected: boolean;
};

const initValue = {
  connected: false,
};

const [cabalUserActivity, setCabalUserActivity] =
  createStore<CabalUserActivityStore>(initValue);

export { cabalUserActivity, setCabalUserActivity };
