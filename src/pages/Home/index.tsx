import React from 'react';
import Layout from '@/components/Layout';
import '@/styles/HomePage.scss';
import Carousel2 from '@/components/Carousel2';
import FeaturedItem from '@/pages/Home/components/FeaturedItem';
import TopDestinationItem from '@/pages/Home/components/TopDestinationItem';
import image1 from '@/assets/images/decore/image1.png';
import SearchForm from '@/pages/Home/components/SearchForm';

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
        <SearchForm />
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
      <section className="container mx-auto px-6 mt-32 grid grid-cols-12">
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
