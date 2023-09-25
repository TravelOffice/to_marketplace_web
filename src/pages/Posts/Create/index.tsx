import React, { useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm, useWatch } from 'react-hook-form';
import {
  Form, useLocation, useNavigate, useParams,
} from 'react-router-dom';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import Select from 'react-select';
import moment from 'moment';
import Layout from '@/components/base/Layout';
import '@/styles/extended/ckeditor.css';
import Label from '@/components/base/Label';
import '@/styles/extended/react-select.css';
import { useCreatePostMutation, usePost } from '@/hooks/post';
import { CreatePostFormData } from '@/models/TourPost/TourPost';

const autoCloseOptions = [
  {
    value: true,
    label: 'Tự động đóng',
  },
  {
    value: false,
    label: 'Đóng thủ công',
  },
];

const limitedPaxOptions = [
  {
    value: true,
    label: 'Có giới hạn',
  },
  {
    value: false,
    label: 'Không giới hạn',
  },
];

const schema: ObjectSchema<CreatePostFormData> = yup.object()
  .shape({
    name: yup.string()
      .required('Vui lòng nhập tiêu đề'),
    description: yup.string()
      .required('Vui lòng nhập mô tả'),
    pricePerPax: yup.number()
      .min(1, 'Giá/khách không hợp lệ')
      .required('Vui lòng nhập giá mỗi khách'),
    commission: yup.number()
      .min(1, 'Chiết khấu không hợp lệ')
      .required('Vui lòng nhập chiết khấu'),
    departureDate: yup.string()
      .required('Vui lòng nhập thời gian khởi hành'),
    endingLocation: yup.string()
      .required('Vui lòng nhập điểm đến'),
    maximumPaxToTrade: yup.number()
      .min(-1, 'Số lượng khách không hợp lệ'),
    expiry: yup.string(),
    autoClose: yup.boolean()
      .required(),
    limitedPax: yup.boolean()
      .required(),
    thumbnails: yup.mixed(),
    linkedToTargetKeys: yup.mixed(),
    type: yup.string()
      .required(),
  });

export interface CreatePostProps {
  name: string,
  description?: string,
  type: string,
  linkedToTargetCode: string,
  linkedToTargetType: 'TOUR_TEMPLATE' | 'LEAD',
  maximumPaxToTrade?: number,
}

export default function CreatePost() {
  const navigate = useNavigate();
  const location = useLocation();
  const props = location.state as CreatePostProps;
  const { postId } = useParams();
  const { data: post } = usePost(postId!);
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<CreatePostFormData>(
    {
      resolver: yupResolver(schema),
      defaultValues: {
        ...props,
        pricePerPax: 0,
        commission: 0,
        departureDate: moment()
          .add(1, 'days')
          .format('YYYY-MM-DD'),
        expiry: moment()
          .add(1, 'days')
          .format('YYYY-MM-DD'),
        maximumPaxToTrade: 1,
        autoClose: false,
        limitedPax: true,
        thumbnails: undefined,
      },
    },
  );
  const { mutate } = useCreatePostMutation();

  const onCreatePost = (data: CreatePostFormData) => {
    const {
      limitedPax,
      ...rest
    } = data;
    mutate({
      ...rest,
      maximumPaxToTrade: limitedPax ? rest.maximumPaxToTrade : -1,
    } as CreatePostFormData);
  };

  const [limitedPax] = useWatch({
    control,
    name: ['limitedPax'],
  });

  const isEdiableMaximumPaxToTrade = useMemo(() => {
    if (limitedPax == null) return post?.maximumPaxToTrade !== -1;
    return limitedPax;
  }, [limitedPax, post]);
  return (
    <Layout>
      <div className=" mx-auto px-8 pt-20">
        <div className="rounded-lg px-5 py-5 mt-10 mb-10 bg-white">
          <h5 className="font-bold">Tạo bài đăng</h5>
          <Form className="mt-5" onSubmit={handleSubmit(onCreatePost)}>
            <div className="flex flex-wrap -mx-3 mb-5">
              <div className="w-full md:w px-3 mb-6 md:mb-0">
                <Label title="Tiêu đề" required htmlFor="name" />
                <input
                  type="text"
                  className="border-[1px] w-full p-2.5 text-gray-900 text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  {...register('name')}
                />
                {errors.name
                  && <p className="text-red-700 text-xs italic mt-1">{errors.name.message}</p>}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-5">
              <div className="w-full md:w px-3 mb-6 md:mb-0">
                <Label title="Hình ảnh" required htmlFor="name" />
                <input
                  type="file"
                  accept="image/*"
                  className="border-[1px] w-full p-2.5 text-gray-900 text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  {...register('thumbnails')}
                />
                {errors.thumbnails
                  && <p className="text-red-700 text-xs italic mt-1">{errors.thumbnails.message}</p>}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-5">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <Label title="Ngày khởi hành" required htmlFor="departureDate" />
                <input
                  type="date"
                  className="border-[1px] w-full p-2.5 text-gray-900 text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  {...register('departureDate')}
                />
                {errors.departureDate
                  && <p className="text-red-700 text-xs italic mt-1">{errors.departureDate.message}</p>}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <Label title="Điểm đến" required htmlFor="endingLocation" />
                <input
                  type="text"
                  className="border-[1px] w-full p-2.5 text-gray-900 text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  {...register('endingLocation')}
                />
                {errors.endingLocation
                  && <p className="text-red-700 text-xs italic mt-1">{errors.endingLocation.message}</p>}
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-5">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <Label title="Giá/khách" required htmlFor="pricePerPax" />
                <input
                  type="number"
                  className="border-[1px] w-full p-2.5 text-gray-900 text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  {...register('pricePerPax')}
                />
                {errors.pricePerPax
                  && <p className="text-red-700 text-xs italic mt-1">{errors.pricePerPax.message}</p>}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-5 md:mb-0">
                <Label title="Chiết khấu" required htmlFor="commision" />
                <input
                  type="number"
                  className="border-[1px] w-full p-2.5 text-gray-900 text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  {...register('commission')}
                />
                {errors.commission
                  && <p className="text-red-700 text-xs italic mt-1">{errors.commission.message}</p>}
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-5">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <Label title="Giới hạn số lượng khách" htmlFor="autoClose" />
                <Controller
                  control={control}
                  name="limitedPax"
                  render={({
                    field: {
                      onChange,
                      value,
                    },
                  }) => (
                    <Select
                      name="limitedPax"
                      onChange={(e) => {
                        if (e) {
                          onChange(e.value);
                        }
                      }}
                      options={limitedPaxOptions}
                      value={limitedPaxOptions.find((option) => option.value === value)}
                      defaultValue={limitedPaxOptions.find(
                        (option) => option.value === (post?.maximumPaxToTrade === -1),
                      )}
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
                  )}
                />
                {errors.limitedPax
                  && <p className="text-red-700 text-xs italic mt-1">{errors.limitedPax.message}</p>}
              </div>
              {
                isEdiableMaximumPaxToTrade ? (
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <Label title="Số lượng khách" required htmlFor="maximumPaxToTrade" />
                    <input
                      disabled={!isEdiableMaximumPaxToTrade}
                      type="number"
                      className="border-[1px] w-full p-2.5 text-gray-900 text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                      {...register('maximumPaxToTrade')}
                    />
                    {errors.maximumPaxToTrade
                      && <p className="text-red-700 text-xs italic mt-1">{errors.maximumPaxToTrade.message}</p>}
                  </div>
                ) : null
              }
            </div>

            <div className="flex flex-wrap -mx-3 mb-5">
              <div className="w-full h-full md:w-1/2 px-3 mb-6 md:mb-0">
                <Label title="Cài đặt bài đăng khi hêt hạn" htmlFor="autoClose" />
                <Controller
                  control={control}
                  name="autoClose"
                  render={({
                    field: {
                      onChange,
                      value,
                    },
                  }) => (
                    <Select
                      name="autoClose"
                      options={autoCloseOptions}
                      onChange={(e) => {
                        if (e) {
                          onChange(e.value);
                        }
                      }}
                      value={autoCloseOptions.find((option) => option.value === value)}
                      defaultValue={autoCloseOptions.find(
                        (option) => option.value === post?.autoClose,
                      )}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary25: 'rgba(253,146,34,0.05)',
                          primary: '#FD9222',
                        },
                      })}
                      classNames={{
                        control: (state) => (state.isFocused ? 'border-primary ring-1 ring-primary dark:bg-dark' : 'border-gray-300 dark:bg-black'),
                        option: (state) => (state.isFocused ? 'bg-primary text-white' : ''),
                        menu: () => 'bg-white dark:bg-dark',
                      }}
                    />
                  )}
                />
                {errors.autoClose
                  && <p className="text-red-700 text-xs italic mt-1">{errors.autoClose.message}</p>}
              </div>
              <div className="w-full h-full md:w-1/2 px-3 mb-6 md:mb-0">
                <Label title="Thời gian kết thúc" required htmlFor="expiry" />
                <input
                  type="date"
                  className="border-[1px] w-full p-2.5 text-gray-900 text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  {...register('expiry')}
                />
                {errors.expiry
                  && <p className="text-red-700 text-xs italic mt-1">{errors.expiry.message}</p>}
              </div>
            </div>

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
            {errors.description
              && <p className="text-red-700 text-xs italic mt-1">{errors.description.message}</p>}

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
