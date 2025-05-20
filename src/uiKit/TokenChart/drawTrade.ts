import { format, fromUnixTime } from 'date-fns';
import { getColor } from './getColor';
import { getSize } from './getSize';
import { SeriesItem, TimeFrames } from './types';

export const drawTrade = ({
  trade,
  ctx,
  u,
  tf,
}: {
  trade: SeriesItem;
  ctx: CanvasRenderingContext2D;
  u: uPlot;
  tf: TimeFrames;
}) => {
  const x = u.valToPos(trade.timestamp, 'x', true);
  const y = u.valToPos(trade.price, 'y', true);

  let totalVolume = 0;
  if (trade.volumes) {
    for (let singleVolume of trade.volumes) {
      totalVolume += singleVolume;
    }
  }
  const size = getSize({
    selectedTimeframe: tf,
    volume: trade.volume || totalVolume,
    totalVolume: Number(trade.totalVolume),
  });

  // Color based on trade type
  const { color, borderColor } = getColor(trade);
  const date = fromUnixTime(trade.timestamp);

  const customFormat = format(date, 'HH:mm:ss');
  console.log(trade.timestamp, trade.price, customFormat, x, y, size);

  ctx.beginPath();
  ctx.arc(x, y, size, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 1;
  ctx.stroke();
};
