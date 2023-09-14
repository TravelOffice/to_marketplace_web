export const CREATE_SUCCESS = 'Tạo thành công';

export const UPDATE_SUCCESS = 'Cập nhật thành công';

export const DELETE_SUCCESS = 'Xóa thành công';

export const ACCEPT_OFFER_SUCCESS = 'Ghép thành công';

export const REJECT_OFFER_SUCCESS = 'Tự chối ghép thành công';

export const CANCEL_OFFER_SUCCESS = 'Đã hủy yêu cầu';

export const SOMETHING_WRONG = 'Đã có lỗi xảy ra';

export const NUMBER_ITEM_PER_PAGE = 10;

export const UPDATE_AVATAR_SUCCESS = 'Cập nhật ảnh đại diện thành công';

export const UPDATE_AVATAR_ERROR = 'Cập nhật ảnh đại diện không thành công';

export const VALIDATION_MESSAGE = {
  required: (field: string) => `${field} không được để trống`,
  invalidPhoneNumber: () => 'Số điện thoại không hợp lệ',
  maxLength: (field: string, length: number) => `${field} không được vượt quá ${length} ký tự`,
};
