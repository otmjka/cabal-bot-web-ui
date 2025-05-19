export type { TradeType, TradeRecord } from './TradeEvent';
export type { UserResponse, PoolKind, TradeEventData } from './CabalTypes';

export type FakeConsole = {
  log: () => void;
  info: () => void;
};
