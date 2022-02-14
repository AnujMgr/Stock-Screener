import React from 'react';
import CustomLineChart from '../../components/charts/CustomLineChart';
import ProfileLayout from '../../components/layout/ProfileLayout';

export default function Portfolio() {
  return (
    <ProfileLayout showSearch={true} showSymbol={true} title={`Profile Page`}>
      <main className="xl:container mt-3 mx-1 md:mx-3 xl:mx-auto px-2">
        <div className="p-3 shadow bg-white dark:bg-gray-900 rounded-md">
          <h1 className="text-xl">Portfolio</h1>

          <CustomLineChart />
        </div>
      </main>
    </ProfileLayout>
  );
}
