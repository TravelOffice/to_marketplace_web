import React from 'react';
import { LiaBell, LiaBookmarkSolid, LiaHandshake } from 'react-icons/lia';
import Layout from '@/components/base/Layout';
import RatingBar from '@/components/base/RatingBar';
import { numberArrayOf } from '@/utils/arrays';
import Comment from '@/pages/Posts/Detail/components/Comment';
import MakeOfferModal from '@/components/custom/MakeOfferModal';

export default function PostDetail() {
  const [showMakeOfferModal, setShowMakeOfferModal] = React.useState(false);
  return (
    <Layout>
      <div className="mx-8 pt-32 mt-1 grid grid-cols-7 gap-6">
        <div className="col-span-5">
          <div className="card px-5 py-5 mb-10">
            <h5 className="text-lg font-bold">What is Lorem Ipsum?</h5>
            <span className="text-sm font-light text-secondary dark:text-white">
              Posted by
              {' '}
              <span className="text-primary font-semibold">Nguyen Tuan Anh</span>
              {' '}
              at
              {' '}
              <span className="font-semibold">10:00 Aug 9, 2023</span>
            </span>
            <p className="text-sm text-secondary mb-5 mt-10 dark:text-white">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in
              the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </p>
            <div className="flex justify-between items-center mt-4 text-sm text-secondary">
              <div className="flex items-center gap-2 dark:text-white">
                <LiaHandshake className="w-6 h-6 text-primary" />
                <span>
                  <strong className="font-bold text-black dark:text-white">10</strong>
                  {' '}
                  offers
                </span>
              </div>
              <div className="flex items-center gap-2 dark:text-white">
                <LiaBookmarkSolid className="w-6 h-6 text-sky-500" />
                <span>
                  <strong className="font-bold text-black dark:text-white">4</strong>
                  {' '}
                  bookmarks
                </span>
              </div>
              <div className="flex items-center gap-2 dark:text-white">
                <LiaBell className="w-6 h-6 text-sky-500" />
                <span>
                  <strong className="font-bold text-black dark:text-white">4</strong>
                  {' '}
                  followers
                </span>
              </div>
            </div>
          </div>
          <div className="card px-5 py-5 mb-10">
            <h5 className="font-bold mb-5">Comments</h5>
            <div className="flex mb-5">
              <input
                className="flex-1 border-[1px] w-full h-full p-2.5 text-gray-900 text-sm rounded-l-lg focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none dark:bg-[#283046] dark:text-white dark:border-[#404656]"
                placeholder="Write a comment..."
              />
              <button type="button" className="bg-primary rounded-r-lg text-white font-medium text-sm px-5 py-2.5">Comment</button>
            </div>
            <div className="">
              {numberArrayOf(3).map((i) => (
                <Comment key={i} />
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="card px-5 py-5 mb-10">
            <h5 className="font-bold mb-5">Information</h5>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Company</span>
              <span className="font-semibold">PYSTravel</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Location</span>
              <span className="font-semibold">Ha Noi</span>
            </div>
            <div className="flex justify-between mb-5">
              <span className="text-sm">Price</span>
              <span className="font-semibold">100.000 VND</span>
            </div>
            <button
              type="button"
              className="w-full py-2.5 bg-primary text-white font-medium text-sm rounded-lg"
              onClick={() => setShowMakeOfferModal(true)}
            >
              Make offer
            </button>
          </div>

          <div className="card px-5 py-5 mb-10">
            <h5 className="font-bold mb-5">Rating (4.8 out of 5)</h5>
            <div className="flex justify-center">
              <RatingBar rating={4.8} showText={false} starClassname="w-10 h-10" />
            </div>
          </div>
        </div>
      </div>
      <MakeOfferModal isOpen={showMakeOfferModal} toggle={() => setShowMakeOfferModal(false)} />
    </Layout>
  );
}
