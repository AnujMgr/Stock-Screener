import React from "react";
import { useTable, useExpanded } from "react-table";

function MyTable({ columns: userColumns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { expanded },
  } = useTable({ columns: userColumns, data }, useExpanded);

  return (
    <div className="grid">
      <div className="w-full overflow-x-auto custom-scroll-light dark:custom-scroll">
        <table className="w-full whitespace-no-wrap" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => {
              const { key } = headerGroup.getHeaderGroupProps();
              return (
                <tr
                  className="my-react-table text-sm font-semibold tracking-wide text-left text-gray-900 uppercase border-b border-gray-300 dark:border-blue-800 bg-gray-100 dark:text-white dark:bg-blue-900"
                  key={key}
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => {
                    const { key } = column.getHeaderProps();
                    return (
                      <th
                        key={key}
                        className="px-4 py-4 whitespace-nowrap sticky left-0 bg-gray-100 dark:bg-blue-900 dark:border-gray-700"
                        // {...restColumn}
                        {...column.getHeaderProps()}
                      >
                        <h1 className="whitespace-nowrap inline-flex select-none items-end">
                          {column.render("Header")}
                        </h1>
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody
            className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-900 my-react-table"
            {...getTableBodyProps()}
          >
            {rows.map((row) => {
              prepareRow(row);
              const { key, ...restRowProps } = row.getRowProps();

              return (
                <tr
                  key={key}
                  {...restRowProps}
                  className="text-gray-700 dark:text-gray-50 dark:hover:bg-gray-800 hover:bg-gray-100 group"
                >
                  {row.cells.map((cell) => {
                    const { key } = cell.getCellProps();
                    return (
                      <td
                        key={key}
                        {...cell.getCellProps([
                          {
                            className: `px-4 py-3 whitespace-nowrap sticky left-0 dark:bg-gray-900 bg-white dark:group-hover:bg-gray-800 group-hover:bg-gray-100 ${cell.column.className}`,
                          },
                        ])}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyTable;
