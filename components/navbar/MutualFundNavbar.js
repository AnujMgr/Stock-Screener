import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function MutualFundLayout() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="opacity-95 sticky top-0 shadow-md border-b-1 bg-white dark:bg-gray-700 z-30 grid border-t dark:border-gray-600">
      <div className="xl:container mx-auto flex items-center overflow-x-auto custom-scroll no-scroll w-full">
        <SecondaryNavLink
          isActive={router.asPath === `/company/${slug}`}
          path={`/company/[slug]`}
          pathAs={`/company/${slug}`}
          name={'Summary'}
        />
        <SecondaryNavLink isActive={false} path={`/`} pathAs={`/`} name={'Technicals'} />

        <SecondaryNavLink
          isActive={
            router.asPath.includes(`/company/${slug}/financial-overview`) ||
            router.asPath.includes(`/company/${slug}/financial-statement`) ||
            router.asPath.includes(`/company/${slug}/statistics`)
          }
          path={`/company/[slug]/financial-overview`}
          pathAs={`/company/${slug}/financial-overview`}
          name={'Financials'}
        />

        <SecondaryNavLink
          isActive={router.asPath.includes(`/company/${slug}/peer-comparision`)}
          path={`/company/[slug]/peer-comparision`}
          pathAs={`/company/${slug}/peer-comparision`}
          name={'Peer Comparison'}
        />
      </div>
    </div>
  );
}

function SecondaryNavLink({ isActive, path, pathAs, name }) {
  return (
    <div
      className={`dark:text-white text-gray-900 px-3 py-2 hover:border-indigo-700 dark:hover:border-gray-300 transition duration-500 ease-in-out border-transparent border-b-2 flex-grow-0 inline-flex items-center flex-none
          ${isActive ? 'border-indigo-700 dark:border-gray-300' : null}
          `}
    >
      <Link href={path} as={pathAs}>
        {name}
      </Link>
    </div>
  );
}

export default MutualFundLayout;
