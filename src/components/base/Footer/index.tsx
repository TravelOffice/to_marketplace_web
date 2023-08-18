import React from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/images/logo/full-logo.svg';
import bgFooter from '@/assets/images/decore/bg-footer.svg';

export default function Footer() {
  return (
    <footer className="text-[#5E6282] relative mt-24">
      <img src={bgFooter} alt="" width={100} height={100} className="absolute bottom-0 right-0" />
      <div className="container mx-auto px-6 py-3 md:flex md:justify-between">
        <div className="flex flex-col col-6">
          <div className="flex flex-col gap-0.5">
            <Link to="/" className="mb-1">
              <img src={logo} alt="" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col col-6">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p className="font-extrabold">Company</p>
              <a href="/" className="py-2">About</a>
              <a href="/" className="py-2">Blog</a>
              <a href="/" className="py-2">Careers</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col col-6">
          <div className="flex flex-col">
            <p className="font-bold">Contact</p>
            <a href="/" className="py-2">Help/FAQ</a>
            <a href="/" className="py-2">Press</a>
            <a href="/" className="py-2">Affilates</a>
          </div>
        </div>
        <div className="flex flex-col col-6">
          <div className="flex flex-col">
            <p className="font-bold">More</p>
            <a href="/" className="py-2">Airbnb Luxe</a>
            <a href="/" className="py-2">HotelTonight</a>
            <a href="/" className="py-2">Airbnb for Work</a>
            <a href="/" className="py-2">Made possible by Hosts</a>
            <a href="/" className="py-2">Careers</a>
          </div>
        </div>
      </div>
      <p className="text-gray-500 text-center py-2 sm:py-0">© 2023 iTab™. All rights reserved.</p>
    </footer>
  );
}
