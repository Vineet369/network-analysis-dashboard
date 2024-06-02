
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis label={{ value: 'Alert Count', angle: -90, position: 'insideLeft' }} />
        <Tooltip 
        labelFormatter={(timestamp) => `Time: ${new Date(timestamp).toLocaleString()}`} 
        contentStyle={{ color: 'black' }}
          itemStyle={{ color: 'black' }}
        />
        <Legend verticalAlign="top" height={36} />
        <Line type="monotone" dataKey="alertCount" stroke="#FF00FF" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
