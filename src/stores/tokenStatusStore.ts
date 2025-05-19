import { createStore } from 'solid-js/store';
import { TokenStatus } from '../services/cabal/CabalRpc/cabal_pb';

type TradesStore = {
  tokenStatus: TokenStatus | undefined;
};

const initValue = {
  tokenStatus: undefined,
};

const [tokenStatusStore, setTokenStatusStore] =
  createStore<TradesStore>(initValue);

export { tokenStatusStore, setTokenStatusStore };
