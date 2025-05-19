import { createStore } from 'solid-js/store';

type CabalTradeStreamStore = {
  connected: boolean;
  pong: { count: bigint } | undefined;
};

const initValue = {
  connected: false,
  pong: undefined,
};

const [cabalTradeStream, setCabalTradeStream] =
  createStore<CabalTradeStreamStore>(initValue);

export { cabalTradeStream, setCabalTradeStream };
