import { regEmail } from './const';

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
