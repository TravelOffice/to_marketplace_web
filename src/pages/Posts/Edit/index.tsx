import React, { useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Form } from 'react-router-dom';
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
    type: yup.string()
      .required('Vui lòng chọn loại'),
    pricePerPax: yup.string()
      .required('Vui lòng nhập giá mỗi khách'),
    commission: yup.string()
      .required('Vui lòng nhập chiết khấu'),
    departureDate: yup.string()
      .required('Vui lòng nhập thời gian khởi hành'),
    endingLocation: yup.string()
      .required('Vui lòng nhập điểm đến'),
  });

export interface EditPostProps {
  postId: string,
}

export default function EditPost(props: EditPostProps) {
  const { postId } = props;
  const { data: post } = usePost(postId);
  const {
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
      <div className="container mx-auto px-6">
        <div className="border-[1px] rounded px-5 py-5 mt-10 mb-10">
          <h5 className="font-bold">Chỉnh sửa bài đăng</h5>

          <Form className="mt-5" onSubmit={handleSubmit(onEditPost)}>
            <Label title="Tiêu đề" required />
            <input
              {...register('name')}
              type="text"
              className="mb-5 border-[1px] w-full h-full p-2.5 text-gray-900 text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            />
            {errors.name
              && <p className="text-red-700 text-xs italic mt-1">{errors.name.message}</p>}

            <Label title="Loại" required />
            <Select
              className="mb-5"
              options={[
                {
                  value: 'tour',
                  label: 'Tìm tour',
                },
                {
                  value: 'passenger',
                  label: 'Tìm khách',
                },
              ]}
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
            />

            <Label title="Chi tiết" required />
            <textarea
              {...register('description')}
              className="mb-5 border-[1px] w-full h-full p-2.5 text-gray-900 text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            />
            {errors.description
              && <p className="text-red-700 text-xs italic mt-1">{errors.description.message}</p>}

            <Label title="Chi tiết" required />
            <CKEditor
              editor={ClassicEditor}
              data="<p>Hello from CKEditor&nbsp;5!</p>"
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                // eslint-disable-next-line no-console
                console.log('Editor is ready to use!', editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                // eslint-disable-next-line no-console
                console.log({
                  event,
                  editor,
                  data,
                });
              }}
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
