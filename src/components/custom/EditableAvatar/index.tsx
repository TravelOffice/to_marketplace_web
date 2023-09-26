import React, { useCallback, useRef, useState } from 'react';
import { FiCamera } from 'react-icons/fi';
import ProgressBar from '@/components/base/ProgressBar';
import { useUploadImageMutation } from '@/hooks/file';
import { PresignedUrlType } from '@/models/PresignedUrl';

export interface EditableAvatarProps {
  defaultAvatar: string, // Default avatar
  presignedUrlType: PresignedUrlType,
  onAvatarUploaded?: (avatar: string) => void, // Callback when avatar uploaded
  generateFilename?: (file: File) => string, // Default: file.name
  editable?: boolean,
}

export default function EditableAvatar(props: EditableAvatarProps) {
  const {
    defaultAvatar,
    presignedUrlType,
    onAvatarUploaded,
    generateFilename,
    editable = true,
  } = props;
  const [avatar, setAvatar] = useState<string>(defaultAvatar);
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0); // [0, 100]
  const ref = useRef<HTMLInputElement>(null);

  // Mutation to upload file
  const uploadFileMutation = useUploadImageMutation(presignedUrlType, {
    onSuccess: (avatarUrl) => {
      onAvatarUploaded?.(avatarUrl);
    },
    onSettled: () => {
      setUploading(false);
      setProgress(0);
    },
    onProgress: (progressInFloat) => {
      setProgress(progressInFloat * 100);
    },
  });

  // Handle upload file
  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatar(URL.createObjectURL(file));
    setUploading(true);
    // Generate new file with new filename
    const newFile = new File([file], generateFilename?.(file) || file.name, { type: file.type });
    uploadFileMutation.mutate(newFile);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-full group/avatar">
      <img
        src={avatar}
        alt=""
        className="w-32 h-32 rounded-full mx-auto object-cover"
      />
      {
        editable && !uploading && (
          <button
            type="button"
            className="absolute inset-0 bg-neutral-700/50 hidden flex-col text-sm text-white items-center justify-center group-hover/avatar:flex"
            onClick={() => ref.current?.click()}
          >
            <FiCamera className="w-7 h-7 mb-1 mt-3" />
            <span>
              Thay đổi
            </span>
          </button>
        )
      }
      {
        uploading && (
          <div
            className="absolute inset-0 bg-neutral-700/50 flex flex-col items-center justify-center"
          >
            <div className="w-2/3 mb-1 mt-3">
              <ProgressBar progress={progress} />
            </div>
          </div>
        )
      }
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
    </div>
  );
}
