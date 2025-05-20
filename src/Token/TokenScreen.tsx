import { Show } from 'solid-js';
import { TokenChart } from '../uiKit/TokenChart';
import TradesTable from '../TradesTable/TradesTable';
import TokenStatusListShowDebug from '../Debug/TokenStatusListShowDebug';
import TokenTradeStatsShowDebug from '../Debug/TokenTradeStatsShowDebug';

import { tokenStatusStore } from '../stores/tokenStatusStore';
import { tokenTradeStatsStore } from '../stores/tokenTradeStatsStore';
import TradeForm from './TradeForm';
import { tradeEventsStore } from '../stores/tradeEventsStore';

const TokenScreen = () => {
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
          <Show
            when={
              tokenStatusStore.tokenStatus &&
              tokenTradeStatsStore.tokenTradeStats &&
              !!tradeEventsStore.trades.length
            }
          >
            <TradeForm />
          </Show>
          <TokenStatusListShowDebug />
          <TokenTradeStatsShowDebug />
        </div>
      </Show>
    </div>
  );
};
export default TokenScreen;
