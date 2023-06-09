import { ChangeEvent, FormEvent, useRef, useState, useEffect } from 'react';
import { InputFormTypes } from '../../types/types';
import {
  checkNameSurnameFields,
  checkEmailFields,
  checkCategoryField,
  checkMessageFiled,
  checkForm,
} from '../../utils';

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    category: '',
    message: '',
    image: '',
  });
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [validFields, setValidFields] = useState({
    name: false,
    email: false,
    category: false,
    message: false,
  });
  const [validForm, setValidForm] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setValidForm(checkForm(validFields));
  }, [validFields]);

  const handlePickFile = () => {
    inputFileRef.current?.click();
  };

  const handleInput = (evt: InputFormTypes) => {
    const { name, value } = evt.target;
    if (name === 'name') {
      const isValidName = checkNameSurnameFields(value, formData.surname);
      setValidFields((prev) => ({ ...prev, name: isValidName }));
    }
    if (name === 'surname') {
      const isValidName = checkNameSurnameFields(formData.name, value);
      setValidFields((prev) => ({ ...prev, name: isValidName }));
    }
    if (name === 'email') {
      const isValidEmail = checkEmailFields(value);
      setValidFields((prev) => ({ ...prev, [name]: isValidEmail }));
    }
    if (name === 'category') {
      const isValidCategory = checkCategoryField(value);
      setValidFields((prev) => ({ ...prev, [name]: isValidCategory }));
    }
    if (name === 'message') {
      const isValidMessage = checkMessageFiled(value);
      setValidFields((prev) => ({ ...prev, [name]: isValidMessage }));
    }
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files && evt.target.files[0];
    if (file && Math.ceil(file.size / 1024) < 2048) {
      setFormData((prevState) => ({ ...prevState, image: file.name }));
      setFileName(file.name);
      setFileSize(file.size);
    } else if (file && Math.ceil(file.size / 1024) > 2048) {
      alert('Размер файла не может быть больше 2 МБ');
      setFileName('');
      setFileSize(0);
      setFormData((prevState) => ({ ...prevState, image: '' }));
    }
  };

  const onSubmitForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(JSON.stringify(formData));
    setFileName('');
    setFileSize(0);
    formRef.current?.reset();
  };

  return (
    <form
      className={`form ${validForm ? '' : 'form--error'}`}
      ref={formRef}
      method="post"
      encType="multipart/form-data"
      onSubmit={onSubmitForm}>
      <div className="form__top-block">
        <div className="form__left-block">
          <label className="form__label">
            Имя:
            <input
              className={`form__input ${validFields.name ? '' : 'form__input--error'}`}
              onChange={handleInput}
              type="text"
              name="name"
              placeholder="Введите имя"
            />
            <span className="form__input-signature">
              Поле Имя или Фамилия должны быть заполнены
            </span>
          </label>

          <label className="form__label">
            Фамилия:
            <input
              className={`form__input ${validFields.name ? '' : 'form__input--error'}`}
              onChange={handleInput}
              type="text"
              name="surname"
              placeholder="Введите фамилию"
            />
            <span className="form__input-signature">
              Поле Имя или Фамилия должны быть заполнены
            </span>
          </label>
        </div>
        <div className="form__right-block">
          <label className="form__label">
            Email:*
            <input
              className={`form__input ${validFields.email ? '' : 'form__input--error'}`}
              onChange={handleInput}
              type="text"
              name="email"
              required
              placeholder="Введите email"
            />
            <span className="form__input-signature">Поле email должно быть заполнено</span>
          </label>

          <label className="form__label">
            Категория сообщения:*
            <select
              className={`form__input ${validFields.category ? '' : 'form__input--error'}`}
              onChange={handleInput}
              name="category"
              defaultValue=""
              required>
              <option value="" disabled>
                Выберите категорию
              </option>
              <option value="technical">Техническая поддержка</option>
              <option value="payment">Оплата и доставка</option>
              <option value="warranty">Возврат и гарантия</option>
              <option value="reviews">Предложения и отзывы</option>
              <option value="advertising">Рекламные запросы</option>
            </select>
            <span className="form__input-signature">Обязательное поле, выберите категорию</span>
          </label>
        </div>
      </div>
      <label className="form__label" htmlFor="message">
        Сообщение:*
        <textarea
          className={`form__input form__input--message ${
            validFields.message ? '' : 'form__input--error'
          }`}
          onChange={handleInput}
          name="message"
          id="message"
          placeholder="Введите сообщение"
          minLength={10}
          required></textarea>
        <span className="form__input-signature">Обязательное поле, минимум 10 символов</span>
      </label>

      <div className="form__file-block">
        <label className="form__label" htmlFor="image">
          Выберите изображение (JPG,PNG):
          <button className="button button--input-file" onClick={handlePickFile} type="button">
            Выберите файл
          </button>
          <p className="form__file-name">
            {fileName ? fileName : 'Файл не выбран'}
            {fileSize ? ` - ${Math.ceil(fileSize / 1024)} КБ` : ''}
          </p>
          <input
            className="form__input-file visually-hidden"
            ref={inputFileRef}
            onChange={handleFileInput}
            type="file"
            name="image"
            id="image"
            accept="image/jpg, image/png"
          />
        </label>
      </div>
      <div className="form__bottom-block">
        <span className="form__text">*-обязательные поля</span>
        <button className="button button--submit" type="submit" disabled={!validForm}>
          Отправить
        </button>
      </div>
    </form>
  );
}

export default Form;
