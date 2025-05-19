import { For, Show } from 'solid-js';
import { MigrationStatus, PoolKind } from '../services/cabal/CabalRpc/cabal_pb';
import { tokenStatusStore } from '../stores/tokenStatusStore';

const TokenStatusListShowDebug = () => (
  <div>
    <Show when={tokenStatusStore.tokenStatusList.length > 0}>
      <For each={tokenStatusStore.tokenStatusList}>
        {(tokenStatus) => (
          <div class="">
            <div class="whitespace-nowrap">ticker: {tokenStatus.ticker}</div>
            <div class="whitespace-nowrap">mint: {tokenStatus.mint}</div>
            <div class="whitespace-nowrap">poolId: {tokenStatus.poolId}</div>
            <div class="whitespace-nowrap">
              poolKind: {PoolKind[tokenStatus.poolKind]}
            </div>
            <div class="whitespace-nowrap">
              migrationStatus: {MigrationStatus[tokenStatus.migrationStatus]}
            </div>
            <div class="whitespace-nowrap">
              supply: {tokenStatus.supply.toString()}
            </div>
            <div class="whitespace-nowrap">
              baseLiq: {tokenStatus.baseLiq.toString()}
            </div>
            <div class="whitespace-nowrap">
              quoteLiq: {tokenStatus.quoteLiq.toString()}
            </div>
            <div class="whitespace-nowrap">
              qouteKind: {tokenStatus.qouteKind}
            </div>
            <div class="whitespace-nowrap">taxBps: {tokenStatus.taxBps}</div>
            <hr />
          </div>
        )}
      </For>
    </Show>
  </div>
);
export default TokenStatusListShowDebug;
