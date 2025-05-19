import { TradeRecord } from '../../stores/trades';
import { groupTradesByTimeframe } from './groupTradesByTimeframe';
import { TimeFrames } from './types';

export const getChartData = ({
  trades,
  selectedTimeframe,
  tokenDecimals,
}: {
  trades: TradeRecord[];
  selectedTimeframe: TimeFrames;
  tokenDecimals: number;
}) => {
  const groupedTrades = groupTradesByTimeframe({
    trades,
    timeframe: selectedTimeframe,
    baseDecimals: tokenDecimals,
  });
  console.log(groupedTrades);
  // Sort by timestamp
  groupedTrades.sort((a, b) => a.timestamp - b.timestamp);

  return groupedTrades;
};
