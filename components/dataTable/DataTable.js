import { useEffect, useState } from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";

// const dataList = [
//   { id: 1, price: "1000" },
//   { id: 1, roe: "1000" },
//   { id: 2, price: "1000" },
//   { id: 3, price: "1000" },
// ];

function DataTable({ dataList, statements }) {
  const [sortColumn, setSortColumn] = useState("id");
  const [sortType, setSortType] = useState("asc");
  const [loading, setLoading] = useState(false);

  function handleSortColumn(sortColumn, sortType) {
    setLoading(true);
    setSortColumn(sortColumn);
    setSortType(sortType);
    setLoading(false);
  }

  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Table
      data={getData(dataList, sortColumn, sortType)}
      onSortColumn={handleSortColumn}
      sortColumn={sortColumn}
      sortType={sortType}
      loading={loading}
      height={420}
      autoHeight
    >
      <Column width={200} sortable fixed resizable>
        <HeaderCell>Name</HeaderCell>
        <Cell dataKey="company" />
      </Column>

      {statements.map((stat) => (
        <Column key={stat.id} width={100} sortable fixed resizable>
          <HeaderCell>{stat.name}</HeaderCell>
          <Cell dataKey={stat.id} />
        </Column>
      ))}
    </Table>
  );
}

const getData = (data, sortColumn, sortType) => {
  if (sortColumn && sortType) {
    return data.sort((a, b) => {
      let x = a[sortColumn];
      let y = b[sortColumn];
      if (typeof x === "string") {
        x = x.charCodeAt();
      }
      if (typeof y === "string") {
        y = y.charCodeAt();
      }
      if (sortType === "asc") {
        return x - y;
      } else {
        return y - x;
      }
    });
  }
  return data;
};

export default DataTable;
