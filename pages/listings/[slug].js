import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Layout from '../../components/layout';
import SelectWithSearch from '../../components/SelectWithSearch';
import SortableTable from '../../components/SortableTable';
import prisma from '../../prisma/client';

export async function getStaticProps({ params }) {
  const industries = await prisma.industry.findMany({});
  const dataList = [];
  const columns = [];

  const currentIndustry = await prisma.industry.findFirst({
    where: {
      slug: params.slug,
    },
  });
  const companies = await prisma.company.findMany({
    where: {
      industryId: currentIndustry.id,
    },
  });

  companies.map((company) => {
    dataList.push({
      company: company.name,
    });
  });

  return {
    props: { companies, industries, dataList, columns, currentIndustry },
    revalidate: 10, // In seconds
  };
}

export async function getStaticPaths() {
  const industries = await prisma.industry.findMany({});
  const paths = [];

  industries.map((industry) => {
    paths.push({
      params: {
        slug: industry.slug,
      },
    });
  });

  return {
    paths: paths,
    fallback: false,
  };
}

function Listing({ industries, dataList, currentIndustry }) {
  const router = useRouter();
  const [industry, setIndustry] = useState(
    currentIndustry ? { value: currentIndustry.slug, label: currentIndustry.name } : '',
  );

  const columns = [
    {
      Header: 'Company',
      accessor: 'company',
      className: 'table-title',
    },
    {
      Header: 'Price',
      accessor: 'Price',
    },
  ];
  const industryOptions = [];

  industries.map((industry) => {
    industryOptions.push({
      value: industry.slug,
      label: industry.name,
    });
  });

  return (
    <Layout showSearch={true} showSymbol={true} title={'Listed Companies'}>
      <section className="xl:container mx-3 xl:mx-auto mt-8 bg-white dark:bg-gray-900 p-3 shadow rounded-lg">
        <h1 className="font-bold text-xl mt-2 mb-4">Listed Companies</h1>

        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-6 mb-5">
            <SelectWithSearch
              selectedValue={industry}
              label="Industries"
              name={'Industry'}
              options={industryOptions}
              placeholder={'Select Industries...'}
              handleChange={(e) => {
                setIndustry(e);
                router.push({
                  pathname: `/listings/${e.value}`,
                });
              }}
            />
          </div>
        </div>

        <SortableTable columns={columns} data={dataList} />
      </section>
    </Layout>
  );
}

export default Listing;
