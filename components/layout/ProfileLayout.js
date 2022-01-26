import Image from 'next/image';
import React from 'react';
import Layout from '.';
import { useAuth } from '../../lib/contexts/AuthContext';
import ProfilePageNavbar from '../navbar/ProfilePageNavbar';

function ProfileLayout({ children }) {
  const [state] = useAuth();
  const { user } = state;

  return (
    <Layout showSearch={true} showSymbol={true} searchBarWidth={'lg:w-10/12'}>
      <ProfilePageNavbar />
      <section className="xl:container mt-5 mx-1 md:mx-3 xl:mx-auto px-2 py-2">
        <div className="shadow bg-white dark:bg-gray-900 rounded-md text-center py-4">
          <UserProfilePic />
          <h1 className="text-xl pb-3">{user.name}</h1>
          <button className="bg-blue-900 mx-auto px-4 py-2 rounded-md hover:bg-blue-700 transition-background ease-in-out duration-500 text-white">
            Update Profile
          </button>
        </div>
      </section>
      {children}
    </Layout>
  );
}

const UserProfilePic = () => {
  const myLoader = ({ src, width, quality }) => {
    return `https://picsum.photos/id/1005/200/200?w=${width}&q=${quality || 75}`;
  };
  return (
    <figure className="pb-1 px-8 text-center">
      <Image
        className="rounded-full"
        src={'/'}
        loader={myLoader}
        width="120px"
        height="120px"
        layout="intrinsic"
        alt="Profile Picture"
      />
    </figure>
  );
};

export default ProfileLayout;
