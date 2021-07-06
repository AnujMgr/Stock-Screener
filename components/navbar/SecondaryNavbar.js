import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function SecondaryNavbar() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="hidden opacity-95 md:block sticky top-0 shadow-xl border-b-1 bg-white dark:bg-gray-800 border-fuchsia-100 border-b border-gray-100 dark:border-gray-600 z-50">
      <div className="xl:container mx-auto flex items-center px-4">
        <div className="px-3 py-1 hover:border-indigo-700 dark:hover:border-gray-50 transition duration-500 ease-in-out border-transparent border-b-2 flex-grow-0 inline-flex items-center ">
          <Link className="text-primary" href={`/company/${slug}`}>
            Company Info
          </Link>
        </div>
        <div className="px-3 py-1 hover:border-indigo-700 dark:hover:border-gray-50 transition duration-500 ease-in-out border-transparent border-b-2 flex-grow-0 inline-flex items-center ">
          <Link className="text-primary" href={`/company/${slug}/charts`}>
            Charts
          </Link>
        </div>
        <div className="px-3 py-1 hover:border-indigo-700 dark:hover:border-gray-50 transition duration-500 ease-in-out border-transparent border-b-2 flex-grow-0 inline-flex items-center ">
          <Link
            className="text-primary"
            href={`/company/${slug}/financialReports`}
          >
            Balance Sheet
          </Link>
        </div>
        <div className="px-3 py-1 hover:border-indigo-700 dark:hover:border-gray-50 transition duration-500 ease-in-out border-transparent border-b-2 flex-grow-0 inline-flex items-center ">
          <Link
            className="text-primary"
            href={`/company/${slug}/profitAndLoss`}
          >
            Profit And Loss
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SecondaryNavbar;
