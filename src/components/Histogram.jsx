import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HistogramComponent = ({ data, dataKey, barKey, valueX, valueY }) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{
          top: 5, right: 10, left: 10, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis label={{ value: valueX, angle: 0, position: 'insidebottom' }} type="number" />
        <YAxis label={{ value: valueY, angle: -90, position: 'insidebottom' }} type="category" dataKey={dataKey} width={150} />
        <Tooltip
          formatter={(value, name, props) => [
            `${value}`, 
            `${name}: `
          ]}    
          labelFormatter={(label) => `Source IP: ${label}`}
          contentStyle={{ color: 'black' }}
          itemStyle={{ color: 'black' }}
        />
        <Legend verticalAlign="top" height={36} />
        <Bar dataKey={barKey} fill="#E30B5D" />
      </BarChart>
    </ResponsiveContainer>
  ); 
};

export default HistogramComponent;
