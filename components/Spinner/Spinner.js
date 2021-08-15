import React from "react";

function Spinner() {
  return (
    <div className="flex justify-center	h-screen items-center">
      <div
        className="border border-red-100 rounded-full h-44 w-44 animate-spin"
        style={{
          borderTop: "0.22rem solid #2563EB",
          borderColor: "#7C3AED",
        }}
      ></div>
      <div className="absolute">Loading...</div>
    </div>
  );
}

export default Spinner;
