
import { BarChart, Bar, XAxis,Cell, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
const Colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a28ef5"];
const MonthlyBarChart = ({ expenses }) => {

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
        <BarChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" radius={[10, 10, 0, 0]} >
            {monthlyData.map((_, index) => (
              <Cell key={index} fill={Colors[index % Colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default MonthlyBarChart;