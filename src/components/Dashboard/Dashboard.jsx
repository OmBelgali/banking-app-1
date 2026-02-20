import React from 'react';
import { DollarSign, TrendingUp, CreditCard, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import StatCard from './StatCard';
import SpendingChart from './SpendingChart';
import TransactionList from './TransactionList';
import './Dashboard.css';

const Dashboard = () => {
    const stats = [
        { title: 'Total Balance', amount: 45231.89, trend: 'up', trendValue: 12.5, icon: <DollarSign size={24} />, color: 'orange' },
        { title: 'Monthly Income', amount: 8432.50, trend: 'up', trendValue: 8.2, icon: <TrendingUp size={24} />, color: 'pink' },
        { title: 'Monthly Expenses', amount: 3120.45, trend: 'down', trendValue: 4.1, icon: <Activity size={24} />, color: 'blue' },
        { title: 'Total Savings', amount: 12450.00, trend: 'up', trendValue: 15.3, icon: <CreditCard size={24} />, color: 'orange' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <motion.div
            className="dashboard"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <header className="dashboard-header">
                <motion.div className="header-info" variants={itemVariants}>
                    <h1>Welcome back, Alex</h1>
                    <p>Here's what's happening with your finance today.</p>
                </motion.div>
                <motion.div className="header-actions" variants={itemVariants}>
                    <button className="btn-primary glow-orange">Send Money</button>
                </motion.div>
            </header>

            <motion.div className="stats-grid" variants={containerVariants}>
                {stats.map((stat, index) => (
                    <motion.div key={index} variants={itemVariants}>
                        <StatCard {...stat} />
                    </motion.div>
                ))}
            </motion.div>

            <div className="dashboard-main-grid">
                <motion.div className="main-content-left" variants={itemVariants}>
                    <div className="section-card glass-card">
                        <h2 className="section-title">Spending Analytics</h2>
                        <SpendingChart />
                    </div>
                </motion.div>
                <motion.div className="main-content-right" variants={itemVariants}>
                    <div className="section-card glass-card">
                        <h2 className="section-title">Recent Transactions</h2>
                        <TransactionList />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
