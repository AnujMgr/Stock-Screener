import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ToggleTheme from '../ToggleTheme';
import SearchBar from '../searchbar';
import { useRouter } from 'next/router';
import { CloseIcon, HamburgerIcon, SearchIcon } from '../../utils/icons';
import { useAuth } from '../../lib/contexts/AuthContext';
import UserProfile from './UserProfile';
import { useMediaQuery } from 'react-responsive';

function Navbar({ showSearch, showSymbol, searchBarWidth }) {
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isOpen, setOpen] = useState(true);
  const router = useRouter();
  const [state, dispatch] = useAuth();
  const { user } = state;

  const logOut = () => {
    fetch('/api/signOut', {
      method: 'POST',
      credentials: 'include',
    }).then(() => {
      dispatch({
        type: 'removeAuthDetails',
      });
      return router.push('/login');
    });
  };

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 992px)' });

  function handleOpen({ value }) {
    setOpen(value);
  }

  useEffect(() => {
    setMounted(true);
  });

  if (!mounted) return null;

  return (
    <>
      {!isTabletOrMobile ? (
        <div className="shadow-sm bg-white dark:bg-gray-700 border-fuchsia-100 border-gray-100 dark:border-gray-600">
          <div className="xl:container mx-auto flex items-center px-4">
            <h1 className="text-2xl text-primary dark:text-white lg:mr-6">
              <Link href="/">Analytics</Link>
            </h1>
            {/* Left Nav Items */}
            <div className="flex-grow px-2">
              <div className="flex justify-between">
                <div className="pt-2 flex-1">
                  {showSearch ? (
                    <SearchBar
                      borderRadiusBottom={'rounded-b-md'}
                      borderRadiusTop={'rounded-t-md'}
                      width={`md:w-full sm:w-3/4 mr-auto ${searchBarWidth ? searchBarWidth : 'w-full'}`}
                      backgroundColor={'bg-gray-200 dark:bg-gray-800'}
                      padding={'py-0'}
                      itemHoverBackground={'hover:bg-gray-300 dark:hover:bg-gray-700'}
                      showSymbol={showSymbol}
                    />
                  ) : null}
                </div>

                <div className="flex-1 text-right">
                  <NavbarLink name="Home" isActive={router.asPath === '/'} path={'/'} pathAs={'/'} />
                  <NavbarLink
                    name="Screener"
                    isActive={router.pathname.startsWith('/screener')}
                    path={'/screener'}
                    pathAs={'/screener'}
                  />
                  <NavbarLink
                    name="Listing"
                    isActive={false}
                    path={'/listings/commercial-banks'}
                    pathAs={'/listings/commercial-banks'}
                  />
                  <NavbarLink name="Market" isActive={false} path={'/'} pathAs={'/'} />
                </div>
              </div>
            </div>
            {/* Right Nav Items */}
            <div className="flex items-center gap-4">
              {user && Object.keys(user).length !== 0 ? (
                <UserProfile user={user} logOut={logOut} />
              ) : (
                <div
                  className="p-4 dark:text-white text-gray-900 hover:border-indigo-700 dark:hover:border-gray-300 
                transition duration-500 ease-in-out border-transparent border-b-2 flex-grow-0 inline-flex items-center"
                >
                  <Link href="/login">Login</Link>
                </div>
              )}
              <ToggleTheme />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="shadow-sm border-b-1 bg-white dark:bg-gray-700 border-fuchsia-100 border-b border-gray-100 dark:border-gray-600">
            <div className="xl:container mx-auto flex justify-between items-center px-4">
              <div>
                <h1 className="text-2xl dark:text-white text-gray-900 mr-6">
                  <Link className="lg:block" href="/">
                    Analytics
                  </Link>
                </h1>
              </div>
              {/* Right Nav Items */}
              <div className="flex items-center gap-2 my-2">
                {hidden ? (
                  <button className="p-2 rounded" onClick={(e) => setHidden(false)}>
                    <SearchIcon height={24} width={24} customClass={'fill-current text-black dark:text-white'} />
                  </button>
                ) : (
                  <button className="rounded" onClick={(e) => setHidden(true)}>
                    <CloseIcon height={24} width={24} customClass={'fill-current text-black dark:text-white'} />
                  </button>
                )}
                <ToggleTheme />

                <HamburgerButton setOpen={handleOpen} />
              </div>
            </div>
            {!hidden ? (
              <div className="p-2">
                <SearchBar
                  borderRadiusBottom={'rounded-b-md'}
                  borderRadiusTop={'rounded-t-md'}
                  backgroundColor={'bg-gray-200 dark:bg-gray-800'}
                  padding={'py-0'}
                  itemHoverBackground={'hover:bg-gray-300 dark:hover:bg-gray-700'}
                  width={'w-full sm:w-3/4 mx-auto'}
                />
              </div>
            ) : null}
          </div>

          <SideBar isOpen={isOpen} setOpen={setOpen} user={user} logout={logOut} />
          {/* Overlay When Sidebar is Open */}
          {isOpen ? null : (
            <div
              onClick={(e) => setOpen(true)}
              className="bg-black h-screen w-screen z-max-1 fixed top-0 bottom-0 opacity-70 lg:hidden"
            />
          )}
        </>
      )}
    </>
  );
}

function SideBar({ user, logout, isOpen, setOpen }) {
  return (
    <div
      className={`bg-gray-50 dark:bg-gray-800 dark:border-gray-600 lg:hidden h-screen 
      w-full max-w-md fixed top-0 bottom-0 z-max-2 shadow-md transition-all duration-500 ease-in-out ${
        isOpen ? '-left-full' : 'left-0'
      }`}
    >
      <div className="xl:container mx-auto flex justify-between items-center px-4 border-b border-gray-300 dark:border-gray-500">
        <h1 className="text-2xl dark:text-white text-gray-900 my-3">
          <Link href={'/'} as={'/'}>
            Analytics
          </Link>
        </h1>
        <div className="flex gap-2">
          <ToggleTheme />

          <HamburgerButton setOpen={setOpen} />
        </div>
      </div>
      <div className="flex flex-col ">
        <SideBarNavLinks name={'Home'} path={'/'} pathAs={'/'} />
        <SideBarNavLinks name={'Screener'} path={'/screener'} pathAs={'/screener'} />
        <SideBarNavLinks name={'Listing'} path={'/'} pathAs={'/'} />
        <SideBarNavLinks name={'Market'} path={'/'} pathAs={'/'} />
        {user && Object.keys(user).length !== 0 ? (
          <div className="p-4 dark:text-white text-gray-900 border-transparent border-b-2 flex-grow-0 inline-flex items-center">
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className="p-4 dark:text-white text-gray-900 border-transparent border-b-2 flex-grow-0 inline-flex items-center">
            <Link href="/login">Login</Link>
          </div>
        )}
      </div>
    </div>
  );
}

const HamburgerButton = ({ setOpen }) => {
  return (
    <button
      onClick={(e) => setOpen(true)}
      className="lg:hidden block p-2 shadow-md rounded bg-blue-700 text-white dark:bg-gray-900 hover:bg-blue-600
   hover:text-white dark:hover:bg-gray-700 transition duration-500 ease-in-out"
    >
      <HamburgerIcon height={24} width={24} customClass={'fill-current text-white dark:text-white'} />
    </button>
  );
};

function SideBarNavLinks({ name, path, pathAs }) {
  return (
    <div className="p-4 dark:text-white text-gray-900  flex-grow-0 inline-flex items-center ">
      <Link className="dark:text-white text-gray-900" href={path} as={pathAs}>
        {name}
      </Link>
    </div>
  );
}

function NavbarLink({ name, isActive, path, pathAs }) {
  return (
    <Link href={path} as={pathAs} passHref>
      <div
        className={`
          cursor-pointer p-4 dark:text-white text-gray-900 dark:hover:border-gray-300 hover:border-indigo-700  
          transition duration-500 ease-in-out border-transparent border-b-2 flex-grow-0 inline-flex items-center
          ${isActive ? 'border-indigo-700 dark:border-gray-300' : ''}
        `}
      >
        {name}
      </div>
    </Link>
  );
}

export default Navbar;
