import { For, Show } from 'solid-js';

import { tokenTradeStatsStore } from '../stores/tokenTradeStatsStore';

const TokenTradeStatsShowDebug = () => (
  <div>
    <Show when={tokenTradeStatsStore.tokenTradeStatsList.length > 0}>
      <For each={tokenTradeStatsStore.tokenTradeStatsList}>
        {(tokenTradeStats) => (
          <div class="">
            <div class="whitespace-nowrap">mint: {tokenTradeStats.mint}</div>
            <div class="whitespace-nowrap">
              tokenDecimals: {tokenTradeStats.tokenDecimals}
            </div>

            <div class="whitespace-nowrap">
              buyBase: {tokenTradeStats.buyBase.toString()}
            </div>
            <div class="whitespace-nowrap">
              buyQoute: {tokenTradeStats.buyQoute.toString()}
            </div>
            <div class="whitespace-nowrap">buys: {tokenTradeStats.buys}</div>
            <div class="whitespace-nowrap">sells: {tokenTradeStats.sells}</div>
            <div class="whitespace-nowrap">
              lastTradedSlot: {tokenTradeStats.lastTradedSlot.toString()}
            </div>
            <div class="whitespace-nowrap">
              qouteKind: {tokenTradeStats.qouteKind}
            </div>
            <div class="whitespace-nowrap">
              sellBase: {tokenTradeStats.sellBase.toString()}
            </div>
            <div class="whitespace-nowrap">
              sellQoute: {tokenTradeStats.sellQoute.toString()}
            </div>
            <div class="whitespace-nowrap">
              tokenBalance: {tokenTradeStats.tokenBalance.toString()}
            </div>
            <hr />
          </div>
        )}
      </For>
    </Show>
  </div>
);
export default TokenTradeStatsShowDebug;
