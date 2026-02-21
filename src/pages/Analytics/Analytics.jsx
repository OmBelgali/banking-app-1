import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Footer from '../../components/Footer/Footer';
import './Analytics.css';

const monthlyData = [
    { month: 'Sep', income: 82000, expenses: 41000 },
    { month: 'Oct', income: 89000, expenses: 53000 },
    { month: 'Nov', income: 76000, expenses: 48000 },
    { month: 'Dec', income: 96000, expenses: 67000 },
    { month: 'Jan', income: 91000, expenses: 55000 },
    { month: 'Feb', income: 105000, expenses: 61000 },
];

const categoryData = [
    { name: 'Food & Dining', value: 18000, color: '#ff8c00' },
    { name: 'Shopping', value: 14000, color: '#ff0055' },
    { name: 'Transport', value: 8000, color: '#3300ff' },
    { name: 'Utilities', value: 11000, color: '#00c9ff' },
    { name: 'Entertainment', value: 10000, color: '#a855f7' },
];

const formatINR = (value) => `₹${value.toLocaleString('en-IN')}`;

const Analytics = () => {
    return (
        <div className="analytics-page">
            <motion.div
                className="page-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div>
                    <h1>Analytics</h1>
                    <p>Track your financial patterns and wealth trends.</p>
                </div>
            </motion.div>

            {/* Summary Cards */}
            <motion.div
                className="analytics-summary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                {[
                    { label: 'Total Income', value: '₹1,05,000', change: '+12.4%', up: true },
                    { label: 'Total Expenses', value: '₹61,000', change: '+8.1%', up: false },
                    { label: 'Net Savings', value: '₹44,000', change: '+18.2%', up: true },
                    { label: 'Savings Rate', value: '41.9%', change: '+3.1%', up: true },
                ].map((item, i) => (
                    <div className="summary-card glass-card" key={i}>
                        <span className="summary-label">{item.label}</span>
                        <span className="summary-value">{item.value}</span>
                        <span className={`summary-change ${item.up ? 'up' : 'down'}`}>{item.change}</span>
                    </div>
                ))}
            </motion.div>

            {/* Charts Grid */}
            <div className="analytics-grid">
                {/* Income vs Expenses Chart */}
                <motion.div
                    className="chart-card glass-card"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="chart-title">Income vs Expenses</h2>
                    <p className="chart-sub">Last 6 months overview</p>
                    <ResponsiveContainer width="100%" height={260}>
                        <AreaChart data={monthlyData}>
                            <defs>
                                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ff8c00" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#ff8c00" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ff0055" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#ff0055" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} />
                            <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                            <Tooltip
                                contentStyle={{ background: 'rgba(8,10,15,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white' }}
                                formatter={(v, name) => [formatINR(v), name]}
                            />
                            <Area type="monotone" dataKey="income" name="Income" stroke="#ff8c00" fill="url(#incomeGrad)" strokeWidth={2} />
                            <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#ff0055" fill="url(#expenseGrad)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Category Breakdown */}
                <motion.div
                    className="chart-card glass-card"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <h2 className="chart-title">Spending by Category</h2>
                    <p className="chart-sub">February 2026</p>
                    <div className="pie-container">
                        <ResponsiveContainer width="50%" height={220}>
                            <PieChart>
                                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={3}>
                                    {categoryData.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(v) => formatINR(v)} contentStyle={{ background: 'rgba(8,10,15,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="pie-legend">
                            {categoryData.map((item, i) => (
                                <div className="legend-item" key={i}>
                                    <span className="legend-dot" style={{ background: item.color }} />
                                    <div className="legend-info">
                                        <span className="legend-name">{item.name}</span>
                                        <span className="legend-value">{formatINR(item.value)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default Analytics;
