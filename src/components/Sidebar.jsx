import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1 className="title">Money Tracker</h1>
      <ul className="links">
        <li>
          <Link to="/">Перейти на головну сторінку</Link>
        </li>
        <li>
          <Link to="/add-expense-income">Додати прибуток/витрату</Link>
        </li>
        <li>
          <Link to="/compare-expense-income-by-month">Зрівняти прибутки/витрати за місяцями</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
