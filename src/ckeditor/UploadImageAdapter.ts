// eslint-disable-next-line max-classes-per-file
import { Editor } from '@ckeditor/ckeditor5-core';

class UploadAdapter {
  constructor(private readonly loader: any) {
    this.loader = loader;
  }

  // eslint-disable-next-line class-methods-use-this
  async uploadToS3(file: any) {
    console.log('file', file);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('https://picsum.photos/200/300');
      }, 3000);
    });
  }

  upload() {
    return this.loader.file.then((file: any) => new Promise((resolve, reject) => {
      this.uploadToS3(file).then((url: any) => {
        resolve({
          default: url,
        });
      }).catch((error: any) => {
        reject(error);
      });
    }));
  }
}

export default function MyCustomUploadAdapterPlugin(editor: Editor) {
  // eslint-disable-next-line no-param-reassign
  (editor.plugins.get('FileRepository') as any).createUploadAdapter = (loader: any) => new UploadAdapter(loader);
}
