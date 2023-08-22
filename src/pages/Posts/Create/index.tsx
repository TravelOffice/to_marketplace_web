import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';
import Layout from '@/components/base/Layout';
import '@/styles/extended/ckeditor.css';
import Label from '@/components/base/Label';
import '@/styles/extended/react-select.css';

export interface CreatePostProps {
}

export default function CreatePost() {
  return (
    <Layout>
      <div className="container mx-auto px-6">
        <div className="border-[1px] rounded px-5 py-5 mt-10 mb-10">
          <h5 className="font-bold">Create your post</h5>

          <form className="mt-5">
            <Label title="Title" required />
            <input
              type="text"
              className="mb-5 border-[1px] w-full h-full p-2.5 text-gray-900 text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            />

            <Label title="Type" required />
            <Select
              className="mb-5"
              options={[
                {
                  value: 'tour',
                  label: 'Post',
                },
                {
                  value: 'lead',
                  label: 'Lead',
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

            <Label title="Short description" required />
            <textarea
              className="mb-5 border-[1px] w-full h-full p-2.5 text-gray-900 text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            />

            <Label title="Description" required />
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
                Create
              </button>
              <button
                type="button"
                className="bg-gray-200 rounded-lg text-gray-900 font-medium text-sm px-8 py-2.5 ms-3 hover:shadow-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
