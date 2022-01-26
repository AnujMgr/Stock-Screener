import Link from 'next/link';
import React from 'react';
import SearchBar from '../components/searchbar';
import Layout from '../components/layout';
import Router from 'next/router';

export default function Custom404() {
  return (
    <Layout showSearch={true} showSymbol={true} title={'Page Not Found'} searchBarWidth={'lg:w-10/12'}>
      <section className="xl:container mx-3 xl:mx-auto mt-8 px-2 py-5 md:p-5 mb-3">
        <h1 className="text-9xl mt-8 text-center dark:text-red-400 text-indigo-400">404</h1>
        <h1 className="text-3xl text-center mb-5 text-gray-700 dark:text-gray-50">Sorry, Page Not Found</h1>
        <div className="md:flex justify-center w-full">
          <SearchBar
            borderRadiusBottom={'rounded-b-md'}
            borderRadiusTop={'rounded-t-md'}
            backgroundColor={'bg-gray-300 dark:bg-gray-700'}
            padding={'py-0'}
            itemHoverBackground={'hover:bg-gray-300 dark:hover:bg-gray-700'}
            width={'w-full sm:w-3/4 md:w-96 mx-auto'}
          />
        </div>
        <div className="flex gap-2 text-center mt-8 justify-center">
          <button className="p-2 bg-blue-800 text-white shadow-md rounded-md">
            <Link href="/">Home</Link>
          </button>
          <button onClick={(e) => Router.back()} className="p-2 bg-gray-900 text-white shadow-md rounded-md">
            <Link href="/" className="p-2 bg-blue-600">
              Go Back
            </Link>
          </button>
        </div>
      </section>
    </Layout>
  );
}
