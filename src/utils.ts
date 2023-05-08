import { regEmail } from './const';
import { ValidFiledsType } from './types/types';

//Функция проверки на заполненность поля имени или фамилии
export const checkNameSurnameFields = (name: string, surname: string): boolean => {
  if (!name && !surname) {
    return false;
  } else {
    return true;
  }
};

//Функция проверки на заполненность поля email и соответствии его регулярному выражению
export const checkEmailFields = (value: string): boolean => {
  const isValidEmail = regEmail.test(value);
  if (value && isValidEmail) {
    return true;
  } else {
    return false;
  }
};

//Функция проверки поля категории на не пустое значение
export const checkCategoryField = (value: string): boolean => !!value;

//Функция проверки поля сообщения на количество символов больше 10
export const checkMessageFiled = (value: string): boolean => value.length >= 10;

//Функция проверки валидности полей состояния в компоненте форммы
export const checkForm = (obj: ValidFiledsType): boolean => {
  const isFormValid = Object.values(obj).every((valid) => valid);
  if (isFormValid) {
    return true;
  }
  return false;
};
