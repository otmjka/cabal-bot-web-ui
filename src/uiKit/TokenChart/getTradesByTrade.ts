import { TradeRecord } from '../../stores/tradeEventsStore';
import { calculatePrice } from '../../utils/ammPrice';
import { SeriesItem } from './types';

export const getTradesByTrade = ({
  trades,
  baseDecimals,
}: {
  trades: TradeRecord[];
  baseDecimals: number;
}): Array<SeriesItem> => {
  return trades.map((trade) => ({
    timestamp: trade.timestamp,
    price: calculatePrice({ trade, baseDecimals }),
    volume: Number(trade.amountSol),
    type: trade.type,
  }));
};
