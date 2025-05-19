import { Show } from 'solid-js';
import { tradeEventsStore } from '../stores/tradeEventsStore';
import { TokenChart } from '../uiKit/TokenChart';
import TradesTable from '../TradesTable/TradesTable';
import TokenStatusListShowDebug from '../Debug/TokenStatusListShowDebug';
import TokenTradeStatsShowDebug from '../Debug/TokenTradeStatsShowDebug';

import { tokenStatusStore } from '../stores/tokenStatusStore';
import { tokenTradeStatsStore } from '../stores/tokenTradeStatsStore';

const TokenScreen = () => {
  // const showCondition = !!userSettings.apiKey;
  // console.log(userSettings.apiKey, tradeEventsStore.trades);
  return (
    <div class="flex flex-1">
      <div class="w-3/4 flex flex-col">
        <Show when={tokenStatusStore.tokenStatus}>
          <TokenChart />
          <TradesTable />
        </Show>
      </div>

      <div class="w-1/4 bg-green-300">
        {/* <TradesShowDebug /> */}
        <Show when={tokenStatusStore.tokenStatus}>
          <TokenStatusListShowDebug />
        </Show>
        <Show when={tokenTradeStatsStore.tokenTradeStats}>
          <TokenTradeStatsShowDebug />
        </Show>
      </div>
    </div>
  );
};
export default TokenScreen;
