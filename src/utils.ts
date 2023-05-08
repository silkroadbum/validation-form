import { regEmail } from './const';
import { ValidFiledsType } from './types/types';

export const checkNameSurnameFields = (name: string, surname: string): boolean => {
  if (!name && !surname) {
    return false;
  } else {
    return true;
  }
};

export const checkEmailFields = (value: string): boolean => {
  const isValidEmail = regEmail.test(value);
  if (value && isValidEmail) {
    return true;
  } else {
    return false;
  }
};

export const checkCategoryField = (value: string): boolean => !!value;

export const checkMessageFiled = (value: string): boolean => value.length >= 10;

export const checkForm = (obj: ValidFiledsType): boolean => {
  const isFormValid = Object.values(obj).every((valid) => valid);
  if (isFormValid) {
    console.log('форма валидна');
    return true;
  }
  console.log('форма не валидна');
  return false;
};
