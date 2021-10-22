import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function FinancialsHeader({ company, slug, active }) {
  const router = useRouter();

  return (
    <div>
      <section className="xl:container mx-3 xl:mx-auto bg-white dark:bg-gray-900 mt-8 shadow rounded-t-lg">
        <div className="flex border-b border-gray-200 dark:border-gray-800">
          <Link
            href={`/company/[slug]/financial-overview`}
            as={`/company/${slug}/financial-overview`}
          >
            <button
              className={`${
                active == 0
                  ? "bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 text-white dark:text-white hover:text-white transition duration-500"
                  : "bg-white dark:bg-gray-900 hover:bg-blue-800 dark:hover:bg-blue-900 text-dark dark:text-white hover:text-white transition duration-500"
              }  font-bold py-4 px-4 rounded-tl-lg border-r border-gray-200 dark:border-gray-800`}
            >
              Overview
            </button>
          </Link>

          <button
            onClick={(e) => {
              router.push({
                pathname: `/company/${slug}/financial-statement`,
                query: {
                  statementType: company.profitLossSlug,
                },
              });
            }}
            className={`${
              active == company.profitLossSlug
                ? "bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 text-white dark:text-white hover:text-white transition duration-500"
                : "bg-white dark:bg-gray-900 hover:bg-blue-800 dark:hover:bg-blue-900 text-dark dark:text-white hover:text-white transition duration-500"
            }  font-bold py-4 px-4 border-r border-gray-200 dark:border-gray-800 `}
          >
            Income Statement
          </button>

          <button
            onClick={(e) => {
              router.push({
                pathname: `/company/${slug}/financial-statement`,
                query: {
                  statementType: company.balanceSheetSlug,
                },
              });
            }}
            className={`${
              active == company.balanceSheetSlug
                ? "bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 text-white dark:text-white hover:text-white transition duration-500"
                : "bg-white dark:bg-gray-900 hover:bg-blue-800 dark:hover:bg-blue-900 text-dark dark:text-white hover:text-white transition duration-500"
            }  font-bold py-4 px-4 border-r border-gray-200 dark:border-gray-800 `}
          >
            Balance Sheet
          </button>

          <button
            onClick={(e) => {
              router.push({
                pathname: `/company/${slug}/financial-statement`,
                query: {
                  statementType: company.balanceSheetSlug,
                },
              });
            }}
            className={`${
              active == 4
                ? "bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 text-white dark:text-white hover:text-white transition duration-500"
                : "bg-white dark:bg-gray-900 hover:bg-blue-800 dark:hover:bg-blue-900 text-dark dark:text-white hover:text-white transition duration-500"
            }  font-bold py-4 px-4 border-r border-gray-200 dark:border-gray-800 `}
          >
            Financial Highlights
          </button>

          <button
            onClick={(e) => {
              router.push({
                pathname: `/company/${slug}/statistics`,
                query: {
                  statementType: company.companyRatioSlug,
                },
              });
            }}
            className={`${
              active == company.companyRatioSlug
                ? "bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 text-white dark:text-white hover:text-white transition duration-500"
                : "bg-white dark:bg-gray-900 hover:bg-blue-800 dark:hover:bg-blue-900 text-dark dark:text-white hover:text-white transition duration-500"
            }  font-bold py-4 px-4 border-r border-gray-200 dark:border-gray-800 `}
          >
            Ratio Charts
          </button>
        </div>
      </section>
    </div>
  );
}
