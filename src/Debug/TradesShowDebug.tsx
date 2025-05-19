import { For, Show } from 'solid-js';
import { PoolKind } from '../services/cabal/CabalRpc/cabal_pb';
import { trades } from '../stores/trades';

const TradesShowDebug = () => (
  <div>
    <Show when={trades.trades.length > 0}>
      <For each={trades.trades}>
        {(trade) => (
          <div class="flex gap-3">
            <div class="whitespace-nowrap">type: {trade.type}</div>
            <div class="whitespace-nowrap">
              amountSol: {trade.data.amountSol.toString()}
            </div>
            <div class="whitespace-nowrap">
              baseLiq: {trade.data.baseLiq.toString()}
            </div>
            <div class="whitespace-nowrap">
              poolKind: {PoolKind[trade.data.poolKind]}
            </div>
            <div class="whitespace-nowrap">
              quoteLiq: {trade.data.quoteLiq.toString()}
            </div>
            <hr />
          </div>
        )}
      </For>
    </Show>
  </div>
);

export default TradesShowDebug;
