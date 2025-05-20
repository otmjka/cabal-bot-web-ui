import { TradeRecord } from '../../types';
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
    timestamp: Math.floor(trade.timestamp / 1000),
    price: calculatePrice({ trade, baseDecimals }),
    volume: Number(trade.amountSol),
    type: trade.type,
  }));
};
