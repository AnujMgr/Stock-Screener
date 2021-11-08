import React from "react";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

export default function PriceCounter({ isRising, amount, rate }) {
  return (
    <>
      {isRising ? (
        <div className="flex">
          <p className="text-green-500  mr-2">
            + {amount} (+ {rate} %)
          </p>
          <BsFillCaretUpFill
            className="animate-ping-1 fill-current text-green-500"
            size="20"
          />
        </div>
      ) : (
        <div className="flex">
          <p className="text-red-800 dark:text-gray-50 mr-2">
            {" "}
            {amount} ({rate} %)
          </p>
          <BsFillCaretDownFill
            className="animate-ping-1"
            color="red"
            size="20"
          />
        </div>
      )}
    </>
  );
}
