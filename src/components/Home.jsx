import React, { useEffect, useState } from 'react';
import { useMoneyTracker } from '../contexts/MoneyTrackerContext';
import { BsTrash } from 'react-icons/bs';
import Chart from './Chart';

const Home = () => {
  const { data, getMonthlyData, removeData } = useMoneyTracker();
  const [yearAndMonth, setYearAndMonth] = useState('');
  const [category, setCategory] = useState('all');
  const [sortedData, setSortedData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const removeSort = () => {
    setYearAndMonth('');
    setCategory('all');
    setSortedData(data);
  };

  useEffect(() => {
    if (yearAndMonth.length > 0) {
      setSortedData(() =>
        getMonthlyData(
          category === 'all' ? data : data.filter((o) => o.category === category),
          yearAndMonth,
        ),
      );
    } else {
      setSortedData(category === 'all' ? data : data.filter((o) => o.category === category));
    }
  }, [yearAndMonth, category, data]);

  useEffect(() => {
    setTotalPrice(sortedData.reduce((total, current) => total + current.price, 0));
  }, [sortedData]);

  return (
    <div className="home">
      <h1 className="title">
        <span>{totalPrice}₴</span>
        <p>Загальна сума витрат/прибутку</p>
      </h1>
      <div className="sort">
        <input
          value={yearAndMonth}
          onChange={(e) => setYearAndMonth(e.target.value)}
          type="month"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">Усі</option>
          <option value="clothes">Одяг</option>
          <option value="transport">Транспорт</option>
          <option value="food">Їжа</option>
          <option value="services">Послуги</option>
          <option value="other">Інше</option>
        </select>
        <button onClick={removeSort}>Видалити сортування</button>
      </div>
      <div>{sortedData.length > 0 && <Chart sortedData={sortedData} />}</div>
      <div className="dataList">
        {sortedData.map((o) => (
          <div className="dataItem" key={o.id}>
            <div>
              <p>{o.title}</p>
              <p>{o.category}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div>
                <p>{o.price}₴</p>
                <p>{o.date}</p>
              </div>
              <BsTrash onClick={() => removeData(o.id)} className="removeItemBtn" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
