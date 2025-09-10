import React from 'react';
import { useSelector } from 'react-redux';
import SpendingPieChart from '../components/SpendingPieChart';
import MonthlyBarChart from '../components/MonthlyBarChart';
import ExpenseLineChart from '../components/ExpenseLineChart';
import CategoryBarChart from '../components/CategoryBarChart';

const Dashboard = () => {
  const expenses = useSelector((state) => state.expenses.items); 

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 m-10 bg-gray-50 ">
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-bold text-blue-600 mb-4 border-b-2 border-blue-100 w-full text-center tracking-wide">Spending Distribution</h3>
          <SpendingPieChart expenses={expenses} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-bold text-green-600 mb-4 border-b-2 border-green-100 w-full text-center tracking-wide">Monthly Breakdown</h3>
          <MonthlyBarChart expenses={expenses} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-bold text-purple-600 mb-4 border-b-2 border-purple-100 w-full text-center tracking-wide">Trends Over Time</h3>
          <ExpenseLineChart expenses={expenses} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-bold text-yellow-600 mb-4 border-b-2 border-yellow-100 w-full text-center tracking-wide">Category Comparison</h3>
          <CategoryBarChart expenses={expenses} />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
