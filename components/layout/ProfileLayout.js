import Image from 'next/image';
import React from 'react';
import Layout from '.';
import { useAuth } from '../../lib/contexts/AuthContext';
import { CameraIcon } from '../../utils/icons';
import ProfilePageNavbar from '../navbar/ProfilePageNavbar';

function ProfileLayout({ children, title }) {
  const [state] = useAuth();
  const { user } = state;
  const inputRef = React.useRef(null);

  return (
    <Layout showSearch={true} showSymbol={true} searchBarWidth={'lg:w-10/12'} title={title}>
      <ProfilePageNavbar />
      <section className="xl:container mt-5 mx-1 md:mx-3 xl:mx-auto px-2 py-2">
        <div className="shadow bg-white dark:bg-gray-900 rounded-md text-center py-4">
          <div className="w-full flex mx-auto justify-center">
            <div className="group relative cursor-pointer" onClick={(e) => inputRef.current.click()}>
              <UserProfilePic />
              <div>
                <div
                  className="md:opacity-0 md:group-hover:opacity-100 transition-opacity ease-out delay-100 
                  absolute top-0 left-0 md:bg-black/30 rounded-full"
                  style={{ height: '120px', width: '120px' }}
                />
                <span className="hidden absolute top-14	right-0 left-0 group-hover:block text-white">
                  Update Profile
                </span>
                <div className="absolute bottom-2 right-1.5">
                  <CameraIcon width={24} height={24} customClass={'fill-gray-800 dark:fill-gray-400'} />
                </div>
              </div>
            </div>
            <input ref={inputRef} type="file" className="hidden" />
          </div>
          <h1 className="text-xl select-none">{user.name}</h1>

          <p className="text-xs mt-1">Joined At 2020</p>
        </div>
      </section>
      {children}
    </Layout>
  );
}

const UserProfilePic = () => {
  const myLoader = ({ src, width, quality }) => {
    return `https://picsum.photos/id/1005/400/400?w=${width}&q=${quality || 75}`;
  };
  return (
    // <figure className="pb-1 px-8">
    <Image
      className="rounded-full object-cover"
      src={'/'}
      loader={myLoader}
      width="120px"
      height="120px"
      layout="intrinsic"
      alt="Profile Picture"
    />
    // </figure>
  );
};

export default ProfileLayout;
