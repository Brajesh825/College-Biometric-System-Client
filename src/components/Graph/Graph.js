import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

const Graph = () => {
  const data = [
    { month: "jan", cse: "22", eee: "12", mech: "14" },
    { month: "feb", cse: "12", eee: "22", mech: "24" },
    { month: "apr", cse: "20", eee: "20", mech: "16" },
    { month: "may", cse: "22", eee: "12", mech: "14" },
    { month: "jun", cse: "12", eee: "22", mech: "24" },
    { month: "jul", cse: "20", eee: "20", mech: "16" },
  ];
  return (
    <div>
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="cse" stroke="red" strokeWidth={1}></Line>
        <Line type="monotone" dataKey="eee" stroke="yellow" strokeWidth={1}></Line>
        <Line type="monotone" dataKey="mech" stroke="blue" strokeWidth={1}></Line>
        <XAxis dataKey={data.month}></XAxis>
        <YAxis></YAxis>
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
  );
};

export default Graph;
