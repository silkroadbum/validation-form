import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { InputFormTypes } from '../../types/types';

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    category: '',
    image: '',
  });
  const [fileName, setFileName] = useState('');
  const inputFileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handlePickFile = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleInput = (evt: InputFormTypes) => {
    const { name, value } = evt.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files && evt.target.files[0];
    if (file) {
      setFormData((prevState) => ({ ...prevState, image: file.name }));
      setFileName(file.name);
    }
  };

  const onSubmitForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(JSON.stringify(formData));
    if (formRef.current) {
      formRef.current.reset();
      setFileName('');
    }
  };

  return (
    <form
      className="form"
      ref={formRef}
      method="post"
      encType="multipart/form-data"
      onSubmit={onSubmitForm}>
      <div className="form__top-block">
        <div className="form__left-block">
          <label className="form__label" htmlFor="name">
            Имя:
          </label>
          <input
            className="form__input"
            onChange={handleInput}
            type="text"
            name="name"
            id="name"
            placeholder="Введите имя"
          />
          <label className="form__label" htmlFor="surname">
            Фамилия:
          </label>
          <input
            className="form__input"
            onChange={handleInput}
            type="text"
            name="surname"
            id="surname"
            placeholder="Введите фамилию"
          />
        </div>
        <div className="form__right-block">
          <label className="form__label" htmlFor="email">
            Email:*
          </label>
          <input
            className="form__input"
            onChange={handleInput}
            type="text"
            name="email"
            id="email"
            required
            placeholder="Введите email"
          />
          <label className="form__label" htmlFor="category">
            Категория сообщения:*
          </label>
          <select
            className="form__input"
            onChange={handleInput}
            name="category"
            id="category"
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
        </div>
      </div>
      <label className="form__label" htmlFor="message">
        Сообщение:*
      </label>
      <textarea
        className="form__input form__input--message"
        onChange={handleInput}
        name="message"
        id="message"
        placeholder="Введите сообщение"
        required></textarea>
      <div className="form__file-block">
        <label className="form__label" htmlFor="image">
          Выберите изображение (JPG,PNG):
        </label>
        <button className="button button--input-file" onClick={handlePickFile} type="button">
          Выберите файл
        </button>
        <p className="form__file-name">{fileName ? fileName : 'Файл не выбран'}</p>
        <input
          className="form__input-file visually-hidden"
          ref={inputFileRef}
          onChange={handleFileInput}
          type="file"
          name="image"
          id="image"
          accept="image/jpg, image/png"
        />
      </div>
      <div className="form__bottom-block">
        <span className="form__text">*-обязательные поля</span>
        <button className="button button--submit" type="submit">
          Отправить
        </button>
      </div>
    </form>
  );
}

export default Form;
