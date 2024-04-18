import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { m_data } from "../../data.js";
import { useEffect, useMemo } from "react";

const BasicTable = () => {
  //memoized data
  const data = useMemo(() => m_data, []);

  /** @type import('@tanstack/react-table').ColumnDef<any>*/
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    //with children
    //now other headers become placeholders beside Children
    {
      header: "Children",
      columns: [
        {
          header: "First",
          cell: () => <h4>first</h4>,
        },
        {
          header: "Second",
          cell: () => <h4>Second</h4>,
        },
      ],
    },
    //accessor function
    {
      header: "New",
      accessorFn: (row) => `${row.name} 18`,
    },
    //row and info are not the same
    {
      header: "Gender",
      accessorKey: "gender",
      cell: (info) => <h4>{info.getValue()}</h4>, // custom cell
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    table.setPageSize(2); //items per page
    console.log(table.getPageCount());
  }, []);

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
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
