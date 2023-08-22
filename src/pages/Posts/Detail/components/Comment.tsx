import React from 'react';

export interface CommentProps {}

export default function Comment() {
  return (
    <div className="flex mb-5">
      <div className="flex-shrink-0">
        <img src="https://picsum.photos/400/400" alt="" className="w-10 h-10 rounded-full" />
      </div>
      <div className="flex-1 ms-5">
        <div className="mb-2">
          <h6 className="font-bold">Nguyen Tuan Anh</h6>
          <span className="text-gray-400 text-xs italic">10:00 Aug 9, 2023</span>
        </div>
        <p className="text-sm text-secondary dark:text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
        </p>
      </div>
    </div>
  );
}
