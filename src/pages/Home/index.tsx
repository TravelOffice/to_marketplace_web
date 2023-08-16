import React from 'react';
import Layout from '@/components/Layout';
import '@/styles/HomePage.scss';
import Carousel2 from '@/components/Carousel2';
import FeaturedItem from '@/pages/Home/components/FeaturedItem';
import TopDestinationItem from '@/pages/Home/components/TopDestinationItem';
import image1 from '@/assets/images/decore/image1.png';

export default function HomePage() {
  return (
    <Layout className="home">
      {/*  Hero section */}
      <section className="relative hero-section">
        <div className="container mx-auto px-6 max-w-screen-xl py-8 flex items-center relative">
          <div className="sm:w-3/5 md:w-2/5">
            <div className="py-6">
              <h2 className="text-3xl text-gray-800 font-bold">Its time to start planning your next trip</h2>
              <p className="mt-4 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos quidem sequi illum facere recusandae voluptatibus</p>
            </div>
            <a href="/" className="inline-block py-3 px-6 bg-gray-800 text-white text-sm font-bold uppercase mt-2 rounded hover:bg-gray-700">Explore</a>
          </div>
          <div className="md:w-3/5 flex justify-center z-0">
            <img src="https://picsum.photos/800/900" alt="" className="w-96" />
          </div>
        </div>
        <div className="container mx-auto px-6 max-w-screen-xl -mt-20">
          <div className="flex justify-evenly">
            <div className="shadow hover:shadow-2xl px-10 py-10 bg-white z-10 rounded-tl-2xl rounded-br-2xl">
              <span className="font-black text-3xl tracking-wider">1872</span>
              <p className="mt-5">Posts</p>
            </div>
            <div className="shadow hover:shadow-2xl px-10 py-10 bg-white z-10 rounded-tr-2xl rounded-bl-2xl">
              <span className="font-black text-3xl tracking-wider">1872</span>
              <p className="mt-5">Posts</p>
            </div>
            <div className="shadow hover:shadow-2xl px-10 py-10 bg-white z-10 rounded-tr-2xl rounded-bl-2xl">
              <span className="font-black text-3xl tracking-wider">1872</span>
              <p className="mt-5">Posts</p>
            </div>
          </div>
        </div>
        <form className="w-3/4 mx-auto mt-24">
          <div className="flex">
            <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Your
              Email
            </label>
            <button
              id="dropdown-button"
              data-dropdown-toggle="dropdown"
              className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
              type="button"
            >
              All categories
              {' '}
              <svg
                className="w-2.5 h-2.5 ml-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="dropdown"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Mockups
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Templates
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Design
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Logos
                  </button>
                </li>
              </ul>
            </div>
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos, Design Templates..."
                required
              />
              <button
                type="submit"
                className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
      </section>

      {/*  Featured section */}
      <section className="container mx-auto text-center mt-20">
        <h6 className="font-bold font-hegimeda text-4xl mb-10">Featured</h6>
        <Carousel2
          className="h-72 mb-10 mx-32"
          wrapperClassName="h-full"
          interval={1000}
          autoplay={false}
          activeIndicatorColor="bg-black"
          inactiveIndicatorColor="bg-gray-300"
          indicatorClassName=""
        >
          <FeaturedItem />
          <FeaturedItem />
          <FeaturedItem />
          <FeaturedItem />
        </Carousel2>
      </section>

      {/*  Top destination section */}
      <section className="container mx-auto mt-24">
        <h6 className="font-bold font-hegimeda text-4xl mb-10 text-center">Top destinations</h6>
        <div className="flex justify-center gap-10">
          <TopDestinationItem />
          <TopDestinationItem />
          <TopDestinationItem />
        </div>
      </section>

      {/*  Decore section */}
      <section className="container mx-auto mt-32 grid grid-cols-12">
        <div className="col-span-8">
          <h5 className="text-secondary">Easy and fast</h5>
          <h6 className="font-volkhov text-3xl">Book your next tour in 3 easy steps</h6>
          <div className="flex gap-10 mt-10">
            <div className="w-12 h-12 bg-amber-100 rounded-xl" />
            <div>
              <h6 className="text-secondary font-semibold text-base">Browser posts</h6>
              <p className="text-base font-light">
                Lorem Ipsum is simply dummy text of the printing
              </p>
            </div>
          </div>
          <div className="flex gap-10 mt-10">
            <div className="w-12 h-12 bg-amber-100 rounded-xl" />
            <div>
              <h6 className="text-secondary font-semibold text-base">Browser posts</h6>
              <p className="text-base font-light">
                Lorem Ipsum is simply dummy text of the printing
              </p>
            </div>
          </div>
          <div className="flex gap-10 mt-10">
            <div className="w-12 h-12 bg-amber-100 rounded-xl" />
            <div>
              <h6 className="text-secondary font-semibold text-base">Browser posts</h6>
              <p className="text-base font-light">
                Lorem Ipsum is simply dummy text of the printing
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <img src={image1} alt="" className="w-96" />
        </div>
      </section>
    </Layout>
  );
}
