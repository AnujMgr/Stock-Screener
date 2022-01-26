import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function ProfilePageNavbar() {
  const router = useRouter();

  return (
    <div className="opacity-95 sticky top-0 shadow-md border-b-1 bg-white dark:bg-gray-700  z-30 grid border-t dark:border-gray-600">
      <div className="xl:container mx-auto flex items-center overflow-x-auto custom-scroll no-scroll w-full">
        <SecondaryNavLink
          isActive={router.asPath === `/profile`}
          path={`/profile`}
          pathAs={`/profile`}
          name={'Profile'}
        />

        <SecondaryNavLink
          isActive={router.asPath.includes(`/profile/portfolio`)}
          path={`/profile/portfolio`}
          pathAs={`/profile/portfolio`}
          name={'Portfolio'}
        />
        <SecondaryNavLink
          isActive={router.asPath.includes(`/profile/watchlist`)}
          path={`/profile/watchlist`}
          pathAs={`/profile/watchlist`}
          name={'WatchList'}
        />
        <SecondaryNavLink
          isActive={router.asPath.includes(`/profile/edit-information`)}
          path={`/profile/edit-information`}
          pathAs={`/profile/edit-information`}
          name={'Edit Information'}
        />
      </div>
    </div>
  );
}

function SecondaryNavLink({ isActive, path, pathAs, name }) {
  return (
    <Link href={path} as={pathAs} passHref>
      <div
        className={`cursor-pointer dark:text-white text-gray-900 px-3 py-3 hover:border-indigo-700 dark:hover:border-gray-300 transition duration-500 ease-in-out border-transparent border-b-2 flex-grow-0 inline-flex items-center flex-none
          ${isActive ? 'border-indigo-700 dark:border-gray-300' : null}
          `}
      >
        {name}
      </div>
    </Link>
  );
}

function MenuWithDropdown({ isActive, path, pathAs, name }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div
        className={`cursor-pointer dark:text-white text-gray-900 px-3 py-2 hover:border-indigo-700 dark:hover:border-gray-300 transition duration-500 ease-in-out border-transparent border-b-2 flex-grow-0 inline-flex items-center flex-none
          ${isActive ? 'border-indigo-700 dark:border-gray-300' : null}
          `}
      >
        {name}
      </div>
      <div className="absolute z-50">
        <Link href={path} as={pathAs} passHref>
          <div
            className={`cursor-pointer dark:text-white text-gray-900 px-3 py-2 hover:border-indigo-700 dark:hover:border-gray-300 transition duration-500 ease-in-out border-transparent border-b-2 flex-grow-0 inline-flex items-center flex-none
          ${isActive ? 'border-indigo-700 dark:border-gray-300' : null}
          `}
          >
            {name}
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ProfilePageNavbar;
