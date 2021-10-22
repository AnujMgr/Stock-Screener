import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function SecondaryNavbar() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="hidden opacity-95 md:block sticky top-0 shadow-md border-b-1 bg-white dark:bg-gray-700  dark:border-gray-600 z-50">
      <div className="xl:container mx-auto flex items-center px-4">
        <div className="dark:text-white text-gray-900 px-3 py-1 hover:border-indigo-700 dark:hover:border-gray-50 transition duration-500 ease-in-out border-transparent border-b-2 flex-grow-0 inline-flex items-center ">
          <Link href={`/company/[slug]`} as={`/company/${slug}`}>
            Summary
          </Link>
        </div>
        <div className="dark:text-white text-gray-900 px-3 py-1 hover:border-indigo-700 dark:hover:border-gray-50 transition duration-500 ease-in-out border-transparent border-b-2 flex-grow-0 inline-flex items-center ">
          <Link href={`/company/[slug]/charts`} as={`/company/${slug}/charts`}>
            Technicals
          </Link>
        </div>
        <div className="dark:text-white text-gray-900 px-3 py-1 hover:border-indigo-700 dark:hover:border-gray-50 transition duration-500 ease-in-out border-transparent border-b-2 flex-grow-0 inline-flex items-center ">
          <Link href={`/company/[slug]/charts`} as={`/company/${slug}/charts`}>
            Statistics
          </Link>
        </div>
        <div className="dark:text-white text-gray-900 px-3 py-1 hover:border-indigo-700 dark:hover:border-gray-50 transition duration-500 ease-in-out border-transparent border-b-2 flex-grow-0 inline-flex items-center ">
          <Link
            href={`/company/[slug]/financial-overview`}
            as={`/company/${slug}/financial-overview`}
          >
            Financials
          </Link>
        </div>
        {/* <div className="dark:text-white text-gray-900 px-3 py-1 hover:border-indigo-700 dark:hover:border-gray-50 transition duration-500 ease-in-out border-transparent border-b-2 flex-grow-0 inline-flex items-center ">
          <Link href={`/company/${slug}/profitAndLoss`}>Profit And Loss</Link>
        </div> */}
      </div>
    </div>
  );
}

export default SecondaryNavbar;
