import Layout from "../components/layout";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import MicroChart from "../components/charts/MicroChart";
import SearchBar from "../components/searchbar";
import prisma from "../prisma/client";

export async function getServerSideProps({ params }) {
  // Fetch data from external API
  // const data = await fetch(
  //   `http://localhost:8000/company/?slug=${params.slug}`
  // );
  const companies = await prisma.company.findMany();

  return {
    props: { companies },
  };
}

export default function Home({ companies }) {
  // company.setCurrentCompany({ anuj: "A" });
  const { theme } = useTheme();
  const bg = theme === "light" ? "#4C1D95" : "#111827";
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Layout showSearch={false}>
      <section className="bg-purple-900 dark:bg-gray-900 py-10 banner">
        <div className="xl:container mx-auto">
          <h1 className="md:max-w-4xl text-white text-4xl md:text-7xl px-3 md:px-2 text-center font-bold mx-auto mt-9">
            The easiest way to buy and sell cryptocurrency
          </h1>
          <p className="md:max-w-3xl px-3 md:px-2 text-center text-white mx-auto mt-6">
            If the image has no dimensions or intrinsic ratio, rule 4 applies,
            and we use the background area's dimension.
          </p>
          <div className="flex justify-center mt-6">
            <SearchBar
              bg={theme === "light" ? "#F3F4F6" : "#2d3748"}
              borderRad={"1.5em"}
              width={"md:w-60 lg:w-120"}
              placeholder={"Search for a Company..."}
              color={theme === "light" ? "#000" : "#fff"}
              height="50px"
              companies={companies}
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

        <table className="table-auto w-full">
          <thead>
            <tr className="text-gray-500 ">
              <th className="w-1/4 py-3 px-3 text-left">Index</th>
              <th className="w-1/4 py-3 px-3 text-center">Points</th>
              <th className="w-1/4 py-3 px-3 text-center">24hr Change</th>
              <th className="w-1/2 py-3 px-3 text-right">Market</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-200 dark:hover:bg-gray-900 transition duration-500 ease-in-out">
              <td className="py-3 px-3 text-xl">Nepse</td>
              <td className="py-3 px-3 text-xl text-center">2,843.00</td>
              <td className="py-3 px-3 text-xl text-center text-gray-500">
                +0.68 %
              </td>
              <td className="text-xl text-right">
                <MicroChart />
              </td>
            </tr>
            <tr className="hover:bg-gray-200 dark:hover:bg-gray-900 transition duration-500 ease-in-out">
              <td className="py-3 px-3 text-xl">Development Bank</td>
              <td className="py-3 px-3 text-xl text-center">1,800.00</td>
              <td className="py-3 px-3 text-xl text-center text-gray-500">
                +1.2 %
              </td>
              <td className="text-xl text-right">
                <MicroChart />
              </td>
            </tr>
            <tr className="hover:bg-gray-200 dark:hover:bg-gray-900 transition duration-500 ease-in-out">
              <td className="py-3 px-3 text-xl">Finance</td>
              <td className="py-3 px-3 text-xl text-center">2,300.00</td>
              <td className="py-3 px-3 text-xl text-center text-gray-500">
                -2.3 %
              </td>
              <td className="text-xl text-right">
                <MicroChart />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </Layout>
  );
}
