import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import axios from 'axios';
import { compressImage } from '@/utils/common';
import marketplaceApi from '@/services/marketplaceApi';
import { PresignedUrl } from '@/models/PresignedUrl';

async function generatePreSignedUrl(file: File) {
  return marketplaceApi.get<PresignedUrl>('/presigned-url', {
    queryParams: {
      fileName: file.name,
      fileType: file.type,
    },
  });
}

// eslint-disable-next-line import/prefer-default-export
export function useUploadImageMutation(
  options: UseMutationOptions<string, unknown, File> & { onProgress?: (progress: number) => void },
) {
  const { onProgress, ...mutationOptions } = options;
  return useMutation(
    async (file: File) => {
      const compressedImage = await compressImage(file, 0.5);
      const presignedUrl = await generatePreSignedUrl(compressedImage);
      await axios.put(presignedUrl.url, compressedImage, {
        headers: {
          'Content-Type': 'image/png',
        },
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.progress) return;
          onProgress?.(progressEvent.progress);
        },
      });
      return presignedUrl.cdn;
    },
    mutationOptions,
  );
}
