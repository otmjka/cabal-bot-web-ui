import { TradeType } from '../../stores/trades';

export enum TimeFrames {
  single = 'single',
  s1 = '1s',
  s15 = '15s',
  s30 = '30s',
}

export type SeriesItem = {
  timestamp: number;
  price: number;
  volume?: number;
  type: TradeType;
  totalVolume?: bigint;
};
