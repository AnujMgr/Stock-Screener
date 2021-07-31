import React, { useEffect, useState } from "react";
import DataTable from "../../components/dataTable";
import Layout from "../../components/layout";

function Screener() {
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return (
    <Layout>
      <section className="xl:container mx-3 xl:mx-auto mt-8 bg-white dark:bg-gray-900 p-3 shadow-md rounded-lg ">
        <h1 className="text-lg font-bold mb-3">Screener</h1>

        <DataTable />
      </section>
    </Layout>
  );
}

export default Screener;
