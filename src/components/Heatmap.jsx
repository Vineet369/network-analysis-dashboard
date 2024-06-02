
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';

const Heatmap = ({ data, xKey, yKey,valueX, valueY }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart
        margin={{ top: 20, right: 5, left: 0, bottom: 5 }}
      >
        <CartesianGrid />
        <XAxis 
          type="category" dataKey={xKey} name="Port" 
          label={{ value: valueX, angle: 0, position: 'insideBottom' }}
        />
        <YAxis 
          type="number" dataKey={yKey} name="Count" 
          label={{ value: valueY, angle: -90, position: 'insideLeft' }}
          />
        <ZAxis type="number" range={[100, 500]} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Count" data={data} fill="#0ABAB5" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default Heatmap;
