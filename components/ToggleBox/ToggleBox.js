import React from 'react';

function ToggleBox({ labelOnShow, labelOnHide, handleChange, showGraph }) {
  return (
    <div className="flex flex-col items-center">
      <label htmlFor="toggleB" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            id="toggleB"
            className="sr-only"
            onChange={(e) => handleChange()}
          />
          <div className="block bg-gray-700 dark:bg-gray-600 w-14 h-8 rounded-full"></div>
          <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
        </div>
      </label>
      <div className="ml-3 text-gray-900 dark:text-gray-100 text-xs mt-1">
        {showGraph ? labelOnShow : labelOnHide}
      </div>
    </div>
  );
}

export default ToggleBox;
