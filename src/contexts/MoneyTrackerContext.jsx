import { createContext, useContext, useEffect, useState } from 'react';
import {DataModel} from '../classes/DataModel'

const MoneyTrackerContext = createContext();

export const useMoneyTracker = () => useContext(MoneyTrackerContext);

export const MoneyTrackerProvider = ({ children }) => {
  // INITIAL DATA
  const [data, setData] = useState([
    {
      id: 1,
      title: 'Title 1',
      price: 1000,
      category: 'clothes',
      date: '2022-12-03',
    },
    {
      id: 2,
      title: 'Title 2',
      price: 1000,
      category: 'transport',
      date: '2022-12-04',
    },
    {
      id: 4,
      title: 'Title 4',
      price: 200,
      category: 'transport',
      date: '2021-12-06',
    },
    {
      id: 5,
      title: 'Title 5',
      price: 1000,
      category: 'transport',
      date: '2022-11-01',
    },
    {
      id: 3,
      title: 'Title 3',
      price: 500,
      category: 'food',
      date: '2022-11-01',
    },
  ]);

  // ADD DATA
  const addData = (type, formData) => {
    const id = data.length > 0 ? data[data.length - 1].id + 1 : 0;
    const price =
        type === 'expense'
            ? -1 * Number(formData.price.replace(/[^\d]/g, ''))
            : Number(formData.price.replace(/[^\d]/g, ''));
    const { title, category, date } = formData;
    setData([...data, new DataModel(id, title, price, category, date)]);
  };

  const removeData = (id) => {
    setData((prev) => prev.filter((o) => o.id !== id));
  };

  // DATA BY MONTH
  const getMonthlyData = (array, yearAndMonth) => {
    return array.filter((o) => o.date.split('-')[0] + '-' + o.date.split('-')[1] === yearAndMonth);
  };

  const value = {
    data,
    removeData,
    addData,
    getMonthlyData,
  };

  return <MoneyTrackerContext.Provider value={value}>{children}</MoneyTrackerContext.Provider>;
};
