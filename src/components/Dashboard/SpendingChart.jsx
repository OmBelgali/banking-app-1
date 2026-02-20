import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './SpendingChart.css';

const data = [
    { name: 'Mon', spending: 4000 },
    { name: 'Tue', spending: 3000 },
    { name: 'Wed', spending: 2000 },
    { name: 'Thu', spending: 2780 },
    { name: 'Fri', spending: 1890 },
    { name: 'Sat', spending: 2390 },
    { name: 'Sun', spending: 3490 },
];

const SpendingChart = () => {
    return (
        <div className="spending-chart">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ff8c00" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#ff8c00" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.05)" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255, 255, 255, 0.4)', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255, 255, 255, 0.4)', fontSize: 12 }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(8, 10, 15, 0.8)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            backdropFilter: 'blur(10px)',
                            color: 'white'
                        }}
                        itemStyle={{ color: '#ff8c00' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="spending"
                        stroke="#ff8c00"
                        fillOpacity={1}
                        fill="url(#colorSpending)"
                        strokeWidth={3}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SpendingChart;
