import React from "react";
import { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const ExpenseLineChart = ({ expenses }) => {


  const dailyData = expenses.reduce((acc, expense) => 
    {
    const date = new Date(expense.date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });


    const existing = acc.find((item) => item.date === date);
    if (existing) {
      existing.amount += Number(expense.amount);
    } else {
      acc.push({ date, amount: Number(expense.amount) });
    }
    return acc;
  }, []);

    dailyData.sort((a, b) =>
    new Date(a.date.split(" ").reverse().join(" ")) -
    new Date(b.date.split(" ").reverse().join(" "))
  );



  
  return (
    <div className="w-full h-[300px] mt-8">
      <h2 className="text-xl font-semibold text-center mb-4 text-foreground">Daily Expense Trend</h2>
      
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dailyData} margin={{ top: 10, right: 30, left: 0, bottom: 35 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#82ca9c"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 10 }}
            />
          </LineChart>
        </ResponsiveContainer>
    </div>
  );
};
export default ExpenseLineChart;
