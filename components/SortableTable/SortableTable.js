import React from "react";
import { useTable, useSortBy } from "react-table";
import { SortDown, SortUp } from "../../lib/icons/Icons";

function SortableTable({ data, columns, showCheck }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
  } = useTable({ columns, data, disableSortRemove: true }, useSortBy);

  return (
    <div className="grid">
      {showCheck ? (
        <div className="flex gap-3 mb-3">
          {allColumns.map((column) => (
            <div key={column.id}>
              <label>
                <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
                {column.id}
              </label>
            </div>
          ))}
        </div>
      ) : null}
      <div className="w-full overflow-x-auto custom-scroll-light dark:custom-scroll">
        <table className="w-full whitespace-no-wrap" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => {
              const { key } = headerGroup.getHeaderGroupProps();
              return (
                <tr
                  key={key}
                  {...headerGroup.getHeaderGroupProps()}
                  className="my-table text-sm font-semibold tracking-wide text-left text-gray-900 uppercase border-b border-gray-300 dark:border-blue-800 bg-gray-100 dark:text-white dark:bg-blue-900"
                >
                  {headerGroup.headers.map((column) => {
                    const { key } = column.getHeaderProps();
                    return (
                      <th
                        key={key}
                        className="px-4 py-4 whitespace-nowrap sticky left-0 bg-gray-100 dark:bg-blue-900 dark:border-gray-700"
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        <h1 className="whitespace-nowrap inline-flex select-none items-end">
                          {column.render("Header")}

                          <span className="ml-2">
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <SortDown height="22" />
                              ) : (
                                <SortUp height="22" />
                              )
                            ) : (
                              ""
                            )}
                          </span>
                        </h1>
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody
            className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-900 my-table"
            {...getTableBodyProps()}
          >
            {rows.map((row) => {
              prepareRow(row);
              const { key } = row.getRowProps();

              return (
                <tr
                  key={key}
                  {...row.getRowProps()}
                  className="text-gray-700 dark:text-gray-50 dark:hover:bg-gray-800 hover:bg-gray-100 group even:bg-gray-500"
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

export default SortableTable;
