import { For, Show } from 'solid-js';
import { PoolKind } from '../services/cabal/CabalRpc/cabal_pb';
import { trades } from '../stores/trades';
import { tokenTradeStatsStore } from '../stores/tokenTradeStatsStore';

function calculateAssetPrice({
  baseLiq,
  quoteLiq,
  baseDecimals,
  quoteDecimals = 9,
}: {
  baseLiq: bigint;
  quoteLiq: bigint;
  baseDecimals: number;
  quoteDecimals?: number;
}): number {
  // Проверка на валидность входных данных
  if (baseLiq <= 0n || quoteLiq <= 0n) {
    throw new Error('Ликвидность должна быть больше 0');
  }

  // Перевод ликвидности в целые токены с учетом десятичных разрядов
  const baseTokens = Number(baseLiq) / Math.pow(10, baseDecimals);
  const quoteTokens = Number(quoteLiq) / Math.pow(10, quoteDecimals);

  // Расчет цены: quoteLiq / baseLiq
  const price = quoteTokens / baseTokens;

  return price;
}

const TradesShowDebug = () => {
  const tokenDecimals =
    tokenTradeStatsStore.tokenTradeStats?.tokenDecimals || 9;

  return (
    <div>
      <Show when={trades.trades.length > 0}>
        <For each={trades.trades}>
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
