import {
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
  Show,
} from 'solid-js';
import uPlot from 'uplot';
import { trades as tradeStore } from '../../stores/trades';
import 'uplot/dist/uPlot.min.css';
import { tokenStatusStore } from '../../stores/tokenStatusStore';
import { TimeFrames } from './types';
import { tokenTradeStatsStore } from '../../stores/tokenTradeStatsStore';
import { getChartData } from './getChartData';
import { getChartInstance } from './getChartInstance';

export default function TokenChart() {
  const [chartElement, setChartElement] = createSignal<HTMLDivElement | null>(
    null,
  );
  const [chart, setChart] = createSignal<uPlot | null>(null);
  const [orderPrice, setOrderPrice] = createSignal(null);

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
      trades: tradeStore.trades,
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
    const prices = data.map((d) => Number(d.price)); // TODO:

    // Set the min/max values for better visualization
    const minPrice = Math.min(...prices) * 0.99;
    const maxPrice = Math.max(...prices) * 1.01;

    const chartInstance = getChartInstance({
      width: chartElementValue.clientWidth,
      range: [minPrice, maxPrice],
      data: [timestamps, prices],
      tf: selectedTimeframe(),
      orderPriceValue: orderPrice(),
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

      <div class="flex gap-6 mt-2">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-green-500 bg-opacity-60 border border-white"></div>
          <span class="text-sm">Buy Trades</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-red-500 bg-opacity-60 border border-white"></div>
          <span class="text-sm">Sell Trades</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-5 h-0.5 bg-orange-400 border-t border-dashed border-orange-500"></div>
          <span class="text-sm">Order Price</span>
        </div>
      </div>
    </div>
  );
}
