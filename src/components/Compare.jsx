import React, { useEffect, useState } from 'react';
import { useMoneyTracker } from '../contexts/MoneyTrackerContext';
import { monthNames } from '../constants/monthNames';

const Compare = () => {
  const { data, getMonthlyData } = useMoneyTracker();
  const [firstMonth, setFirstMonth] = useState('');
  const [secondMonth, setSecondMonth] = useState('');
  const [percent, setPercent] = useState(null);

  const removeInputsValue = () => {
    setFirstMonth('');
    setSecondMonth('');
  };

  useEffect(() => {
    if (firstMonth && secondMonth) {
      const firstMonthTotalPrice = getMonthlyData(data, firstMonth).reduce(
        (total, current) => total + current.price,
        0,
      );
      const secondMonthTotalPrice = getMonthlyData(data, secondMonth).reduce(
        (total, current) => total + current.price,
        0,
      );
      if (firstMonthTotalPrice && secondMonthTotalPrice) {
        setPercent(((secondMonthTotalPrice * 100) / firstMonthTotalPrice - 100).toFixed(1));
      } else {
        setPercent(null);
      }
    }
  }, [firstMonth, secondMonth]);

  return (
    <div className="compare">
      <h1 className="title">Зрівняти прибутки/витрати за місяцями</h1>
      <div className="inputs">
        <input value={firstMonth} onChange={(e) => setFirstMonth(e.target.value)} type="month" />
        <input value={secondMonth} onChange={(e) => setSecondMonth(e.target.value)} type="month" />
        <button onClick={removeInputsValue}>Видалити сортування</button>
      </div>
      <div>
        {firstMonth && secondMonth && percent && (
          <p>
            Відносно{' '}
            <span style={{ fontWeight: '600' }}>
              {monthNames[Number(firstMonth.split('-')[1]) - 1]} {firstMonth.split('-')[0]} року
            </span>{' '}
            ви збільшили {percent < 0 ? 'витрати' : 'добуток'} на {Math.abs(percent)}% ніж у{' '}
            <span style={{ fontWeight: '600' }}>
              {monthNames[Number(secondMonth.split('-')[1]) - 1]} {secondMonth.split('-')[0]} році
            </span>
            .
          </p>
        )}
      </div>
    </div>
  );
};

export default Compare;
