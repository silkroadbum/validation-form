function Form() {
  return (
    <form className="form">
      <label className="form__label" htmlFor="name">
        Имя:
      </label>
      <input className="form__input" type="text" name="name" id="name" placeholder="Введите имя" />
      <label className="form__label" htmlFor="surname">
        Фамилия:
      </label>
      <input
        className="form__input"
        type="text"
        name="surname"
        id="surname"
        placeholder="Введите фамилию"
      />
      <label className="form__label" htmlFor="email">
        Email:*
      </label>
      <input
        className="form__input"
        type="text"
        name="email"
        id="email"
        required
        placeholder="Введите email"
      />
      <label className="form__label" htmlFor="category">
        Категория сообщения:*
      </label>
      <select className="form__input" name="category" id="category" defaultValue="" required>
        <option value="">Выберите категорию</option>
        <option value="technical">Техническая поддержка</option>
        <option value="payment">Оплата и доставка</option>
        <option value="warranty">Возврат и гарантия</option>
        <option value="reviews">Предложения и отзывы</option>
        <option value="advertising">Рекламные запросы</option>
      </select>
      <label className="form__label" htmlFor="message">
        Сообщение:*
      </label>
      <textarea
        className="form__input form__input--message"
        name="message"
        id="message"
        placeholder="Введите сообщение"
        required></textarea>
    </form>
  );
}

export default Form;
