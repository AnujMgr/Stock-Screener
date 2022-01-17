import React, { useState } from 'react';
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
                    border-b border-gray-100 dark:border-blue-800 dark:text-white  mb-2"
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
                              className: `dark:border-gray-700 bg-blue-900 dark:bg-blue-900 whitespace-nowrap px-4 py-4  ${column.className}`,
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
                        : null
                    }
                    }`}
                    onClick={(e) =>
                      row.original.topic !== 'topic' && row.cells.length > minDataLength + 2 && showGraph
                        ? handleOnClick({ row })
                        : null
                    }
                  >
                    {row.cells.map((cell) => {
                      const { key } = cell.getCellProps();
                      return (
                        <td
                          key={key}
                          {...cell.getCellProps([
                            {
                              className: `px-4 py-3 whitespace-nowrap sticky left-0 group-hover:bg-gray-100 dark:group-hover:bg-gray-800
                              ${
                                row.id === activeRow && showGraph
                                  ? `active-graph-particular-light dark:bg-green-700 font-medium text-white 
                                  ${showGraph ? 'cursor-pointer' : ''}`
                                  : `dark:hover:bg-gray-800 hover:bg-gray-100 font-normal text-gray-900 dark:text-gray-50 
                                  ${showGraph ? 'cursor-pointer' : ''}`
                              } 
                              ${cell.column.className}
                              ${
                                row.original.topic === 'topic'
                                  ? 'table-particular-topic-light dark:table-particular-topic-dark bg-white dark:bg-gray-800'
                                  : null
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
