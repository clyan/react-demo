/**
 * @description React Table Demo
 * @author clyan
 */

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { defaultData } from './data'
import { columns } from './columns'

export function ReactTableDemo() {
  const table = useReactTable({
    data: defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return <table>
  <thead>
    {table.getHeaderGroups().map((headerGroup) => {
      return (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <th key={header.id} colSpan={header.colSpan}>
              {header.isPlaceholder
                ? null
                : flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
            </th>
          ))}
        </tr>
      )
    })}
  </thead>
  <tbody>
    {table.getRowModel().rows.map((row) => {
      return (
        <tr key={row.id}>
          {row.getVisibleCells().map(cell => (
            <td key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      )
    })}
  </tbody>
  <tfoot>
    {table.getFooterGroups().map((footerGroup) => {
      return (
        <tr key={footerGroup.id}>
          {footerGroup.headers.map(header => (
            <th key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                  header.column.columnDef.footer,
                  header.getContext(),
                )}
            </th>
          ))}
        </tr>
      )
    })}
  </tfoot>
</table>
}
