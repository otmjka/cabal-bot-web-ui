import uPlot from 'uplot';
import { SeriesItem, TimeFrames } from './types';
import { drawOrderLine } from './drawOrderLine';
import { drawTrade } from './drawTrade';

export const getChartInstance = ({
  width,
  range,
  data,
  chartElement,
  //
  tf,
  orderPriceValue,
  tradeSeries,
}: {
  width: number;
  range: [number, number];
  data: [number[], number[]];
  chartElement: HTMLDivElement;

  tf: TimeFrames;
  orderPriceValue: number | null;
  tradeSeries: SeriesItem[];
}) => {
  const now = new Date();

  // начало часа
  const startOfHour = new Date(now);
  startOfHour.setMinutes(0, 0, 0);

  // конец часа
  const endOfHour = new Date(now);
  endOfHour.setMinutes(59, 59, 999);

  // преобразуем в timestamp (в секундах, потому что uPlot использует секунды, а не миллисекунды)
  const range1h = [startOfHour.getTime() / 1000, endOfHour.getTime() / 1000];
  return new uPlot(
    {
      width,
      height: 400,
      cursor: { y: false },
      scales: {
        x: {
          time: true,
          range: () => [
            startOfHour.getTime() / 1000,
            endOfHour.getTime() / 1000,
          ],
        },
        y: { auto: true },
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
          label: 'Time',
          grid: { width: 1 / devicePixelRatio, stroke: '#EEEEEE' },
        },
        {
          label: 'Price',
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
