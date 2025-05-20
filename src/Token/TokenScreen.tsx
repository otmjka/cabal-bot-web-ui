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
      <Show
        when={
          tokenTradeStatsStore.tokenTradeStats && tokenStatusStore.tokenStatus
        }
      >
        <div class="w-3/4 flex flex-col">
          <TokenChart />
          <TradesTable />
        </div>

        <div class="w-1/4 bg-green-300">
          {/* <TradesShowDebug /> */}
          <TokenStatusListShowDebug />

          <TokenTradeStatsShowDebug />
        </div>
      </Show>
    </div>
  );
};
export default TokenScreen;
