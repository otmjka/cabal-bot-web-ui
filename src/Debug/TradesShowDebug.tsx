import { For, Show } from 'solid-js';
import { PoolKind } from '../services/cabal/CabalRpc/cabal_pb';
import { tradeEventsStore } from '../stores/tradeEventsStore';
import { tokenTradeStatsStore } from '../stores/tokenTradeStatsStore';
import { calculateAssetPrice } from '../utils';

const TradesShowDebug = () => {
  const tokenDecimals =
    tokenTradeStatsStore.tokenTradeStats?.tokenDecimals || 9;

  const trades = tradeEventsStore.trades;
  return (
    <div>
      <Show when={trades.length > 0}>
        <For each={trades}>
          {(trade) => (
            <div class="flex gap-3">
              <div class="whitespace-nowrap">{trade.type}</div>
              <div class="whitespace-nowrap">
                amountSol: {trade.amountSol.toString()}
              </div>
              <div class="whitespace-nowrap">
                price:{' '}
                {calculateAssetPrice({
                  baseLiq: trade.baseLiq,
                  quoteLiq: trade.quoteLiq,
                  baseDecimals: tokenDecimals,
                })}
              </div>
              <div class="whitespace-nowrap">
                baseLiq: {trade.baseLiq.toString()}
              </div>
              <div class="whitespace-nowrap">
                quoteLiq: {trade.quoteLiq.toString()}
              </div>
              <div class="whitespace-nowrap">
                poolKind: {PoolKind[trade.poolKind]}
              </div>
              <div class="whitespace-nowrap">timestamp: {trade.timestamp}</div>
              <hr />
            </div>
          )}
        </For>
      </Show>
    </div>
  );
};

export default TradesShowDebug;
