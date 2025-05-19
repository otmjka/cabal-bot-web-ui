import { PoolKind } from './CabalTypes';

export enum TradeType {
  buy = 'buy',
  sell = 'sell',
  deposit = 'deposit',
  withdraw = 'withdraw',
  migrationStart = 'migrationStart',
  migrationEnd = 'migrationEnd',
  burnLiq = 'burnLiq',
  burnMint = 'burnMint',
}

export type TradeRecord = {
  amountSol: bigint;
  baseLiq: bigint;
  quoteLiq: bigint;
  poolKind: PoolKind;
  timestamp: number;
  type: TradeType;
};
