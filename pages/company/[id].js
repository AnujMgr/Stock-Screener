import React from "react";
import Layout from "../../components/layout";

export async function getStaticPaths() {
  const res = await fetch("http://localhost:8000/company");
  const companies = await res.json();

  const paths = companies.map((company) => ({
    params: { id: company.slug.toString() },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:8000/company/?slug=${params.id}`);
  const companyData = await res.json();

  // Pass post data to the page via props
  return { props: { companyData } };
}

export function Company({ companyData }) {
  const [company] = companyData;
  console.log(company);

  return (
    <Layout>
      <div className="xl:container mx-auto mt-8">
        <h1 className="text-2xl font-bold">{company.name}</h1>
        <div className="flex">
          <p className="mr-3">
            Symbol:{" "}
            <span className="bg-blue-700 px-2 py-1 font-bold">
              {company.symbol}
            </span>
          </p>
          <p>
            Sector:{" "}
            <span className="bg-blue-700 px-2 py-1 font-bold">
              {company.industry.name}
            </span>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Company;
