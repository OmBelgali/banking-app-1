import React, { useState } from 'react';
import { DollarSign, TrendingUp, CreditCard, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import axios from 'axios';
import StatCard from './StatCard';
import SpendingChart from './SpendingChart';
import TransactionList from './TransactionList';
import NotificationModal from './NotificationModal';
import Footer from '../Footer/Footer';
import './Dashboard.css';

const Dashboard = () => {
    const username = sessionStorage.getItem('user') || 'Alex';
    const [balance, setBalance] = useState(null);
    const [showBalance, setShowBalance] = useState(false);

    // Modal State
    const [modal, setModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info'
    });

    const showNotification = (title, message, type = 'info') => {
        setModal({ isOpen: true, title, message, type });
    };

    const handleSendMoney = () => {
        showNotification('Transfer Initiated', 'Initiating secure transaction sequence for your Kodbank account...', 'info');
    };

    const handleCheckBalance = async () => {
        try {
            const res = await axios.get('/api/auth/balance', { withCredentials: true });
            setBalance(res.data.balance);
            setShowBalance(true);

            // Party Popper Effect
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff8c00', '#ff0055', '#3300ff']
            });

            showNotification('Balance Check', `Your current balance is ₹${res.data.balance.toLocaleString('en-IN')}`, 'success');
        } catch (err) {
            showNotification('Error', 'Failed to fetch balance. Please login again.', 'warning');
        }
    };

    const stats = [
        { title: 'Total Balance', amount: balance || 45231.89, trend: 'up', trendValue: 12.5, icon: <DollarSign size={24} />, color: 'orange' },
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
                    <h1>Welcome back, {username}</h1>
                    <p>Here's what's happening with your finance today.</p>
                </motion.div>
                <motion.div className="header-actions" variants={itemVariants}>
                    <button className="btn-secondary" onClick={handleCheckBalance}>Check Balance</button>
                    <button className="btn-primary glow-orange" onClick={handleSendMoney}>Send Money</button>
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

            <Footer />

            <NotificationModal
                isOpen={modal.isOpen}
                onClose={() => setModal({ ...modal, isOpen: false })}
                title={modal.title}
                message={modal.message}
                type={modal.type}
            />
        </motion.div>
    );
};

export default Dashboard;
