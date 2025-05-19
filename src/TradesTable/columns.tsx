import { ColumnDef } from '@tanstack/solid-table';

import { TradeRecord } from '../stores/trades';
import { PoolKind } from '../services/cabal/CabalRpc/cabal_pb';
import { format, fromUnixTime, formatDistanceToNow } from 'date-fns';

function formatShortDistance(timestamp: number) {
  const date = fromUnixTime(timestamp);
  const now = new Date();
  const diffInSeconds: number = Math.floor(
    (now.getTime() - date.getTime()) / 1000,
  );

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`; // Секунды, например, "1s"
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m+`; // Минуты, например, "2m+"
  }

  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;
  if (minutes > 0) {
    return `${hours}h${minutes}m+`; // Часы и минуты, например, "1h2m+"
  }
  return `${hours}h`; // Только часы, например, "1h"
}

const formatDate = (timestamp: number) => {
  // Преобразование timestamp в объект Date
  const date = fromUnixTime(timestamp);

  const customFormat = format(date, 'HH:mm');

  // Получение строки "ago" (например, "около 2 дней назад")
  const ago = formatShortDistance(timestamp);

  return `${customFormat} ${ago}`;
};

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
    accessorFn: (row) => formatDate(row.timestamp),
    header: () => <span>timestamp</span>,
  },
];
