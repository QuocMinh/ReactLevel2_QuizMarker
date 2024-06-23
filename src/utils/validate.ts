import moment, { Moment } from 'moment';

export const isOver12YearsOld = (date: any) => {
  const today = moment();
  const birthDate = moment(date);
  const age = today.diff(birthDate, 'years');
  return age >= 12;
};

export const validatePassword = (_: any, password: string) => {
  if (password.length >= 6) {
    return Promise.resolve();
  }
  return Promise.reject('Mật khẩu phải có ít nhất 6 ký tự.');
};

export const validateAccout = (_: any, password: string) => {
  if (password.length >= 6) {
    return Promise.resolve();
  }
  return Promise.reject('Tài khoản phải có ít nhất 6 ký tự.');
};

export const validatePhoneNumber = (_: any, phoneNumber: string) => {
  // Xác thực số điện thoại ở đây, ví dụ: đảm bảo số điện thoại chỉ chứa các số và có đúng 10 ký tự.
  const phonePattern = /^[0-9]{10}$/;
  if (phonePattern.test(phoneNumber)) {
    return Promise.resolve();
  }
  return Promise.reject('Số điện thoại không hợp lệ.');
};

export const validateBirthDate = (_: any, birthDate: Moment) => {
  if (isOver12YearsOld(birthDate)) {
    return Promise.resolve();
  }
  return Promise.reject('Bạn phải trên 12 tuổi để đăng ký.');
};
