import React from 'react';
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import data from '../data/data';

const LineBarAreaComposedChart = () => (
  <ResponsiveContainer width="100%" height={200}>
    <ComposedChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip labelStyle={{ color: 'black' }} itemStyle={{ color: 'black' }} cursor={false} />
      <Legend />
      <CartesianGrid stroke="#f5f5f5" />
      <Area type="monotone" dataKey="amt" fill="#19A6D2" stroke="#19A6D2" />
      <Bar dataKey="pv" barSize={20} fill="#6200EE" />
      <Line type="monotone" dataKey="uv" stroke="#59AA2B" />
    </ComposedChart>
  </ResponsiveContainer>
);

export default LineBarAreaComposedChart;
