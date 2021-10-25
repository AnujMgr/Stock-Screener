import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import MicroChart from "../components/charts/MicroChart";
import SearchBar from "../components/searchbar";
import { useAppContext } from "../lib/contexts/State";

export default function Home() {
  const { theme } = useTheme();
  const bg = theme === "light" ? "#4C1D95" : "#111827";
  const [mounted, setMounted] = useState(false);
  const { companies } = useAppContext();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <section className="bg-purple-900 dark:bg-gray-900 py-10 banner">
        <div className="xl:container mx-auto">
          <h1 className="md:max-w-4xl text-white text-4xl md:text-7xl px-3 md:px-2 text-center font-bold mx-auto mt-9">
            The easiest way to buy and sell cryptocurrency
          </h1>
          <p className="md:max-w-3xl px-3 md:px-2 text-center text-white mx-auto mt-6">
            If the image has no dimensions or intrinsic ratio, rule 4 applies,
            and we use the background area's dimension.
          </p>
          <div className="flex justify-center mt-6 w-full">
            <SearchBar
              bg={theme === "light" ? "#F3F4F6" : "#2d3748"}
              borderRad={"1.5em"}
              width={"w-11/12 sm:w-96 md:w-120"}
              placeholder={"Search for a Company..."}
              color={theme === "light" ? "#000" : "#fff"}
              height="50px"
              companies={companies.getAllCompanies}
            />
          </div>
        </div>
      </section>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 150">
        <path
          fill={bg}
          fillOpacity="12"
          d="M0,0L60,21.3C120,43,240,85,360,90.7C480,96,600,64,720,69.3C840,75,960,117,1080,128C1200,139,1320,117,1380,106.7L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>

      <section className="xl:container mx-3 xl:mx-auto mt-8 p-3 rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-10">
          Market Trend
        </h1>

        <div className="grid grid-rows-3 gap-1">
          <div className="grid grid-cols-4">
            <h6 className="text-gray-500 py-3 px-3 text-left">Index</h6>
            <h6 className="text-gray-500 py-3 px-3 text-left">Points</h6>
            <h6 className="text-gray-500 py-3 px-3 text-left">24hr Change</h6>
            <h6 className="text-gray-500 py-3 px-3 text-right">Market</h6>
          </div>
          <div className="grid grid-cols-4 hover:bg-gray-200 dark:hover:bg-gray-900 transition duration-500 ease-in-out">
            <p className="py-3 px-3 text-xl">Nepse</p>
            <p className="py-3 px-3 text-xl">2,843.00</p>
            <p className="py-3 px-3 text-xl">+0.68 %</p>
            <div className="text-xl text-right">
              <MicroChart />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 hover:bg-gray-200 dark:hover:bg-gray-900 transition duration-500 ease-in-out">
            <div className="col-span-1">
              <p className="py-3 px-3 text-xl">Development Bank</p>
            </div>
            <p className="py-3 px-3 text-xl">1,800.00</p>
            <p className="py-3 px-3 text-xl">+1.2 %</p>
            <div className="text-xl text-right">
              <MicroChart />
            </div>
          </div>
          <div className="grid grid-cols-4 hover:bg-gray-200 dark:hover:bg-gray-900 transition duration-500 ease-in-out">
            <p className="py-3 px-3 text-xl">Finance</p>
            <p className="py-3 px-3 text-xl">2,300.00</p>
            <p className="py-3 px-3 text-xl">+4.2 %</p>
            <div className="text-xl text-right">
              <MicroChart />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
