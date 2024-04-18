import { useMemo } from "react";
import { m_data } from "../data";
import "./App.css";
import BasicTable from "./components/BasicTable";

function App() {
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

  return (
    <>
      <BasicTable data={data} columns={columns} />
    </>
  );
}

export default App;
