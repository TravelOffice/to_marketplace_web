import React, { useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Form, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import Layout from '@/components/base/Layout';
import '@/styles/extended/ckeditor.css';
import Label from '@/components/base/Label';
import '@/styles/extended/react-select.css';
import { EditPostFormData } from '@/models/TourPost/TourPost';
import { usePost, useUpdatePostMutation } from '@/hooks/post';

const schema: ObjectSchema<EditPostFormData> = yup.object()
  .shape({
    name: yup.string()
      .required('Vui lòng nhập tiêu đề'),
    description: yup.string()
      .required('Vui lòng nhập mô tả'),
    pricePerPax: yup.number()
      .required('Vui lòng nhập giá mỗi khách'),
    commission: yup.number()
      .required('Vui lòng nhập chiết khấu'),
    departureDate: yup.string()
      .required('Vui lòng nhập thời gian khởi hành'),
    endingLocation: yup.string()
      .required('Vui lòng nhập điểm đến'),
    maximumPaxToTrade: yup.number()
      .min(-1, 'Số lượng khách không hợp lệ'),
    expiry: yup.string()
      .required('Vui lòng nhập thời gian hết hạn'),
  });

export default function EditPost() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { data: post } = usePost(postId!);
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<EditPostFormData>(
    {
      resolver: yupResolver(schema),
    },
  );
  const { mutate } = useUpdatePostMutation(post?.code!);
  useEffect(() => {
    if (post) {
      reset({
        name: post.name,
        description: post.description,
        pricePerPax: post.pricePerPax,
        commission: post.commission,
        departureDate: post.departureDate,
        expiry: post.expiry,
        maximumPaxToTrade: post.maximumPaxToTrade,
        endingLocation: post.endingLocation,
      });
    }
  }, [post]);

  const onEditPost = (data: EditPostFormData) => {
    mutate(data);
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 pt-20">
        <div className="border-[1px] rounded px-5 py-5 mt-10 mb-10">
          <h5 className="font-bold">Chỉnh sửa bài đăng</h5>
          <Form className="mt-5" onSubmit={handleSubmit(onEditPost)}>
            <Label title="Tiêu đề" required htmlFor="name" />
            <input
              type="text"
              className="mb-5 border-[1px] w-full h-full p-2.5 text-gray-900 text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
              {...register('name')}
            />
            {errors.name
              && <p className="text-red-700 text-xs italic mt-1">{errors.name.message}</p>}

            <Label title="Ngày khởi hành" required htmlFor="departureDate" />
            <input
              type="date"
              className="mb-5 border-[1px] w-full h-full p-2.5 text-gray-900 text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
              {...register('departureDate')}
            />
            {errors.departureDate
              && <p className="text-red-700 text-xs italic mt-1">{errors.departureDate.message}</p>}

            <Label title="Điểm đến" required htmlFor="endingLocation" />
            <input
              type="text"
              className="mb-5 border-[1px] w-full h-full p-2.5 text-gray-900 text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
              {...register('endingLocation')}
            />
            {errors.endingLocation
              && <p className="text-red-700 text-xs italic mt-1">{errors.endingLocation.message}</p>}

            <Label title="Giá/khách" required htmlFor="pricePerPax" />
            <input
              type="number"
              className="mb-5 border-[1px] w-full h-full p-2.5 text-gray-900 text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
              {...register('pricePerPax')}
            />
            {errors.pricePerPax
              && <p className="text-red-700 text-xs italic mt-1">{errors.pricePerPax.message}</p>}

            <Label title="Số lượng khách" required htmlFor="maximumPaxToTrade" />
            <input
              type="number"
              className="mb-5 border-[1px] w-full h-full p-2.5 text-gray-900 text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
              {...register('maximumPaxToTrade')}
            />
            {errors.maximumPaxToTrade
              && <p className="text-red-700 text-xs italic mt-1">{errors.maximumPaxToTrade.message}</p>}

            <Label title="Chiết khấu" required htmlFor="commision" />
            <input
              type="number"
              className="mb-5 border-[1px] w-full h-full p-2.5 text-gray-900 text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
              {...register('commission')}
            />
            {errors.commission
              && <p className="text-red-700 text-xs italic mt-1">{errors.commission.message}</p>}

            <Label title="Thời gian kết thúc" required htmlFor="expiry" />
            <input
              type="date"
              className="mb-5 border-[1px] w-full h-full p-2.5 text-gray-900 text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
              {...register('expiry')}
            />
            {errors.expiry
              && <p className="text-red-700 text-xs italic mt-1">{errors.expiry.message}</p>}

            <Label title="Chi tiết" required />
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange } }) => (
                <CKEditor
                  editor={ClassicEditor}
                  data={post?.description}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    // eslint-disable-next-line no-console
                    console.log('Editor is ready to use!', editor);
                  }}
                  onChange={(_event, editor) => onChange(editor.getData())}
                />
              )}
            />

            <div className="mt-5">
              <button
                type="submit"
                className="bg-primary rounded-lg text-white font-medium text-sm px-8 py-2.5 hover:shadow-lg"
              >
                Cập nhật
              </button>
              <button
                type="button"
                className="bg-gray-200 rounded-lg text-gray-900 font-medium text-sm px-8 py-2.5 ms-3 hover:shadow-lg"
                onClick={() => navigate(-1)}
              >
                Quay lại
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  );
}
