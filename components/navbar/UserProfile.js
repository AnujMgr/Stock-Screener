import React, { useEffect, useRef, useState } from "react";
import { LogoutIcon, ProfileIcon } from "../../utils/icons";
import Image from "next/image";

function UserProfile({ user, logOut }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    function handler(event) {
      if (!ref.current?.contains(event.target)) {
        setOpen(false);
      }
    }
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  return (
    <div ref={ref} className="relative ">
      <div
        className="flex items-center cursor-pointer gap-3"
        onClick={(e) => setOpen(!open)}
      >
        <Image
          className="h-10 w-10 rounded-full border-2 border-gradient-to-r from-red-500 via-purple-500 to-pink-500 shadow-md"
          src="https://picsum.photos/200/200"
          alt="Profile Picture"
        />
        {/* <img className="h-10 w-10 rounded-full border-2 border-gradient-to-r from-red-500 via-purple-500 to-pink-500 shadow-md" /> */}
      </div>
      {open ? (
        <div className="z-50 absolute top-12 right-0 border-t border-gray-200 bg-white dark:bg-gray-800 w-60 py-2 shadow-lg">
          <div className="px-3 py-2 cursor-pointer">
            <h1 className=" font-semibold">{user.name}</h1>
            <p className="text-xs">{user.email}</p>
          </div>
          <div className="border-b mx-2 my-2 dark:border-gray-500 border-gray-300"></div>

          <div className="flex gap-3 items-center py-2 dark:hover:bg-gray-700 hover:bg-gray-100 px-3 cursor-pointer">
            <ProfileIcon
              customClass="fill-current dark:text-white"
              height="20"
              width="20"
            />
            <h1>Profile</h1>
          </div>

          <div className="border-b mx-2 my-2 dark:border-gray-500 border-gray-300"></div>

          <div
            onClick={(e) => logOut()}
            className="flex gap-3 items-center py-2 dark:hover:bg-gray-700 hover:bg-gray-100 px-3 cursor-pointer"
          >
            <LogoutIcon
              customClass="fill-current dark:text-white"
              height="20"
              width="20"
            />
            <h1>Logout</h1>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UserProfile;
