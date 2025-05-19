import { For, Show } from 'solid-js';

import { tokenTradeStatsStore } from '../stores/tokenTradeStatsStore';

const TokenTradeStatsShowDebug = () => {
  return (
    <div>
      <Show when={tokenTradeStatsStore.tokenTradeStats}>
        <div class="">
          <div class="whitespace-nowrap">
            mint: {tokenTradeStatsStore.tokenTradeStats.mint}
          </div>
          <div class="whitespace-nowrap">
            tokenDecimals: {tokenTradeStatsStore.tokenTradeStats.tokenDecimals}
          </div>

          <div class="whitespace-nowrap">
            buyBase: {tokenTradeStatsStore.tokenTradeStats.buyBase.toString()}
          </div>
          <div class="whitespace-nowrap">
            buyQoute: {tokenTradeStatsStore.tokenTradeStats.buyQoute.toString()}
          </div>
          <div class="whitespace-nowrap">
            buys: {tokenTradeStatsStore.tokenTradeStats.buys}
          </div>
          <div class="whitespace-nowrap">
            sells: {tokenTradeStatsStore.tokenTradeStats.sells}
          </div>
          <div class="whitespace-nowrap">
            lastTradedSlot:{' '}
            {tokenTradeStatsStore.tokenTradeStats.lastTradedSlot.toString()}
          </div>
          <div class="whitespace-nowrap">
            qouteKind: {tokenTradeStatsStore.tokenTradeStats.qouteKind}
          </div>
          <div class="whitespace-nowrap">
            sellBase: {tokenTradeStatsStore.tokenTradeStats.sellBase.toString()}
          </div>
          <div class="whitespace-nowrap">
            sellQoute:{' '}
            {tokenTradeStatsStore.tokenTradeStats.sellQoute.toString()}
          </div>
          <div class="whitespace-nowrap">
            tokenBalance:{' '}
            {tokenTradeStatsStore.tokenTradeStats.tokenBalance.toString()}
          </div>
          <hr />
        </div>
      </Show>
    </div>
  );
};
export default TokenTradeStatsShowDebug;
