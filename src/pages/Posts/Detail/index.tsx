import React, { useMemo } from 'react';
import { LiaBell, LiaBookmarkSolid, LiaHandshake } from 'react-icons/lia';
import { Form, useParams } from 'react-router-dom';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Layout from '@/components/base/Layout';
import Comment from '@/pages/Posts/Detail/components/Comment';
import { usePost } from '@/hooks/post';
import { useComments, useCreateCommentMutation } from '@/hooks/comment';
import { useMarketplaceUser } from '@/hooks/marketplaceUser';
import { formatCurrency, useDateDuration } from '@/utils/common';
import { CreateCommentFormData } from '@/models/TourPost/PostComment';
import MakeOfferModal from '@/components/custom/MakeOfferModal';
import OfferListCard from '@/pages/Posts/Detail/components/OfferListCard';
import RatingCard from '@/pages/Posts/Detail/components/RatingCard';
import { useOffersOfPost } from '@/hooks/offer';
import { useCurrentUser } from '@/hooks/auth';
import { usePostRatings } from '@/hooks/rating.ts';

const schema: ObjectSchema<CreateCommentFormData> = yup.object()
  .shape({
    description: yup.string()
      .required('Vui lòng nhập bình luận'),
    tourPostId: yup.string()
      .required(),
  });

export default function PostDetail() {
  const [showMakeOfferModal, setShowMakeOfferModal] = React.useState(false);
  const currentUser = useCurrentUser();
  const { postId } = useParams();
  const { data: post } = usePost(postId!);
  const { data: comments } = useComments(postId!, { limit: 100 });
  const { data: author } = useMarketplaceUser(post?.authorId!, !!post);
  const { data: offers } = useOffersOfPost(postId!, !!postId);
  const { data: ratings } = usePostRatings(postId!, post?.organization!, !!post);
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<CreateCommentFormData>(
    {
      resolver: yupResolver(schema),
      defaultValues: {
        tourPostId: postId,
        description: '',
      },
    },
  );
  const createCommentMutation = useCreateCommentMutation(postId!);

  const onSendComment = (data: CreateCommentFormData) => {
    if (data.description !== '') {
      createCommentMutation.mutate(data);
      reset();
    }
  };

  const isAuthor = useMemo(() => currentUser?.id === post?.authorId, [currentUser, post]);

  const inProcessOffers = useMemo(() => offers?.filter((offer) => offer.offerStatus === 'IN_PROCESS'), offers);

  return (
    <Layout>
      <div className="mx-8 pt-32 mt-1 grid grid-cols-7 gap-6">
        <div className="col-span-5">
          <div className="card px-5 py-5 mb-10">
            <h5 className="text-lg font-bold">{post?.name}</h5>
            <span className="text-sm font-light text-secondary dark:text-white">
              <span className="text-primary font-semibold">{author?.name}</span>
              {' '}
              <span className="text-gray-400 text-xs italic">
                {useDateDuration(post?.createdAt!)}
              </span>
            </span>
            <p
              className="text-sm text-secondary mb-5 mt-10 dark:text-white whitespace-pre-wrap break-words"
            >
              {post?.description}
            </p>
            <div className="flex justify-between items-center mt-4 text-sm text-secondary">
              <div className="flex items-center gap-2 dark:text-white">
                <LiaHandshake className="w-6 h-6 text-primary" />
                <span>
                  <strong
                    className="font-bold text-black dark:text-white"
                  >
                    {post?.totalOffers}
                  </strong>
                  {' '}
                  Yêu cầu
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
                  Theo dõi
                </span>
              </div>
            </div>
          </div>
          {
            isAuthor ? (
              <OfferListCard offers={inProcessOffers ?? []} />
            ) : null
          }
          <div className="card px-5 py-5 mb-10">
            <h5 className="font-bold mb-5">
              Bình luận (
              {comments?.data.length}
              )
              {' '}
              <button type="button" className="underline text-sm font-normal text-primary">
                Làm mới
              </button>
            </h5>
            <Form onSubmit={handleSubmit(onSendComment)}>
              <div className="mb-5">
                <div className="flex">
                  <input
                    {...register('description')}
                    className="flex-1 border-[1px] w-full h-full p-2.5 text-gray-900 text-sm rounded-l-lg focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none dark:bg-[#283046] dark:text-white dark:border-[#404656]"
                    placeholder="Viết bình luận..."
                  />
                  <button
                    type="submit"
                    className="bg-primary rounded-r-lg text-white font-medium text-sm px-5 py-2.5"
                  >
                    Gửi
                  </button>
                </div>

                {errors.description
                  && <p className="text-red-700 text-xs italic mt-1">{errors.description.message}</p>}
              </div>
            </Form>
            <div className="overflow-auto max-h-96">
              {
                comments?.data && comments?.data.map((comment) => (
                  <Comment key={comment.code} comment={comment} />
                ))
              }
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="card px-5 py-5 mb-10">
            <h5 className="font-bold mb-5">Thông tin</h5>
            <div className="flex justify-between mb-4">
              <span className="text-sm">Điểm đến</span>
              <span className="font-semibold">{post?.endingLocation}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-sm">Ngày khởi hành</span>
              <span className="font-semibold">
                {moment(post?.departureDate)
                  .format('DD-MM-YYYY')}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-sm">Số lượng khách</span>
              <span className="font-semibold">
                {post?.maximumPaxToTrade! > -1 ? post?.maximumPaxToTrade : 'Không giới hạn'}
              </span>
            </div>
            <div className="flex justify-between mb-5">
              <span className="text-sm">Giá/khách</span>
              <span className="font-semibold">
                {formatCurrency(post?.pricePerPax!)}
                {' '}
                VND
              </span>
            </div>
            <div className="flex justify-between mb-5">
              <span className="text-sm">Chiết khấu</span>
              <span className="font-semibold">
                {formatCurrency(post?.commission!)}
                {' '}
                VND
              </span>
            </div>

            <button
              type="button"
              className="w-full py-2.5 bg-primary text-white font-medium text-sm rounded-lg"
              onClick={() => setShowMakeOfferModal(true)}
            >
              {
                currentUser?.id === post?.authorId ? 'Cập nhật bài đăng' : 'Gửi yêu cầu'
              }
            </button>
          </div>
          <RatingCard ratings={ratings!} ratingAverage={post?.ratingAverage!} />
        </div>
      </div>
      <MakeOfferModal
        isOpen={showMakeOfferModal}
        tourPostId={postId!}
        toggle={() => setShowMakeOfferModal(false)}
      />
    </Layout>
  );
}
