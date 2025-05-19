import { createStore } from 'solid-js/store';
import { TokenTradeStats } from '../services/cabal/CabalRpc/cabal_pb';

type TokenTradeStatsStore = {
  tokenTradeStatsList: TokenTradeStats[];
};

const initValue = {
  tokenTradeStatsList: [],
};

const [tokenTradeStatsStore, setTradeStatsStore] =
  createStore<TokenTradeStatsStore>(initValue);

const addTokenTradeStats = (item: TokenTradeStats) => {
  setTradeStatsStore('tokenTradeStatsList', (prev) => [...prev, item]);
};

export { tokenTradeStatsStore, setTradeStatsStore, addTokenTradeStats };
