import moment from 'moment';
import axios, { AxiosProgressEvent } from 'axios';
import { MarketplaceUser } from '@/models/MarketplaceUser/MarketplaceUser';
import marketplaceApi from '@/services/marketplaceApi';
import { PresignedUrl } from '@/models/PresignedUrl';

export const useDateDuration = (data: string | number) => {
  const momentOne = moment();
  const momentTwo = moment(data);
  return `${moment
    .duration(momentOne.diff(momentTwo))
    .humanize()} trước`;
};

export const formatCurrency = (amount: number) => {
  if (amount) {
    return new Intl.NumberFormat('en-US').format(amount);
  }
  return 0;
};

export const generateUserAvatar = (user?: MarketplaceUser) => {
  if (!user) return 'https://ui-avatars.com/api/?name=&background=random&length=1&rounded=true';
  if (user.avatar) return user.avatar;
  return `https://ui-avatars.com/api/?name=${user.username}&background=random&length=1&rounded=true`;
};

/**
 * Remove empty fields from object
 * @param obj
 */
export function removeEmptyFields<T extends Record<string, any>>(obj: T) {
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) => {
    if (!newObj[key]) delete newObj[key];
  });
  return newObj;
}

/**
 * Compress image to reduce file size
 * @param file the original file to compress
 * @param quality quality of the compressed image (0 - 1)
 */
export function compressImage(file: File, quality: number) {
  return new Promise<File>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const elem = document.createElement('canvas');
        const { width, height } = img;
        const scaleFactor = width / height;
        elem.width = 300;
        elem.height = 300 / scaleFactor;
        const ctx = elem.getContext('2d');
        ctx?.drawImage(img, 0, 0, 300, 300 / scaleFactor);
        ctx?.canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          }
        }, file.type, quality);
      };
      img.onerror = (error) => reject(error);
    };
  });
}

/**
 * Extract file extension from file
 * @param file the file to extract extension
 * @returns file extension such as .jpg, .png, ...
 */
export function extractFileExtension(file: File) {
  const { name } = file;
  const lastDotIndex = name.lastIndexOf('.');
  return name.substring(lastDotIndex + 1);
}

async function generatePreSignedUrl(file: File) {
  return marketplaceApi.get<PresignedUrl>('/presigned-url', {
    queryParams: {
      fileName: file.name,
      fileType: file.type,
    },
  });
}

/**
 * Upload image to storage
 * @param file the file to upload
 * @param quality quality of the compressed image (0 - 1)
 * @param onProgress callback to update upload progress
 */
export async function uploadImage(
  file: File,
  quality: number,
  onProgress?: (progress: number) => void,
) {
  const compressedImage = await compressImage(file, quality);
  const presignedUrl = await generatePreSignedUrl(compressedImage);
  await axios.put(presignedUrl.url, compressedImage, {
    headers: {
      'Content-Type': 'image/png',
    },
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      if (!progressEvent.progress) return;
      onProgress?.(progressEvent.progress);
    },
  });
  return presignedUrl;
}
