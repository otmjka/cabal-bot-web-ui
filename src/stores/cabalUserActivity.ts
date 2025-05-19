import { createStore } from 'solid-js/store';

type CabalUserActivityStore = {
  connected: boolean;
  pong: { count: bigint } | undefined;
};

const initValue = {
  connected: false,
  pong: undefined,
};

const [cabalUserActivity, setCabalUserActivity] =
  createStore<CabalUserActivityStore>(initValue);

export { cabalUserActivity, setCabalUserActivity };
