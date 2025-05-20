import uPlot from 'uplot';
import { SeriesItem, TimeFrames } from './types';
import { drawOrderLine } from './drawOrderLine';
import { drawTrade } from './drawTrade';

export const getChartInstance = ({
  tokenDecimals,
  width,
  range,
  data,
  chartElement,
  //
  tf,
  orderPriceValue,
  tradeSeries,
}: {
  tokenDecimals: number;
  width: number;
  range: [number, number];
  data: [number[], number[]];
  chartElement: HTMLDivElement;

  tf: TimeFrames;
  orderPriceValue: number | null;
  tradeSeries: SeriesItem[];
}) => {
  const now = new Date();

  const minus30 = new Date(now.getTime() - 30 * 60 * 1000);
  const left = minus30.getTime() / 1000;

  const plus30 = new Date(now.getTime() + 30 * 60 * 1000);
  const right = plus30.getTime() / 1000;

  return new uPlot(
    {
      width,
      height: 400,
      // cursor: { y: false },
      cursor: {
        y: true,
      },
      scales: {
        x: {
          time: true,
          range: () => [left, right],
        },
        y: {
          // auto: true
          range: () => range,
        },
      },
      series: [
        { label: 'Time' },
        {
          label: 'Price',
          stroke: 'rgb(59, 130, 246)',
          width: 2,
        },
      ],
      axes: [
        {
          grid: { width: 1 / devicePixelRatio, stroke: '#EEEEEE' },
        },
        {
          grid: { width: 1 / devicePixelRatio, stroke: '#EEEEEE' },
        },
      ],
      hooks: {
        draw: [
          (u) => {
            const ctx = u.ctx;
            // Draw order line if present

            if (orderPriceValue !== null) {
              drawOrderLine({ orderPriceValue, ctx, u });
            }

            // Draw trade bubbles
            tradeSeries.forEach((trade) => drawTrade({ trade, ctx, u, tf }));
          },
        ],
      },
    },
    data,
    chartElement,
  );
};
