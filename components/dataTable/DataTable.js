import { useEffect, useState } from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
// import "../../styles/rsuite-table.css";

function DataTable({ dataList, statements }) {
  const [sortColumn, setSortColumn] = useState("79");
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
      <Column sortable resizable>
        <HeaderCell className="select-none ">Name</HeaderCell>
        <Cell dataKey="company" />
      </Column>
      <Column sortable resizable>
        <HeaderCell className="select-none ">Price</HeaderCell>
        <Cell dataKey="price" />
      </Column>

      {statements.map((stat) => (
        <Column key={stat.id} width={100} sortable resizable>
          <HeaderCell className="select-none">{stat.name}</HeaderCell>
          <Cell dataKey={String(stat.id)} />
        </Column>
      ))}
    </Table>
  );
}

const getData = (data, sortColumn, sortType) => {
  if (sortColumn && sortType) {
    return data.sort((a, b) => {
      let x = a[sortColumn] || "z";
      let y = b[sortColumn] || "z";
      // console.log(x);
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
