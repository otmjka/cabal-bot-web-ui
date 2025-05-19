import { TradeRecord } from '../types';

export const calculatePrice = ({
  trade,
  baseDecimals,
}: {
  trade: TradeRecord;
  baseDecimals: number;
}): number => {
  const quoteLiqFloat = Number(trade.quoteLiq) / 1e9; // quote decimals всегда 9 (SOL)
  const baseLiqFloat = Number(trade.baseLiq) / 10 ** baseDecimals;

  if (baseLiqFloat === 0) return 0;

  return quoteLiqFloat / baseLiqFloat;
};

export const calculateAssetPrice = ({
  baseLiq,
  quoteLiq,
  baseDecimals,
  quoteDecimals = 9,
}: {
  baseLiq: bigint;
  quoteLiq: bigint;
  baseDecimals: number;
  quoteDecimals?: number;
}): number => {
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
};
