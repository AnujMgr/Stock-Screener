import React from "react";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

export default function PriceCounter({ isRising, amount, rate }) {
  return (
    <div className="flex">
      {isRising ? (
        <>
          <p className="text-green-500 mr-2">
            + {amount} (+ {rate} %)
          </p>
          <BsFillCaretUpFill color="#48bb78" size="20" />
        </>
      ) : (
        <>
          <p className="text-red-600 mr-2">
            {" "}
            {amount} ({rate} %)
          </p>
          <BsFillCaretDownFill color="red" size="20" />
        </>
      )}
    </div>
  );
}
