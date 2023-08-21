export interface OrgFeedback {
  code: string, // Auto-generated code from DynamoDB
  description?: string, // Description of the tour post
  organization: string, // The ID of the Organization
  authorId: string, // Alias id of marketplace user that is auto-generated or set by user
  createdAt: number,
  updatedAt: number,
}
