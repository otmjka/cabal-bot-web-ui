import { createEffect, onCleanup } from 'solid-js';
import {
  createChart,
  CandlestickSeries,
  LayoutOptions,
  ColorType,
} from 'lightweight-charts';
const candlestickData = [
  {
    time: '2018-10-19',
    open: 180.34,
    high: 180.99,
    low: 178.57,
    close: 179.85,
  },
  { time: '2018-10-22', open: 180.82, high: 181.4, low: 177.56, close: 178.75 },
  {
    time: '2018-10-23',
    open: 175.77,
    high: 179.49,
    low: 175.44,
    close: 178.53,
  },
  {
    time: '2018-10-24',
    open: 178.58,
    high: 182.37,
    low: 176.31,
    close: 176.97,
  },
  { time: '2018-10-25', open: 177.52, high: 180.5, low: 176.83, close: 179.07 },
  {
    time: '2018-10-26',
    open: 176.88,
    high: 177.34,
    low: 170.91,
    close: 172.23,
  },
  { time: '2018-10-29', open: 173.74, high: 175.99, low: 170.95, close: 173.2 },
  {
    time: '2018-10-30',
    open: 173.16,
    high: 176.43,
    low: 172.64,
    close: 176.24,
  },
  {
    time: '2018-10-31',
    open: 177.98,
    high: 178.85,
    low: 175.59,
    close: 175.88,
  },
  { time: '2018-11-01', open: 176.84, high: 180.86, low: 175.9, close: 180.46 },
];
const TradingViewChart = () => {
  let chartContainerRef: HTMLDivElement | undefined;
  createEffect(() => {
    // Ensure chartContainerRef is defined
    if (!chartContainerRef) {
      console.error('chartContainerRef is not assigned');
      return;
    }
    // Initialize the chart
    const chart = createChart(chartContainerRef, {
      width: chartContainerRef.offsetWidth,
      height: chartContainerRef.offsetHeight,
      layout: {
        background: { type: ColorType.Solid, color: '#FFFFFF' },
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#e1e1e1' },
        horzLines: { color: '#e1e1e1' },
      },
      crosshair: {
        mode: 1, // Magnet mode
      },

      timeScale: {
        borderColor: '#cccccc',
        timeVisible: true,
      },
      // Enable autoSize for automatic resizing
      autoSize: true,
    });
    // Add candlestick series
    const candlestickSeries = chart.addSeries(CandlestickSeries);
    candlestickSeries.setData(candlestickData);

    // Handle chart resizing
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length === 0 || entries[0].target !== chartContainerRef)
        return;
      const { width, height } = entries[0].contentRect;
      chart.applyOptions({ width, height });
    });

    resizeObserver.observe(chartContainerRef);

    // Cleanup on component unmount
    onCleanup(() => {
      resizeObserver.disconnect();
      chart.remove();
    });
  });

  return (
    <div
      ref={chartContainerRef}
      style={{ position: 'relative', width: '100%', height: '500px' }}
    />
  );
};

export default TradingViewChart;
