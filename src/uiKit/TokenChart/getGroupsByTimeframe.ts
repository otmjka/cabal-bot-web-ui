import { TradeRecord, TradeType } from '../../types';
import { calculatePrice } from '../../utils/ammPrice';
import { getTimeFrameSeconds } from './getTimeFrameSeconds';
import { TimeFrames } from './types';

type Group = {
  buy: bigint;
  sell: bigint;
  price: number;
  volumes: Array<bigint>;
};

export const getGroupsByTimeframe = ({
  trades,
  timeframe,
  baseDecimals,
}: {
  trades: TradeRecord[];
  timeframe: TimeFrames;
  baseDecimals: number;
}) => {
  const grouped: Record<number, Group> = {};
  const timeframeSeconds = getTimeFrameSeconds(timeframe);

  trades.forEach((trade) => {
    const timeGroup =
      Math.floor(trade.timestamp / timeframeSeconds) * timeframeSeconds;
    if (!grouped[timeGroup]) {
      grouped[timeGroup] = {
        buy: 0n,
        sell: 0n,
        price: 0,
        volumes: [],
      };
    }

    if (trade.type === TradeType.buy) {
      grouped[timeGroup].buy += trade.amountSol;
    } else {
      grouped[timeGroup].sell += trade.amountSol;
    }

    // Use the last price in the timeframe as the representative price
    grouped[timeGroup].price = calculatePrice({ trade, baseDecimals });
    grouped[timeGroup].volumes.push(trade.amountSol);
  });

  return Object.entries(grouped).map(([timestamp, data]) => ({
    timestamp: parseInt(timestamp),
    price: data.price,
    buyVolume: data.buy,
    sellVolume: data.sell,
    totalVolume: data.buy + data.sell,
    volumes: data.volumes,
    type: data.buy > data.sell ? TradeType.buy : TradeType.sell,
  }));
};
