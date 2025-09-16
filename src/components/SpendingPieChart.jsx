

import { Pie, PieChart, Cell, Tooltip, Legend } from 'recharts'

const Colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EF5"];

const SpendingPieChart = ({ expenses }) => {
  const data = expenses.reduce((acc, curr) => {
    const found = acc.find((item) => item.name === curr.category);
    if (found) {
      found.value += Number(curr.amount);
    } else {
      acc.push({ name: curr.category, value: Number(curr.amount) });
    }
    return acc;
  }, []);

  return (
    <div>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={index} fill={Colors[index % Colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  )
}



export default SpendingPieChart
