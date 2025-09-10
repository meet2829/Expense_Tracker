import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const MonthlyBarChart = ({ expenses }) => {
  // Convert dates to month-year and group by month
  const monthlyData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const key = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
    const found = acc.find((item) => item.month === key);

    if (found) {
      found.total += Number(expense.amount);
    } else {
      acc.push({ month: key, total: Number(expense.amount) });
    }
    return acc;
  }, []);

  return (
    <div className="w-full h-[300px] mt-8">
      <h2 className="text-xl font-semibold text-center mb-4 text-foreground">Monthly Expense Trends</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyBarChart;
