// src/components/StreamDisplay.tsx
import { useCabal } from './CabalContext';
import { createSignal, For, Show } from 'solid-js';
import { useCabalStreams } from './useCabalStreams';
import { PoolKind, MigrationStatus } from './services/cabal/CabalRpc/cabal_pb';
import { Input } from './uiKit';
type LiquidityParams = {
  baseLiq: string;
  quoteLiq: string;
  virtualBase: string;
  virtualQuote: string;
  baseDecimals: number; // напр. 6 для Fartcoin
  quoteDecimals: number; // напр. 9 для SOL
  virtualBaseDecimals?: number; // если отличается — напр. 9
  virtualQuoteDecimals?: number; // по умолчанию 9
  quoteToUSD: number; // курс quote-токена в USD, напр. 167.24
};

export function calculateTokenPriceWithVirtualsSafe({
  baseLiq,
  quoteLiq,
  virtualBase,
  virtualQuote,
  baseDecimals,
  quoteDecimals,
  virtualBaseDecimals = 9,
  virtualQuoteDecimals = 9,
  quoteToUSD,
}: LiquidityParams) {
  const normalize = (
    raw: bigint,
    rawDecimals: number,
    targetDecimals: number,
  ): number => {
    const factor = 10 ** (rawDecimals - targetDecimals);
    return Number(raw) / factor;
  };

  const baseRaw = BigInt(baseLiq);
  const quoteRaw = BigInt(quoteLiq);
  const virtualBaseRaw = BigInt(virtualBase);
  const virtualQuoteRaw = BigInt(virtualQuote);

  const totalBase =
    normalize(baseRaw, baseDecimals, 18) +
    normalize(virtualBaseRaw, virtualBaseDecimals, 18);
  const totalQuote =
    normalize(quoteRaw, quoteDecimals, 18) +
    normalize(virtualQuoteRaw, virtualQuoteDecimals, 18);

  const priceInQuote = totalQuote / totalBase;
  const priceInUSD = priceInQuote * quoteToUSD;

  return {
    priceInQuote,
    priceInUSD,
  };
}

type RaydiumPriceParams = {
  baseLiq: string; // как правило, Fartcoin
  quoteLiq: string; // например, SOL
  baseDecimals: number; // напр. 6
  quoteDecimals: number; // напр. 9
  quoteToUSD: number; // курс SOL к USD
};

function calculateRaydiumPrice({
  baseLiq,
  quoteLiq,
  baseDecimals,
  quoteDecimals,
  quoteToUSD,
}: RaydiumPriceParams) {
  const base = BigInt(baseLiq);
  const quote = BigInt(quoteLiq);

  const baseNormalized = Number(base) / 10 ** baseDecimals;
  const quoteNormalized = Number(quote) / 10 ** quoteDecimals;

  const priceInQuote = quoteNormalized / baseNormalized;
  const priceInUSD = priceInQuote * quoteToUSD;

  return {
    priceInQuote,
    priceInUSD,
  };
}

export function StreamDisplay() {
  let inputRef: HTMLInputElement | undefined;
  const cabal = useCabal();
  const { state } = useCabalStreams(cabal);
  // Сигналы для хранения результата и ошибки subscribeToken
  const [subscribeResult, setSubscribeResult] = createSignal<any>(null);
  const [subscribeError, setSubscribeError] = createSignal<string | null>(null);

  const [value, setValue] = createSignal('');
  // Функция для вызова subscribeToken
  const handleSubscribe = async () => {
    const tokenAddress = value();
    console.log('$$$ $$$', tokenAddress);
    try {
      setSubscribeError(null); // Сбрасываем ошибку
      const result = await cabal.subscribeToken({ mint: tokenAddress }); // Вызываем метод
      setSubscribeResult(result); // Сохраняем результат
      console.log('Subscribe result:', result);
    } catch (err: any) {
      setSubscribeError(err.message || 'Failed to subscribe');
      console.error('Subscribe error:', err);
    }
  };
  return (
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Stream Data</h1>
      <Input
        placeholder="token address"
        value={value()}
        onInput={(e) => setValue(e.target.value)}
      />

      <button
        disabled={!value() || value() === ''}
        class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleSubscribe}
      >
        Subscribe to Token {value()}
      </button>

      <h2 class="text-xl font-semibold mb-2 mt-4">Trade Stream</h2>
      <Show
        when={state.tokenStatusList.length > 0}
        fallback={<p>Waiting for trade stream data...</p>}
      >
        <ul class="list-disc pl-5">
          <For each={state.tokenStatusList}>
            {(trade) => {
              const price1 = calculateTokenPriceWithVirtualsSafe({
                baseLiq: trade.baseLiq.toString(),
                quoteLiq: trade.quoteLiq.toString(),
                baseDecimals: 6,
                quoteDecimals: 9,
                virtualBaseDecimals: 9, // обязательно указать!
                virtualQuoteDecimals: 9,
                virtualBase: '1073000000000000',
                virtualQuote: '30000000000',
                quoteToUSD: 167.41,
              });

              const price2 = calculateRaydiumPrice({
                baseLiq: trade.baseLiq.toString(),
                quoteLiq: trade.quoteLiq.toString(),
                baseDecimals: 6,
                quoteDecimals: 9,

                quoteToUSD: 167.41,
              });

              return (
                <li class="mb-2">
                  <pre class="mt-1">priceInQuote: {price1.priceInQuote}</pre>
                  <pre class="mt-1">priceInUSD: {price1.priceInUSD}</pre>
                  <pre class="mt-1">---</pre>
                  <pre class="mt-1">priceInQuote: {price2.priceInQuote}</pre>
                  <pre class="mt-1">priceInUSD: {price2.priceInUSD}</pre>

                  <pre class="mt-1">mint: {trade.mint}</pre>
                  <pre class="mt-1">poolId: {trade.poolId}</pre>
                  <pre class="mt-1">poolKind: {PoolKind[trade.poolKind]}</pre>
                  <pre class="mt-1">
                    migrationStatus: {MigrationStatus[trade.migrationStatus]}
                  </pre>
                  <pre class="mt-1">supply: {trade.supply.toString()}</pre>
                  <pre class="mt-1">baseLiq: {trade.baseLiq.toString()}</pre>
                  <pre class="mt-1">quoteLiq: {trade.quoteLiq.toString()}</pre>
                  <pre class="mt-1">qouteKind: {trade.qouteKind}</pre>
                  <pre class="mt-1">taxBps: {trade.taxBps}</pre>
                  <pre class="mt-1">ticker: {trade.ticker}</pre>
                </li>
              );
            }}
          </For>
        </ul>
      </Show>
    </div>
  );
}
