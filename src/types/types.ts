import { ChangeEvent } from 'react';

export type InputFormTypes =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLSelectElement>
  | ChangeEvent<HTMLTextAreaElement>;

export type ValidFiledsType = {
  name: boolean;
  email: boolean;
  category: boolean;
  message: boolean;
};
