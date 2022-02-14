import React, { useState } from 'react';
import { CloseEye, OpenEye } from '../../utils/icons';

export default function PasswordField({ field, ...props }) {
  const [visiblePassword, setVisiblePassword] = useState(false);

  return (
    <div className="flex bg-gray-800 dark:bg-gray-800 items-center rounded overflow-hidden px-3">
      <input
        className=" bg-gray-800 flex-grow text-white dark:bg-gray-800 h-10 rounded-sm outline-none w-full text-md"
        type={!visiblePassword ? 'password' : 'text'}
        {...field}
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisiblePassword(!visiblePassword)}
        className="rounded-full hover:bg-gray-700 p-1 text-white"
      >
        {visiblePassword ? (
          <OpenEye customClass="fill-current text-gray-100" height="18" width="18" />
        ) : (
          <CloseEye customClass="fill-current text-gray-100" height="18" width="18" />
        )}
      </button>
    </div>
  );
}
