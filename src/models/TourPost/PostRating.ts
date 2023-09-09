export interface PostRating {
  code: string, // Auto-generated code from DynamoDB
  star: number, // Number of start
  description?: string, // Description of the tour post
  tourPostId: string, // The ID of the tour post
  authorId: string, // Alias id of marketplace user that is auto-generated or set by user
  organization: string, // The ID of the organization
  createdAt: number,
  updatedAt: number,
}

export type CreatePostRatingFormData = Pick<PostRating, 'star' | 'description'>;

export type UpdatePostRatingFormData = CreatePostRatingFormData;
