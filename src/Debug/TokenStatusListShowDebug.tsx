import { MigrationStatus, PoolKind } from '../services/cabal/CabalRpc/cabal_pb';
import { tokenStatusStore } from '../stores/tokenStatusStore';

const TokenStatusListShowDebug = () => {
  return (
    <div>
      <div>==TokenStatusListShowDebug==</div>

      <div class="">
        <div class="whitespace-nowrap">
          ticker: {tokenStatusStore.tokenStatus.ticker}
        </div>
        <div class="whitespace-nowrap">
          mint: {tokenStatusStore.tokenStatus.mint}
        </div>
        <div class="whitespace-nowrap">
          poolId: {tokenStatusStore.tokenStatus.poolId}
        </div>
        <div class="whitespace-nowrap">
          poolKind: {PoolKind[tokenStatusStore.tokenStatus.poolKind]}
        </div>
        <div class="whitespace-nowrap">
          migrationStatus:{' '}
          {MigrationStatus[tokenStatusStore.tokenStatus.migrationStatus]}
        </div>
        <div class="whitespace-nowrap">
          supply: {tokenStatusStore.tokenStatus.supply.toString()}
        </div>
        <div class="whitespace-nowrap">
          baseLiq: {tokenStatusStore.tokenStatus.baseLiq.toString()}
        </div>
        <div class="whitespace-nowrap">
          quoteLiq: {tokenStatusStore.tokenStatus.quoteLiq.toString()}
        </div>
        <div class="whitespace-nowrap">
          qouteKind: {tokenStatusStore.tokenStatus.qouteKind}
        </div>
        <div class="whitespace-nowrap">
          taxBps: {tokenStatusStore.tokenStatus.taxBps}
        </div>
        <hr />
      </div>
    </div>
  );
};
export default TokenStatusListShowDebug;
