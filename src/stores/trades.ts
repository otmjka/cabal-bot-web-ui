import { createStore } from 'solid-js/store';
import { TradeEventData } from '../services/cabal/CabalRpc/cabal_pb';

type TradeType =
  | 'buy'
  | 'sell'
  | 'deposit'
  | 'withdraw'
  | 'migrationStart'
  | 'migrationEnd'
  | 'burnLiq'
  | 'burnMint';

export type TradeRecord = {
  data: TradeEventData;
  type: TradeType;
};

type TradesStore = {
  trades: TradeRecord[];
};

const initValue = {
  trades: [],
};

const [trades, setTrades] = createStore<TradesStore>(initValue);

const addTrade = (item: TradeRecord) => {
  setTrades('trades', (prev) => [...prev, item]);
};

export { trades, setTrades, addTrade };
