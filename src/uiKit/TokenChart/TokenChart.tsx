import {
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
  Show,
} from 'solid-js';
import uPlot from 'uplot';
import { tradeEventsStore } from '../../stores/tradeEventsStore';
import 'uplot/dist/uPlot.min.css';
import { tokenStatusStore } from '../../stores/tokenStatusStore';
import { TimeFrames } from './types';
import { tokenTradeStatsStore } from '../../stores/tokenTradeStatsStore';
import { getChartData } from './getChartData';
import { getChartInstance } from './getChartInstance';
import { chartTradePriceStore } from '../../stores/chartTradePriceStore';

export default function TokenChart() {
  const [chartElement, setChartElement] = createSignal<HTMLDivElement | null>(
    null,
  );
  const [chart, setChart] = createSignal<uPlot | null>(null);

  const [selectedTimeframe, setSelectedTimeframe] = createSignal<TimeFrames>(
    TimeFrames.single,
  );

  const tokenDecimals =
    tokenTradeStatsStore.tokenTradeStats?.tokenDecimals || 9;

  const handleTimeframeChange = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    setSelectedTimeframe(select.value as TimeFrames);
  };

  // Handle window resize for responsive chart
  const handleResize = () => {
    const chartResult = chart();
    const chartElementResult = chartElement();
    if (!chartResult || !chartElementResult) {
      return;
    }

    chartResult.setSize({
      width: chartElementResult.clientWidth,
      height: 400,
    });
  };

  const chartData = createMemo(() =>
    getChartData({
      trades: tradeEventsStore.trades,
      selectedTimeframe: selectedTimeframe(),
      tokenDecimals,
    }),
  );

  const renderChart = () => {
    const chartElementValue = chartElement();
    const chartValue = chart();
    if (!chartElementValue) {
      return;
    }
    if (chartValue) {
      chartValue.destroy();
    }

    const data = chartData();

    // Prepare data for uPlot
    const timestamps = data.map((d) => d.timestamp);
    const prices = data.map((d) => d.price);

    // Set the min/max values for better visualization
    const minPrice = Math.min(...prices) * 0.99;
    const maxPrice =
      Math.max(...prices, chartTradePriceStore.price || 0) * 1.01;

    const chartInstance = getChartInstance({
      tokenDecimals,
      width: chartElementValue.clientWidth,
      range: [minPrice, maxPrice],
      data: [timestamps, prices],
      tf: selectedTimeframe(),
      orderPriceValue: chartTradePriceStore.price,
      tradeSeries: data,
      chartElement: chartElementValue,
    });

    setChart(chartInstance);
  };

  onMount(() => {
    window.addEventListener('resize', handleResize);

    renderChart();
  });

  onCleanup(() => {
    window.removeEventListener('resize', handleResize);
    const chartEl = chartElement();
  });

  // Re-render chart when timeframe changes
  createEffect(() => {
    chartTradePriceStore.price;
    chartData();
    selectedTimeframe();
    if (chartElement()) {
      setTimeout(renderChart, 0);
    }
  });

  return (
    <div class="bg-gray-100 p-4 rounded-lg shadow-md">
      <div class="flex justify-between items-center mb-4">
        <Show when={tokenStatusStore.tokenStatus}>
          <h2 class="text-xl font-bold">
            {tokenStatusStore.tokenStatus &&
              tokenStatusStore.tokenStatus.ticker}{' '}
            Price Chart
          </h2>
        </Show>
        <div class="flex gap-4">
          <div class="flex items-center gap-2">
            <label for="timeframe" class="text-sm font-medium">
              Timeframe:
            </label>
            <select
              id="timeframe"
              value={selectedTimeframe()}
              onChange={handleTimeframeChange}
              class="px-2 py-1 rounded border border-gray-300 text-sm"
            >
              <option value="single">Single Trade</option>
              <option value="1s">1 Second</option>
              <option value="15s">15 Seconds</option>
              <option value="30s">30 Seconds</option>
            </select>
          </div>
          {/* <button
            class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
            onClick={setRandomOrder}
          >
            Set Sample Order
          </button> */}
        </div>
      </div>

      <div
        ref={setChartElement}
        class="w-full h-[400px] bg-white border rounded"
      ></div>
    </div>
  );
}
