import { TradeRecord } from '../../stores/trades';

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
