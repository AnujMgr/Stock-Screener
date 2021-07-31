import { useState } from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";

const dataList = [
  { id: 1, price: "1000", eps: "21" },
  { id: 2, price: "3000", eps: "33" },
  { id: 3, price: "122", eps: "49" },
];

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

function DataTable() {
  const [sortColumn, setSortColumn] = useState("id");
  const [sortType, setSortType] = useState("asc");
  const [loading, setLoading] = useState(false);

  function handleSortColumn(sortColumn, sortType) {
    console.log(sortColumn, sortType);
    setLoading(true);
    setSortColumn(sortColumn);
    setSortType(sortType);
    setLoading(false);
  }

  return (
    <Table
      data={getData(dataList, sortColumn, sortType)}
      onSortColumn={handleSortColumn}
      sortColumn={sortColumn}
      sortType={sortType}
      loading={loading}
    >
      <Column width={100} sortable fixed resizable>
        <HeaderCell>ID</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={100} sortable resizable>
        <HeaderCell>Price</HeaderCell>
        <Cell dataKey="price" />
      </Column>

      <Column width={100} resizable>
        <HeaderCell>EPS</HeaderCell>
        <Cell dataKey="eps" />
      </Column>

      {/* <Column width={100} resizable>
      <HeaderCell>Avartar</HeaderCell>
      <ImageCell dataKey="avartar" />
    </Column> */}
    </Table>
  );
}

export default DataTable;
