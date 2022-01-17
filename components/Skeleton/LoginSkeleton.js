import React from 'react';
import Layout from '../layout';

function LoginSkeleton() {
  return (
    <Layout>
      <section className="xl:container mx-auto ">
        <div className="p-3 border border-blue-300 dark:border-gray-700 shadow rounded-md max-w-md mx-auto my-10 py-10 bg-white dark:bg-gray-900">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-10 bg-gray-200 rounded w-36 mx-auto my-5"></div>
              <div className="h-9 bg-gray-200 rounded max-w-sm mx-auto"></div>
              <div className="h-9 bg-gray-200 rounded max-w-sm mx-auto"></div>
              <div className="h-9 bg-gray-200 rounded max-w-sm mx-auto"></div>
              <div className="h-5 bg-gray-200 rounded w-36 mx-auto my-10"></div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default LoginSkeleton;
