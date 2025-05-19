import { SeriesItem } from './types';

export const getColor = (trade: SeriesItem) => {
  const color =
    trade.type === 'buy' ? 'rgba(16, 185, 129, 0.7)' : 'rgba(239, 68, 68, 0.7)';
  const borderColor =
    trade.type === 'buy' ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)';
  return { color, borderColor };
};
