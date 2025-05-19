import { createStore } from 'solid-js/store';
import {
  PoolKind,
  TradeEvent,
  TradeEventData,
} from '../services/cabal/CabalRpc/cabal_pb';

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
  amountSol: bigint;
  baseLiq: bigint;
  quoteLiq: bigint;
  poolKind: PoolKind;
  timestamp: number;
  type: TradeType;
};

type TradesStore = {
  trades: TradeRecord[];
};

const initValue = {
  trades: [],
};

const [trades, setTrades] = createStore<TradesStore>(initValue);

const addTrade = ({
  tradeEvent,
}: {
  tradeEvent: { value: TradeEventData; type: TradeType };
}) => {
  const data = tradeEvent.value;
  const {
    amountSol, // : bigint;
    baseLiq, // : bigint;
    quoteLiq, // : bigint;
    poolKind, // : PoolKind;
  } = data;

  const timestamp = Math.floor(Date.now() / 1000);
  const newItem = {
    type: tradeEvent.type,
    timestamp,
    amountSol,
    baseLiq,
    quoteLiq,
    poolKind,
  };

  setTrades('trades', (prev) => [...prev, newItem]);
};

export { trades, setTrades, addTrade };
