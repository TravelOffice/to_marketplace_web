export interface PostComment {
  code: string, // Auto-generated code from DynamoDB
  description?: string, // Description of the tour post
  tourPostId: string, // The ID of the tour post
  authorId: string, // Alias id of marketplace user that is auto-generated or set by user
  createdAt: number,
  updatedAt: number,
}

export type CreateCommentFormData = Pick<PostComment,
'tourPostId' |
'description'
>;
