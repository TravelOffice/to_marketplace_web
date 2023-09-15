export interface PresignedUrl {
  url: string,
  key: string,
  cdn: string,
}

export enum PresignedUrlType {
  USER_AVATAR = 'USER_AVATAR',
  ORG_PROFILE_PICTURE = 'ORG_PROFILE_PICTURE',
  POST_THUMBNAIL = 'POST_THUMBNAIL',
}
