
import React from 'react';
// Note: In a real project, you would `npm install recharts`
// This code assumes recharts is available in the environment.
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, TimeFeeling } from '../types';

interface TimeChartProps {
  data: (Omit<Activity, 'icon' | 'feeling'> & {feeling?: TimeFeeling})[];
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6', '#F97316', '#6B7280'];

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
        <p className="font-semibold text-gray-800">{`${payload[0].name}`}</p>
        <p className="text-gray-600">{`Hours: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const TimeChart: React.FC<TimeChartProps> = ({ data }) => {
  const chartData = data.map(item => ({ name: item.name, value: item.hours }));
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius="80%"
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
        >
          {chartData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend iconSize={10} wrapperStyle={{fontSize: '12px', paddingTop: '10px'}}/>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TimeChart;
