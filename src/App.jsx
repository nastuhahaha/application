import { Route, Routes } from 'react-router-dom';
import { Sidebar, Home, AddExpenseIncome, Compare } from './components';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-expense-income" element={<AddExpenseIncome />} />
          <Route path="/compare-expense-income-by-month" element={<Compare />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
