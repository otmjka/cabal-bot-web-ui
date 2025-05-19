import { createStore } from 'solid-js/store';
import { TokenTradeStats } from '../services/cabal/CabalRpc/cabal_pb';

type TokenTradeStatsStore = {
  tokenTradeStats: TokenTradeStats | undefined;
};

const initValue = {
  tokenTradeStats: undefined,
};

const [tokenTradeStatsStore, setTradeStatsStore] =
  createStore<TokenTradeStatsStore>(initValue);

const addTokenTradeStats = (item: TokenTradeStats) => {
  setTradeStatsStore('tokenTradeStats', item);
};

export { tokenTradeStatsStore, setTradeStatsStore, addTokenTradeStats };
