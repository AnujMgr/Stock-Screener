import React, { useEffect, useState } from 'react';
import { useTable, useExpanded } from 'react-table';
import FinancialsAreaChart from '../charts/FinancialsAreaChart';

function FinancialTable({ columns: userColumns, data, minDataLength, highlightTopic, showGraph }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { expanded },
  } = useTable({ columns: userColumns, data }, useExpanded);

  const [chartData, setChartData] = useState([]);
  const [activeRow, setActiveRow] = useState('');

  function handleOnClick({ row }) {
    setActiveRow(row.id);
    const data = [];
    row.cells.map((cell, index) => {
      if (index > 1) {
        data.push({
          date: cell.column.Header,
          name: row.original.particular,
          amt: cell.value ? Number(cell.value.replace(/,/g, '')) : null,
        });
      }
    });
    setChartData(data);
  }

  return (
    <>
      {chartData.length > 1 && showGraph ? (
        <div className="mb-3">
          <FinancialsAreaChart data={chartData} />
        </div>
      ) : null}
      <div className="grid">
        <div className="w-full overflow-x-auto custom-scroll-light dark:custom-scroll">
          <table className="w-full whitespace-no-wrap" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => {
                const { key } = headerGroup.getHeaderGroupProps();
                return (
                  <tr
                    className="my-react-table text-sm font-semibold tracking-wide text-left text-gray-200 uppercase 
                    border-b border-gray-100 dark:border-blue-800 dark:text-white mb-2"
                    key={key}
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers.map((column) => {
                      const { key } = column.getHeaderProps();
                      return (
                        <th
                          key={key}
                          className=""
                          // {...restColumn}
                          {...column.getHeaderProps([
                            {
                              className: ` ${column.className} table-header-bg dark:border-gray-700  whitespace-nowrap px-4 py-4`,
                            },
                          ])}
                        >
                          <h1 className="whitespace-nowrap inline-flex select-none items-end">
                            {column.render('Header')}
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
                    className={`group ${
                      row.original.topic === 'topic'
                        ? 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 font-semibold'
                        : ''
                    }`}
                    onClick={(e) =>
                      row.original.topic !== 'topic' && row.cells.length > minDataLength + 2 && showGraph
                        ? handleOnClick({ row })
                        : ''
                    }
                  >
                    {row.cells.map((cell) => {
                      const { key } = cell.getCellProps();
                      return (
                        <td
                          key={key}
                          {...cell.getCellProps([
                            {
                              className: `table-td
                              ${
                                row.id === activeRow && showGraph
                                  ? `table-td-graph-active active-graph-particular-light 
                                  ${showGraph ? 'cursor-pointer' : ''}`
                                  : `table-td-graph-inactive 
                                  ${showGraph ? 'cursor-pointer' : ''}`
                              } 
                              ${cell.column.className}
                              ${
                                row.original.topic === 'topic'
                                  ? 'table-td-is-topic table-particular-topic-light dark:table-particular-topic-dark'
                                  : row.original.topic === 'child'
                                  ? 'bg-gray-200 dark:bg-gray-800'
                                  : row.original.topic === 'total'
                                  ? 'font-bold text-base'
                                  : ''
                              } 
                              `,
                            },
                          ])}
                        >
                          {cell.render('Cell')}
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
    </>
  );
}

export default FinancialTable;
