import Link from "next/link";
import React from "react";

export default function FinancialsHeader({ slug, active }) {
  return (
    <div>
      <section className="xl:container mx-3 xl:mx-auto bg-white dark:bg-gray-900 mt-8 shadow rounded-t-lg">
        <div className="flex border-b border-gray-200 dark:border-gray-500">
          <Link href={`/company/${slug}/financial-overview`}>
            <button
              className={`${
                active === 1
                  ? "bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 text-white dark:text-white hover:text-white transition duration-500"
                  : "bg-white dark:bg-gray-900 hover:bg-blue-800 dark:hover:bg-blue-900 text-dark dark:text-white hover:text-white transition duration-500"
              }  font-bold py-4 px-4 rounded-tl-lg border-r border-gray-200 dark:border-gray-500`}
            >
              Overview
            </button>
          </Link>
          <Link href={`/company/${slug}/financial-income-statement`}>
            <button
              className={`${
                active === 2
                  ? "bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 text-white dark:text-white hover:text-white transition duration-500"
                  : "bg-white dark:bg-gray-900 hover:bg-blue-800 dark:hover:bg-blue-900 text-dark dark:text-white hover:text-white transition duration-500"
              }  font-bold py-4 px-4 border-r border-gray-200 dark:border-gray-500 `}
            >
              Income Statement
            </button>
          </Link>
          <Link href={`/company/${slug}/balance-sheet`}>
            <button
              className={`${
                active === 3
                  ? "bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 text-white dark:text-white hover:text-white transition duration-500"
                  : "bg-white dark:bg-gray-900 hover:bg-blue-800 dark:hover:bg-blue-900 text-dark dark:text-white hover:text-white transition duration-500"
              }  font-bold py-4 px-4 border-r border-gray-200 dark:border-gray-500 `}
            >
              Balance Sheet
            </button>
          </Link>
          <Link href={`/company/${slug}/cash-flow-statement`}>
            <button
              className={`${
                active === 4
                  ? "bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 text-white dark:text-white hover:text-white transition duration-500"
                  : "bg-white dark:bg-gray-900 hover:bg-blue-800 dark:hover:bg-blue-900 text-dark dark:text-white hover:text-white transition duration-500"
              }  font-bold py-4 px-4 border-r border-gray-200 dark:border-gray-500 `}
            >
              Cashflow
            </button>
          </Link>
          <Link href={`/company/${slug}/statistics`}>
            <button
              className={`${
                active === 5
                  ? "bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 text-white dark:text-white hover:text-white transition duration-500"
                  : "bg-white dark:bg-gray-900 hover:bg-blue-800 dark:hover:bg-blue-900 text-dark dark:text-white hover:text-white transition duration-500"
              }  font-bold py-4 px-4 border-r border-gray-200 dark:border-gray-500 `}
            >
              Statistics
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
