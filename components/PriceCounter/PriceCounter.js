import React from "react";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

export default function PriceCounter({ isRising, amount }) {
  return (
    <div className="flex">
      {isRising ? (
        <>
          <BsFillCaretUpFill color="#48bb78" size="20" />
          <p className="text-green-500 ml-2"> {amount} %</p>
        </>
      ) : (
        <>
          <BsFillCaretDownFill color="red" size="20" />
          <p className="text-red-600 ml-2">{amount} %</p>
        </>
      )}
    </div>
  );
}
