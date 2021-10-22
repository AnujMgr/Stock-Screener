import React, { useState } from "react";
import Chevron from "./Chevron";

export default function Accordion({ fact }) {
  const [active, setActive] = useState(false);
  return (
    <>
      <div className="flex cursor-pointer" onClick={(e) => setActive(!active)}>
        <div className="flex flex-1 p-2 mb-1">
          <Chevron
            className={
              active
                ? "transform rotate-90 fill-current text-gray-400"
                : "transform rotate-0 fill-current text-gray-400"
            }
            width={10}
            fill={"#777"}
          />
          <h1 className="ml-2 select-none">{fact.name}</h1>
        </div>
        {fact.financialStatementFact.length > 0 ? (
          fact.financialStatementFact.map((data) => (
            <div key={data.id} className="flex-1 p-2 mb-1">
              {data.amount.toLocaleString()} {data.quarter}
            </div>
          ))
        ) : (
          <div className="flex-1 p-2 mb-1">0</div>
        )}
      </div>

      {active ? (
        fact.children.length > 0 ? (
          <div className="flex ">
            <div className="flex-1 p-2 mb-1">
              {fact.children.map((data) => {
                return (
                  <h1 className=" ml-6" key={data.id}>
                    {data.name}
                  </h1>
                );
              })}
            </div>
            {fact.financialStatementFact.length > 0 ? (
              fact.children.map((data) => {
                return data.financialStatementFact.map((data) => (
                  <div key={data.id} className="flex-1 p-2 mb-1">
                    {data.amount.toLocaleString()} {data.quarter}
                  </div>
                ));
              })
            ) : (
              <div className="flex-1 p-2 mb-1">0</div>
            )}
          </div>
        ) : null
      ) : null}
    </>
  );
}
