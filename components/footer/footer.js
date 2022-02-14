import React from 'react';
import { FacebookIcon, InstagramIcon, TwitterIcon } from '../../utils/icons';

export default function Footer() {
  return (
    <section className="bg-blue-900 dark:bg-zinc-900/60 row-span-auto mt-4 pt-12 pb-5">
      <div className="flex items-center justify-center gap-4">
        <FacebookIcon customClass="fill-current text-white dark:text-white" height="30" width="30" />

        <InstagramIcon customClass="fill-current text-white dark:text-white" height="30" width="30" />
        <TwitterIcon customClass="fill-current text-white dark:text-white" height="30" width="30" />
      </div>
      <div className="flex items-center justify-center mt-5 gap-4 text-xs">
        <p className="text-white">Info</p>
        <p className="text-white">Support</p>
        <p className="text-white">Marketing</p>
      </div>
      <div className="flex items-center justify-center pt-2 gap-4 text-sm">
        <p className="text-white">Terms of Use</p>
        <p className="text-white">Privacy Policy</p>
      </div>

      <div className="flex items-center justify-center mt-5 gap-4 text-sm">
        <p className="text-gray-400">© {new Date().getFullYear()} Copyright</p>
      </div>
    </section>
  );
}
