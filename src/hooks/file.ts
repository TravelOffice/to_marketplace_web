import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { uploadImage } from '@/utils/common';
import { PresignedUrlType } from '@/models/PresignedUrl';

// eslint-disable-next-line import/prefer-default-export
export function useUploadImageMutation(
  presignedUrlType: PresignedUrlType,
  options: UseMutationOptions<string, unknown, File> & { onProgress?: (progress: number) => void },
) {
  const {
    onProgress,
    ...mutationOptions
  } = options;
  return useMutation(
    async (file: File) => {
      const presignedUrl = await uploadImage(file, 0.8, presignedUrlType, onProgress);
      return presignedUrl.cdn;
    },
    mutationOptions,
  );
}
