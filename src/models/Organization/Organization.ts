export interface Organization {
  code: string,
  name: string,
  email: string,
  phoneNumber: string,
  profilePicture?: string,
  address?: string,
  employeesCount?: number,
  foundedYear?: number,
  website?: string,
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    zalo?: string;
    instagram?: string;
  };
  creatorId: string,
  creatorName: string,
  createdAt: number,
  updatedAt: number,
}

export type CreateOrganizationPayload = Pick<Organization,
'name'
| 'email'
| 'phoneNumber'
| 'profilePicture'
| 'address'
| 'employeesCount'
| 'foundedYear'
| 'website'
| 'socialMedia'
>;

export type CreateOrganizationFormData = Omit<CreateOrganizationPayload, 'profilePicture'> & {
  profilePictureFiles?: FileList
};

export type UpdateOrganizationFormData = Omit<CreateOrganizationPayload, 'profilePicture'>;
