import React, { useEffect, useState } from "react";
import API from "../api";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Link } from "react-router-dom";

const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28", "#AA336A"];

function ChartPage() {
  const [txns, setTxns] = useState([]);
  useEffect(() => {
    API.get("/transactions")
      .then((r) => setTxns(r.data))
      .catch(() => {});
  }, []);

  const data = [];
  const map = {};
  txns.forEach((t) => {
    if (map[t.category]) map[t.category] += Number(t.amount);
    else map[t.category] = Number(t.amount);
  });
  for (const k in map) data.push({ name: k, value: map[k] });

  return (
    <div className="container">
      <h2>Expenses/Income by Category</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      <Link to="/" className="btn">
        Back
      </Link>
    </div>
  );
}

export default ChartPage;
