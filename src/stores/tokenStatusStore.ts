import { createStore } from 'solid-js/store';
import { TokenStatus } from '../services/cabal/CabalRpc/cabal_pb';

type TradesStore = {
  tokenStatusList: TokenStatus[];
};

const initValue = {
  tokenStatusList: [],
};

const [tokenStatusStore, setTokenStatusStore] =
  createStore<TradesStore>(initValue);

const addTokenStatus = (item: TokenStatus) => {
  setTokenStatusStore('tokenStatusList', (prev) => [...prev, item]);
};

export { tokenStatusStore, setTokenStatusStore, addTokenStatus };
