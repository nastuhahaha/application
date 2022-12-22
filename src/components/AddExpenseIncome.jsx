import React, { useState } from 'react';
import { useMoneyTracker } from '../contexts/MoneyTrackerContext';

const AddExpenseIncome = () => {
  const { addData } = useMoneyTracker();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: 'clothes',
    date: '',
  });

  const addDataHandler = (type) => {
    if (formData.title.length === 0 || formData.price.length === 0 || formData.date.length === 0)
      alert(
        'Опис має складатися щонайменше з 1 символу\nЦіна повина бути більша за нуль\nДата повина бути вибрана',
      );
    else {
      addData(type, formData);
      setFormData({
        title: '',
        price: '',
        category: 'clothes',
        date: '',
      });
    }
  };

  return (
    <div className="addExpenseIncome">
      <h1 className="title">Додати прибуток/витрату</h1>
      <div className="form">
        <input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          type="text"
          placeholder="title"
          className={formData.title && 'activeInput'}
        />
        <input
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          type="number"
          placeholder="price"
          className={formData.price && 'activeInput'}
        />
        <input
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          type="date"
          className={formData.date && 'activeInput'}
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className={formData.category && 'activeInput'}>
          <option value="clothes">Одяг</option>
          <option value="transport">Транспорт</option>
          <option value="food">Їжа</option>
          <option value="services">Послуги</option>
          <option value="other">Інше</option>
        </select>
        <div className="buttons">
          <button onClick={() => addDataHandler('income')}>Додати прибуток</button>
          <button onClick={() => addDataHandler('expense')}>Додати витрату</button>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseIncome;
