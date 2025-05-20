import { ColumnDef } from '@tanstack/solid-table';

import { PoolKind } from '../services/cabal/CabalRpc/cabal_pb';
import { TradeRecord } from '../types';
import { calculateAssetPrice, formatAgo } from '../utils';

export const columns = (tokenDecimals: number): ColumnDef<TradeRecord>[] => [
  {
    accessorKey: 'type',
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.amountSol.toString(),
    id: 'amountSol',
    cell: (info) => <i>{info.getValue<string>()}</i>,
    header: () => <span>amountSol</span>,
  },
  {
    accessorFn: (row) =>
      calculateAssetPrice({
        baseLiq: row.baseLiq,
        quoteLiq: row.quoteLiq,
        baseDecimals: tokenDecimals,
      }),
    id: 'priceSol',
    cell: (info) => <i>{info.getValue<string>()}</i>,
    header: () => <span>priceSol</span>,
  },

  {
    accessorFn: (row) =>
      Number(row.amountSol) /
      calculateAssetPrice({
        baseLiq: row.baseLiq,
        quoteLiq: row.quoteLiq,
        baseDecimals: tokenDecimals,
      }),
    id: 'Amount',
    cell: (info) => <i>{info.getValue<string>()}</i>,
    header: () => <span>Amount</span>,
  },
  {
    accessorFn: (row) => PoolKind[row.poolKind],
    accessorKey: 'poolKind',
    header: () => 'poolKind',
  },

  {
    accessorKey: 'timestamp',
    accessorFn: (row) => formatAgo(row.timestamp),
    header: () => <span>timestamp</span>,
  },
];
