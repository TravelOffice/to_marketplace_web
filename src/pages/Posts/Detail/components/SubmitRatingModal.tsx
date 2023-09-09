import React, { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ObjectSchema } from 'yup';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal, { ModalProps } from '@/components/base/Modal';
import ModalHeader from '@/components/base/Modal/ModalHeader';
import ModalBody from '@/components/base/Modal/ModalBody';
import RatingBar from '@/components/base/RatingBar';
import { CreatePostRatingFormData } from '@/models/TourPost/PostRating';
import ModalFooter from '@/components/base/Modal/ModalFooter';
import { useCreateRating } from '@/hooks/rating';
import Spinner from '@/components/base/Spinner';
import { SOMETHING_WRONG, UPDATE_SUCCESS } from '@/utils/constants';

export interface SubmitRatingModalProps extends ModalProps {
}

const defaultValues: CreatePostRatingFormData = {
  star: 0,
  description: '',
};

const schema: ObjectSchema<CreatePostRatingFormData> = yup.object().shape({
  star: yup.number()
    .required()
    .min(1, 'Đánh giá tối thiểu 1 sao')
    .max(5, 'Đánh giá tối đa 5 sao'),
  description: yup.string(),
});

export default function SubmitRatingModal(props: SubmitRatingModalProps) {
  const { ...modalProps } = props;
  const { toggle, isOpen } = modalProps;
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePostRatingFormData>({ defaultValues, resolver: yupResolver(schema) });

  const { postId } = useParams();

  useEffect(() => {
    if (isOpen) {
      reset(defaultValues);
    }
  }, [isOpen]);

  const { mutate, isLoading } = useCreateRating(postId!, {
    onSuccess: () => {
      // Show success toast
      toast.success(UPDATE_SUCCESS);
    },
    onError: () => {
      toast.error(SOMETHING_WRONG);
    },
  });

  const onSubmit = useCallback((formData: CreatePostRatingFormData) => {
    mutate(formData);
  }, []);

  return (
    <Modal {...modalProps}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Gửi đánh giá</ModalHeader>
        <ModalBody>
          <div className="flex justify-center">
            <Controller
              control={control}
              name="star"
              render={({ field: { value, onChange } }) => (
                <RatingBar
                  rating={value}
                  editable
                  showText={false}
                  starClassname="w-12 h-12 pe-1"
                  onChange={(rating) => onChange(rating)}
                />
              )}
            />
          </div>
          {
            errors.star && <div className="text-red-500 mt-2">{errors.star.message}</div>
          }
          <div>
            <textarea
              className="w-full h-32 border border-gray-300 rounded-md p-3 mt-5"
              placeholder="Nhập đánh giá của bạn..."
              {...register('description')}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="px-5 py-2.5 border border-gray-300 rounded me-3"
            onClick={() => toggle()}
            disabled={isLoading}
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-primary text-white rounded"
            disabled={isLoading}
          >
            {
              isLoading && <Spinner className="w-3 h-3 me-3 text-white" />
            }
            Gửi đánh giá
          </button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
