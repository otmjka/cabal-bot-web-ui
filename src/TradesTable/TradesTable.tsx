import { trades } from '../stores/trades';

import {
  flexRender,
  getCoreRowModel,
  ColumnDef,
  createSolidTable,
} from '@tanstack/solid-table';
import { createSignal, For } from 'solid-js';
import { TradeRecord } from '../stores/trades';
import { PoolKind } from '../services/cabal/CabalRpc/cabal_pb';

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];
{
  /* <div>type: {trade.type}</div>
              <div>amountSol: {trade.data.amountSol.toString()}</div>
              <div>baseLiq: {trade.data.baseLiq.toString()}</div>
              <div>poolKind: {trade.data.poolKind.toString()}</div>
              <div>quoteLiq: {trade.data.quoteLiq.toString()}</div> */
}
const defaultColumns: ColumnDef<TradeRecord>[] = [
  {
    accessorKey: 'type',
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.data.amountSol.toString(),
    id: 'amountSol',
    cell: (info) => <i>{info.getValue<string>()}</i>,
    header: () => <span>amountSol</span>,
  },
  {
    accessorFn: (row) => row.data.baseLiq.toString(),
    id: 'baseLiq',
    cell: (info) => <i>{info.getValue<string>()}</i>,
    header: () => <span>baseLiq</span>,
  },
  {
    accessorFn: (row) => PoolKind[row.data.poolKind],
    accessorKey: 'poolKind',
    header: () => 'poolKind',
  },
  {
    accessorKey: 'quoteLiq',
    accessorFn: (row) => row.data.quoteLiq.toString(),
    header: () => <span>quoteLiq</span>,
  },
];

const TradesTable = () => {
  const table = createSolidTable({
    get data() {
      return trades.trades;
    },
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div class="h-64 overflow-auto border rounded w-[50%]">
      <table class="table p-4 bg-white rounded-lg shadow min-w-full table-auto">
        <thead>
          <For each={table.getHeaderGroups()}>
            {(headerGroup) => (
              <tr>
                <For each={headerGroup.headers}>
                  {(header) => (
                    <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900 text-left">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  )}
                </For>
              </tr>
            )}
          </For>
        </thead>
        <tbody>
          <For each={table.getRowModel().rows}>
            {(row) => (
              <tr class="text-gray-700">
                <For each={row.getVisibleCells()}>
                  {(cell) => (
                    <td class="border-b-2 p-4 dark:border-dark-5">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tbody>
        <tfoot>
          <For each={table.getFooterGroups()}>
            {(footerGroup) => (
              <tr>
                <For each={footerGroup.headers}>
                  {(header) => (
                    <th>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext(),
                          )}
                    </th>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tfoot>
      </table>
      <div class="h-4" />
    </div>
  );
};

export default TradesTable;
