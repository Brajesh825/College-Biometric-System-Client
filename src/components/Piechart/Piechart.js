import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const data = [
  { name: 'Category 1', value: 400 },
  { name: 'Category 2', value: 300 },
  { name: 'Category 3', value: 200 },
  { name: 'Category 4', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Piechart = () => {
  return (
    <><h1>Hello</h1>
    <PieChart width={400} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend />
    </PieChart></>
  );
};

export default Piechart;
