import { ColumnDef } from '@tanstack/solid-table';

import { TradeRecord } from '../stores/trades';
import { PoolKind } from '../services/cabal/CabalRpc/cabal_pb';

export const columns: ColumnDef<TradeRecord>[] = [
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
    accessorFn: (row) => row.baseLiq.toString(),
    id: 'baseLiq',
    cell: (info) => <i>{info.getValue<string>()}</i>,
    header: () => <span>baseLiq</span>,
  },
  {
    accessorFn: (row) => PoolKind[row.poolKind],
    accessorKey: 'poolKind',
    header: () => 'poolKind',
  },
  {
    accessorKey: 'quoteLiq',
    accessorFn: (row) => row.quoteLiq.toString(),
    header: () => <span>quoteLiq</span>,
  },
  {
    accessorKey: 'timestamp',
    accessorFn: (row) => row.timestamp,
    header: () => <span>timestamp</span>,
  },
];
