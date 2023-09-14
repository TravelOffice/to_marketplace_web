import React from 'react';
import image from '@/assets/images/illustrator/complete.svg';

export default function OnboardingReview() {
  return (
    <div className="flex flex-col items-center bg-white max-w-3xl mx-auto max-h-3/4 mt-10 p-6 rounded-lg shadow-lg dark:bg-[#283046] dark:text-white">
      <img src={image} alt="" className="w-80" />
      <h5 className="mt-5 text-xl font-semibold">Chúc mừng bạn đã hoàn thành đăng ký doanh nghiệp!</h5>
      <a href="/" type="button" className="px-10 w-full mt-5 rounded py-2.5 text-center bg-primary text-white font-semibold">
        Bắt đầu
      </a>
    </div>
  );
}
