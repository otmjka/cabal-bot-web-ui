import { Component, createMemo, createSignal } from 'solid-js';
import { Input } from '../uiKit';
import { tradeEventsStore } from '../stores/tradeEventsStore';
import { calculatePrice } from '../utils';
import { tokenStatusStore } from '../stores/tokenStatusStore';
import { tokenTradeStatsStore } from '../stores/tokenTradeStatsStore';
import { setChartTradePriceStore } from '../stores/chartTradePriceStore';

const TradeForm: Component = () => {
  const [amount, setAmount] = createSignal<number | undefined>(undefined);
  const priceInSol = createMemo(() => {
    const trades = tradeEventsStore.trades;
    const latestTrade = trades[trades.length - 1];
    const tokenDecimals =
      tokenTradeStatsStore.tokenTradeStats?.tokenDecimals ?? 9;
    const price = calculatePrice({
      trade: latestTrade,
      baseDecimals: tokenDecimals,
    });
    return price;
  });
  const priceStr = createMemo(() => {
    const ticker = tokenStatusStore.tokenStatus?.ticker ?? '';

    return `1 ${ticker} ≈ ${priceInSol()} SOL`;
  });

  const solPrice = createMemo(() => {
    const ticker = tokenStatusStore.tokenStatus?.ticker ?? '';
    return `1 SOL ≈ ${1 / priceInSol()} ${ticker}`;
  });
  return (
    <div class="p-2">
      <div>
        <div class="flex items-center">
          <button
            type="button"
            disabled={!amount()}
            class="w-full px-4 py-2 text-base font-small text-gray-400 bg-gray-900 border-t border-b border-l rounded-l-md hover:bg-gray-700 disabled:bg-gray-700"
            onClick={() => setChartTradePriceStore('price', priceInSol() * 2)}
          >
            Buy
          </button>
          {/* <button
            type="button"
            class="w-full px-4 py-2 text-base font-small text-gray-400 bg-gray-900 border hover:bg-gray-100"
          >
            Sell
          </button>
          <button
            type="button"
            class="w-full px-4 py-2 text-base font-small text-gray-400 bg-gray-900 border-t border-b border-r rounded-r-md hover:bg-gray-100"
          >
            Auto
          </button> */}
        </div>
      </div>
      <div>
        <Input
          cn="w-full rounded-b-none"
          placeholder="SOL"
          disabled
          value={`${amount() ?? ''} SOL`}
        />
      </div>
      <div>
        <div class="flex items-center">
          <button
            type="button"
            class="w-full px-4 py-2 text-sm font-small text-gray-400 bg-gray-900 border-t border-b border-l rounded-l-md hover:bg-gray-700 border-gray-700"
            onClick={() => setAmount(0.001)}
          >
            0.001
          </button>
          <button
            type="button"
            class="w-full px-4 py-2 text-sm font-small text-gray-400 bg-gray-900 border hover:bg-gray-700 border-gray-700"
            onClick={() => setAmount(0.01)}
          >
            0.01
          </button>
          <button
            type="button"
            class="w-full px-4 py-2 text-sm font-small text-gray-400 bg-gray-900 border hover:bg-gray-700 border-gray-700"
            onClick={() => setAmount(0.05)}
          >
            0.05
          </button>
          <button
            type="button"
            class="w-full px-4 py-2 text-sm font-small text-gray-400 bg-gray-900 border-t border-b border-r rounded-r-md hover:bg-gray-700 border-gray-700"
            onClick={() => setAmount(1)}
          >
            1
          </button>
        </div>
        <div class="flex">
          <div>{priceStr()}</div>
        </div>
        <div class="flex">
          <div>+100% {priceInSol() * 2}</div>
        </div>

        <div class="flex">
          <div>{solPrice()}</div>
        </div>
      </div>
    </div>
  );
};

export default TradeForm;
