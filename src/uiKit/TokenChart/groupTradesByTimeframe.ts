import { TradeRecord } from '../../types';
import { getGroupsByTimeframe } from './getGroupsByTimeframe';
import { getTradesByTrade } from './getTradesByTrade';
import { SeriesItem, TimeFrames } from './types';

export const groupTradesByTimeframe = ({
  trades,
  timeframe,
  baseDecimals,
}: {
  trades: TradeRecord[];
  timeframe: TimeFrames;
  baseDecimals: number;
}): Array<SeriesItem> => {
  if (timeframe === TimeFrames.single) {
    return getTradesByTrade({ trades, baseDecimals });
  }

  return getGroupsByTimeframe({
    trades,
    timeframe,
    baseDecimals,
  });
};
