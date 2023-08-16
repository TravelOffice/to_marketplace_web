import React from 'react';

export default function TopDestinationItem() {
  return (
    <div className="card shadow hover:shadow-xl p-0 rounded-lg cursor-pointer">
      <div className="card-image">
        <img className="rounded-tl-lg rounded-tr-lg w-72 aspect-square" src="https://picsum.photos/600/600" alt="" />
      </div>
      <div className="card-content px-3 py-6">
        <h6 className="font-bold text-lg mb-2">Paris, France</h6>
        <div>96 active tours</div>
        <div>35 done deals</div>
      </div>
    </div>
  );
}
