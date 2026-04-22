import {
  Row,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Fragment, useState } from "react";
import type { ReactNode } from "react";

type DataTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  className?: string;
  emptyMessage?: string;
  getRowId?: (row: TData, index: number) => string;
  renderExpandedRow?: (row: TData) => ReactNode;
};

export function DataTable<TData>({
  data,
  columns,
  className = "",
  emptyMessage = "No data available",
  getRowId,
  renderExpandedRow,
}: DataTableProps<TData>) {
  const [expandedRowIds, setExpandedRowIds] = useState<Set<string>>(new Set());
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId,
  });
  const canExpandRows = Boolean(renderExpandedRow);

  const toggleRowExpansion = (row: Row<TData>) => {
    setExpandedRowIds((current) => {
      const next = new Set(current);
      if (next.has(row.id)) {
        next.delete(row.id);
      } else {
        next.add(row.id);
      }
      return next;
    });
  };

  return (
    <div className={`rounded-2xl border border-[var(--border-main)] bg-[var(--bg-surface)]/92 overflow-hidden ${className}`}>
      <table className="w-full">
        <thead className="bg-[var(--bg-surface-soft)] border-b border-[var(--border-main)]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left text-sm font-medium text-[var(--text-main)]"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => {
              const isExpanded = expandedRowIds.has(row.id);

              return (
                <Fragment key={row.id}>
                  <tr
                    className={`border-b border-[var(--border-main)] ${
                      index % 2 === 0 ? "bg-black/10" : "bg-black/5"
                    } hover:bg-[var(--accent-khaki)]/10 transition-colors ${
                      canExpandRows ? "cursor-pointer" : ""
                    }`}
                    onClick={canExpandRows ? () => toggleRowExpansion(row) : undefined}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 text-sm text-[var(--text-main)]">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                  {canExpandRows && isExpanded ? (
                    <tr className="border-b border-[var(--border-main)] bg-black/20 last:border-b-0">
                      <td
                        colSpan={columns.length}
                        className="px-4 py-4 text-sm text-[var(--text-main)]"
                      >
                        {renderExpandedRow?.(row.original)}
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-sm text-[var(--text-muted)]"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
