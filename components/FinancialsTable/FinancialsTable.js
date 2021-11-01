import React from "react";
import ReactTooltip from "react-tooltip";
import Accordion from "../accordion/Accordion";

export default function FinancialsTable({ financialStatement }) {
  return (
    <div className="w-full overflow-x-auto custom-scroll">
      <table className="w-full whitespace-no-wrap">
        <thead>
          <tr className="text-sm font-semibold tracking-wide text-left text-gray-900 uppercase border-b-2 border-gray-300 dark:border-blue-800 bg-gray-100 dark:text-white dark:bg-blue-900">
            <th className="px-4 py-4 sticky left-0 bg-gray-100 dark:bg-blue-900 dark:border-gray-700">
              Particulars
            </th>

            {financialStatement[1].financialStatementFact.map((fact) => (
              <th key={fact.id} className="px-4 py-4">
                {fact.fiscalYear} {"  "} {fact.quarter}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-900">
          {financialStatement.map((fact) => (
            <tr
              key={fact.id}
              className="text-gray-700 dark:text-gray-50 dark:hover:bg-gray-800 hover:bg-gray-100 group"
            >
              {fact.children.length > 0 ? (
                <Accordion fact={fact} />
              ) : (
                <td className="px-4 py-3 sticky left-0 dark:bg-gray-900 bg-white dark:group-hover:bg-gray-800 group-hover:bg-gray-100">
                  {fact.unit == "topic" ? (
                    <h1 className="font-bold">{fact.name}</h1>
                  ) : (
                    <h1 className="inline-flex items-center">
                      {fact.name}{" "}
                      <span
                        className="ml-3 relative"
                        data-tip
                        data-for="registerTip"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          fill="currentColor"
                          className="bi bi-info-circle hover:block"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                        </svg>
                      </span>
                      <ReactTooltip
                        key={fact.id}
                        id="registerTip"
                        place="top"
                        effect="solid"
                      >
                        Tooltip for the register button
                      </ReactTooltip>
                    </h1>
                  )}
                </td>
              )}

              {fact.financialStatementFact.map((data) => (
                <td key={data.id} className="px-4 py-3 text-sm">
                  {data.amount.toLocaleString()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
