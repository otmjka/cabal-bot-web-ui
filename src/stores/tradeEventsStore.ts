import { createStore } from 'solid-js/store';

import { TradeRecord, TradeEventData, TradeType } from '../types';

type TradesStore = {
  trades: TradeRecord[];
};

const initValue = {
  trades: [],
};

const [tradeEventsStore, setTradeEventsStore] =
  createStore<TradesStore>(initValue);

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

  const timestamp = Date.now();
  const newItem = {
    type: tradeEvent.type,
    timestamp,
    amountSol,
    baseLiq,
    quoteLiq,
    poolKind,
  };

  setTradeEventsStore('trades', (prev) => [...prev, newItem]);
};

export { tradeEventsStore, setTradeEventsStore, addTrade };
