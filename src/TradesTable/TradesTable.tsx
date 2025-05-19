import { For } from 'solid-js';

import {
  flexRender,
  getCoreRowModel,
  createSolidTable,
} from '@tanstack/solid-table';

import { trades } from '../stores/trades';
import { columns } from './columns';

const TradesTable = () => {
  const table = createSolidTable({
    get data() {
      return trades.trades;
    },
    columns,
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
