import React, { useEffect, useRef, useState } from 'react';
import { BookMarkIcon, LogoutIcon, ProfileIcon } from '../../utils/icons';
import Image from 'next/image';
import Link from 'next/link';

function UserProfile({ user, logOut }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    function handler(event) {
      if (!ref.current?.contains(event.target)) {
        setOpen(false);
      }
    }
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  const myLoader = ({ src, width, quality }) => {
    return `https://picsum.photos/id/1005/200/200?w=${width}&q=${quality || 75}`;
  };

  return (
    <div ref={ref} className="relative ">
      <div
        className="flex items-center cursor-pointer gap-3 rounded-full border-2 
        border-gray-100 dark:border-gray-300 overflow-hidden shadow-md"
        onClick={(e) => setOpen(!open)}
      >
        <Image src={'/'} loader={myLoader} width={40} height={40} alt="Profile Picture" />
      </div>
      {open ? <ProfileDropdown user={user} logOut={logOut} /> : null}
    </div>
  );

  function ProfileDropdown({ user, logOut }) {
    return (
      <div className="z-50 absolute top-12 right-0 border-t border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 w-60 py-2 shadow-lg">
        <Link href={'/profile'} as={'/profile'}>
          <div className="flex items-center px-3 cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-100">
            <div>
              <div
                className="flex items-center cursor-pointer gap-3 rounded-full border-2 border-gray-100 dark:border-gray-300 overflow-hidden"
                onClick={(e) => setOpen(!open)}
              >
                <Image src={'/'} loader={myLoader} width={50} height={50} alt="Profile Picture" />
              </div>
            </div>
            <div className="px-3 py-2">
              <h1 className=" font-semibold">{user.name}</h1>
              <p className="text-xs">{user.email}</p>
            </div>
          </div>
        </Link>

        <div className="border-b mx-2 my-2 dark:border-gray-500 border-gray-300"></div>

        <Link href={'/profile'} as={'/profile'}>
          <div className="flex gap-3 items-center py-2 dark:hover:bg-gray-700 hover:bg-gray-100 px-3 cursor-pointer">
            <ProfileIcon customClass="fill-current dark:text-white" height="24" width="24" />
            <span>Profile</span>
          </div>
        </Link>

        <Link href={'/profile/watchlist'} as={'/profile/watchlist'}>
          <div className="flex gap-3 items-center py-2 dark:hover:bg-gray-700 hover:bg-gray-100 px-3 cursor-pointer">
            <BookMarkIcon customClass="fill-current dark:text-white" height="20" width="20" />
            <h1 className="">Watchlist</h1>
          </div>
        </Link>

        <div className="border-b mx-2 my-2 dark:border-gray-500 border-gray-300"></div>

        <div
          onClick={(e) => logOut()}
          className="flex gap-3 items-center py-2 dark:hover:bg-gray-700 hover:bg-gray-100 px-3 cursor-pointer"
        >
          <LogoutIcon customClass="fill-current dark:text-white" height="20" width="20" />
          <h1>Logout</h1>
        </div>
      </div>
    );
  }
}

export default UserProfile;
