import React, { useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Form, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import Layout from '@/components/base/Layout';
import '@/styles/extended/ckeditor.css';
import Label from '@/components/base/Label';
import '@/styles/extended/react-select.css';
import { EditPostFormData } from '@/models/TourPost/TourPost';
import { usePost, useUpdatePostMutation } from '@/hooks/post';
import { tourPostTypes } from '@/models/TourPost/TourPostType';

const schema: ObjectSchema<EditPostFormData> = yup.object()
  .shape({
    name: yup.string()
      .required('Vui lòng nhập tiêu đề'),
    description: yup.string()
      .required('Vui lòng nhập mô tả'),
    type: yup.string()
      .oneOf(tourPostTypes)
      .required('Vui lòng chọn loại'),
    pricePerPax: yup.number()
      .required('Vui lòng nhập giá mỗi khách'),
    commission: yup.number()
      .required('Vui lòng nhập chiết khấu'),
    departureDate: yup.string()
      .required('Vui lòng nhập thời gian khởi hành'),
    endingLocation: yup.string()
      .required('Vui lòng nhập điểm đến'),
  });

const postTypeOptions = [
  {
    value: 'SELL_PASSENGER',
    label: 'Bán khách',
  },
  {
    value: 'BUY_PASSENGER',
    label: 'Tìm khách',
  },
];

export default function EditPost() {
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
    reset(post);
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

            <Label title="Loại" required htmlFor="type" />
            <Controller
              control={control}
              name="type"
              render={({
                field: {
                  value,
                  onChange,
                  ...rest
                },
              }) => (
                <Select
                  className="mb-5"
                  options={postTypeOptions}
                  classNamePrefix="react-select"
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: 'rgba(253,146,34,0.05)',
                      primary: '#FD9222',
                    },
                  })}
                  classNames={{
                    control: (state) => (state.isFocused ? 'border-primary ring-1 ring-primary' : 'border-gray-300'),
                    option: (state) => (state.isFocused ? 'bg-primary text-white' : ''),
                  }}
                  {...rest}
                />
              )}
            />

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
                  onChange={onChange}
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
              >
                Hủy
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  );
}
