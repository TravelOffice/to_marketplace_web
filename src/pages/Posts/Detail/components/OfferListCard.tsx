import React from 'react';
import { numberArrayOf } from '@/utils/arrays';
import AcceptOfferModal from '@/pages/Posts/Detail/components/AcceptOfferModal';
import RejectOfferModal from '@/pages/Posts/Detail/components/RejectOfferModal';

export interface OfferListCardProps {
}

export default function OfferListCard() {
  // TODO: Replace below boolean state by `acceptedOffer` and `rejectedOffer`
  const [showAcceptOfferModal, setShowAcceptOfferModal] = React.useState(false);
  const [showRejectOfferModal, setShowRejectOfferModal] = React.useState(false);
  return (
    <div className="card px-5 py-5 mb-10">
      <h5 className="font-bold mb-5">
        Danh sách yêu cầu (3)
        {' '}
        <button type="button" className="underline text-sm font-normal text-primary">Làm mới</button>
      </h5>
      {
        numberArrayOf(3).map((i) => (
          <div key={i} className="border-b last:border-0 flex py-5 gap-5">
            <img src="https://picsum.photos/600/600" alt="" className="w-14 h-14 rounded-full" />
            <div className="flex-1">
              <h5 className="font-semibold text-lg">PYS Travel</h5>
              <div className="text-sm italic">
                1 ngày trước
              </div>
              <div>
                <span>
                  Yêu cầu ghép:
                  {' '}
                  <span className="font-medium">2 khách</span>
                </span>
              </div>
              <div>
                <span>
                  Chiết khấu:
                  {' '}
                  <span className="font-medium">10%</span>
                </span>
              </div>
              <div>
                <span>
                  Ghi chú thêm:
                  {' '}
                  <span className="font-medium">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, asperiores
                    aspernatur atque autem commodi consequatur cumque cupiditate delectus dicta
                  </span>
                </span>
              </div>
            </div>
            <div className="h-fit flex flex-col gap-2">
              <div className="text-primary font-bold text-2xl text-center">
                10.000.000
                {' '}
                <span className="text-sm">đ</span>
              </div>
              <button
                type="button"
                className="w-full px-10 py-2 bg-primary text-white rounded"
                onClick={() => setShowAcceptOfferModal(true)}
              >
                Chấp nhận
              </button>
              <button
                type="button"
                className="w-full px-10 py-2 border border-red-700 text-red-700 rounded me-3 dark:text-gray-200 dark:border-gray-200"
                onClick={() => setShowRejectOfferModal(true)}
              >
                Từ chối
              </button>
            </div>
          </div>
        ))
      }

      <AcceptOfferModal
        onAccept={() => {}}
        isOpen={showAcceptOfferModal}
        toggle={() => setShowAcceptOfferModal(!showAcceptOfferModal)}
      />

      <RejectOfferModal
        isOpen={showRejectOfferModal}
        toggle={() => setShowRejectOfferModal(!showRejectOfferModal)}
      />
    </div>
  );
}
