import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import MicroChart from "../components/charts/MicroChart";
import SearchBar from "../components/searchbar";
import Link from "next/link";

export default function Home() {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

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
            and we use the background area&apos;s dimension.
          </p>

          <div className="flex justify-center mt-6 w-full">
            <SearchBar showSymbol={true} />
          </div>
          <div className="xl:container mx-auto flex items-center flex-wrap text-center justify-center gap-3 mt-4 px-4">
            <h1 className="text-white ">Trending Stocks:</h1>

            <Link href={`/company/nabil`} as={`/company/nabil`} passHref>
              <button className="p-2 bg-indigo-700 dark:bg-gray-800 rounded-sm text-white text-xs hover:bg-blue-500 dark:hover:bg-gray-600 transition duration-500 ease-in-out whitespace-no-wrap">
                Nabil Bank
              </button>
            </Link>
            <Link href={`/company/laxmi`} as={`/company/laxmi`} passHref>
              <button className="p-2 bg-indigo-700 dark:bg-gray-800 rounded-sm text-white text-xs hover:bg-blue-500 dark:hover:bg-gray-600 transition duration-500 ease-in-out">
                Laxmi Bank
              </button>
            </Link>
            <Link
              href={`/company/nepal-bank`}
              as={`/company/nepal-bank`}
              passHref
            >
              <button className="p-2 bg-indigo-700 dark:bg-gray-800 rounded-sm text-white text-xs hover:bg-blue-500 dark:hover:bg-gray-600 transition duration-500 ease-in-out">
                Nepal Bank
              </button>
            </Link>
            <button className="p-2 bg-indigo-700 dark:bg-gray-800 rounded-sm text-white text-xs hover:bg-blue-500 dark:hover:bg-gray-600 transition duration-500 ease-in-out">
              Bank Of Kathmandu
            </button>
            <button className="p-2 bg-indigo-700 dark:bg-gray-800 rounded-sm text-white text-xs hover:bg-blue-500 dark:hover:bg-gray-600 transition duration-500 ease-in-out">
              Bank Of Kathmandu
            </button>
          </div>
        </div>
      </section>

      <svg
        className="fill-current text-purple-900 dark:text-gray-900"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 150"
      >
        <path
          fillOpacity="12"
          d="M0,0L60,21.3C120,43,240,85,360,90.7C480,96,600,64,720,69.3C840,75,960,117,1080,128C1200,139,1320,117,1380,106.7L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>

      <section className="xl:container mx-3 xl:mx-auto mt-8 rounded-lg text-gray-900 dark:text-gray-50">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-10">
          Market Trend
        </h1>

        <div className="grid">
          <div className="w-full overflow-x-auto custom-scroll custom-scroll-light dark:custom-scroll">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-sm font-semibold tracking-wide text-left text-gray-900 uppercase  dark:text-white ">
                  <th className="text-gray-500 py-2 px-3 text-left">Index</th>
                  <th className="text-gray-500 py-2 px-3 text-left">Points</th>
                  <th className="text-gray-500 py-2 px-3 text-left whitespace-nowrap">
                    <h1>24hr Change</h1>
                  </th>
                  <th className="text-gray-500 py-3 px-3 text-right">Market</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-700 ">
                <tr className="border-0 hover:bg-gray-200 dark:hover:bg-gray-900 transition duration-500 ease-in-out">
                  <td className="px-4 py-3 text-sm md:text-xl">Nepse</td>
                  <td className="py-2 px-3 text-sm md:text-xl">2,843.00</td>
                  <td className="py-2 px-3 text-sm md:text-xl">+1.2 %</td>
                  <td className="py-2 px-3 text-sm md:text-xl">
                    <div className="text-xl text-right">
                      <MicroChart />
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-200 dark:hover:bg-gray-900 transition duration-500 ease-in-out">
                  <td className="px-4 py-3 text-sm md:text-xl">
                    Development Bank
                  </td>
                  <td className="py-3 px-3 text-sm md:text-xl">2,312.00</td>
                  <td className="py-3 px-3 text-sm md:text-xl">+1.2 %</td>
                  <td className="py-3 px-3 text-sm md:text-xl">
                    <div className="text-xl text-right">
                      <MicroChart />
                    </div>
                  </td>
                </tr>

                <tr className="hover:bg-gray-200 dark:hover:bg-gray-900 transition duration-500 ease-in-out">
                  <td className="px-4 py-3 text-sm md:text-xl">Finance</td>
                  <td className="py-3 px-3 text-sm md:text-xl">2,111.00</td>
                  <td className="py-3 px-3 text-sm md:text-xl">+1.2 %</td>
                  <td className="py-3 px-3 text-xl">
                    <div className="text-xl text-right">
                      <MicroChart />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
