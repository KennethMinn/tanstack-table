import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

const BasicTable = ({ data, columns }) => {
  const [sorting, setSorting] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      globalFilter: searchKey,
    },
    onSortingChange: setSorting,
  });

  useEffect(() => {
    table.setPageSize(2); //items per page
    console.log(table.getPageCount());
  }, [table]);

  return (
    <div>
      <input
        type="text"
        placeholder="search..."
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <table>
        {/* headers */}
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  style={{ cursor: "pointer" }}
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {/* sorting codes */}
                      {
                        { asc: "⬆️", desc: "⬇️" }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* rows */}
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* pagination */}
      <div>
        <button onClick={() => table.setPageIndex(0)}>first page</button>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          previous page
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          next page
        </button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          last page
        </button>
      </div>
    </div>
  );
};

export default BasicTable;
