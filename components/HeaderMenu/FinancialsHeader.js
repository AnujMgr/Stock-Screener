import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import HeaderButton from "./HeaderButton";

const FinancialsHeader = ({ statements, slug, active }) => {
  const router = useRouter();

  const handleClick = (type) => {
    router.push({
      pathname: `/company/${slug}/financial-statement/${type}/qtrToqtr`,
    });
  };

  return (
    <div className="xl:container mx-0 md:mx-3 xl:mx-auto bg-white dark:bg-gray-900 mt-8 shadow rounded-none md:rounded-t-md">
      <div className="grid">
        <div className="overflow-x-auto flex border-b border-gray-200 dark:border-gray-800 no-scroll">
          <Link
            href={`/company/[slug]/financial-overview`}
            as={`/company/${slug}/financial-overview`}
            passHref
          >
            <button
              className={`${
                active == 0
                  ? "bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 text-white dark:text-white hover:text-white transition duration-500"
                  : "bg-white dark:bg-gray-900 hover:bg-blue-800 dark:hover:bg-blue-900 text-dark dark:text-white hover:text-white transition duration-500"
              }  font-bold py-4 px-4 rounded-none md:rounded-tl-lg border-r border-gray-200 dark:border-gray-800`}
            >
              Overview
            </button>
          </Link>

          <HeaderButton
            handleClick={(e) => handleClick("balance-sheet")}
            isActive={active == "balance-sheet"}
            title="Balance Sheet"
          />

          <HeaderButton
            handleClick={(e) => handleClick("profit-loss")}
            isActive={active == "profit-loss"}
            title="Income Statement"
          />

          <HeaderButton
            handleClick={(e) => handleClick("financial-highlights")}
            isActive={active == "financial-highlights"}
            title="Financial Highlights"
          />

          <HeaderButton
            handleClick={(e) => {
              router.push({
                pathname: `/company/${slug}/statistics`,
                query: {
                  statementType: statements.companyRatioId,
                  quarter: "Q4",
                },
              });
            }}
            isActive={active == statements.companyRatioId}
            title="Ratio Charts"
          />
        </div>
      </div>
    </div>
  );
};

export default FinancialsHeader;
