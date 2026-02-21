import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Landmark, Bitcoin, PiggyBank, BarChart3 } from 'lucide-react';
import Footer from '../../components/Footer/Footer';
import './Assets.css';

const assetGroups = [
    {
        title: 'Savings Accounts',
        icon: <PiggyBank size={22} />,
        color: '#ff8c00',
        items: [
            { name: 'Kodbank Savings A/C', value: 285000, change: '+2.1%', up: true },
            { name: 'Fixed Deposit (1 Yr)', value: 150000, change: '+6.5%', up: true },
        ]
    },
    {
        title: 'Investments',
        icon: <BarChart3 size={22} />,
        color: '#00c9ff',
        items: [
            { name: 'Nifty 50 Index Fund', value: 92000, change: '+14.3%', up: true },
            { name: 'Gold ETF', value: 48000, change: '+8.2%', up: true },
            { name: 'US Tech Fund', value: 35000, change: '-3.1%', up: false },
        ]
    },
    {
        title: 'Crypto Portfolio',
        icon: <Bitcoin size={22} />,
        color: '#a855f7',
        items: [
            { name: 'Bitcoin (BTC)', value: 71200, change: '+5.8%', up: true },
            { name: 'Ethereum (ETH)', value: 28500, change: '-1.4%', up: false },
        ]
    },
];

const totalAssets = assetGroups.flatMap(g => g.items).reduce((sum, item) => sum + item.value, 0);

const Assets = () => {
    return (
        <div className="assets-page">
            <motion.div
                className="page-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div>
                    <h1>My Assets</h1>
                    <p>A complete overview of your portfolio and investments.</p>
                </div>
            </motion.div>

            {/* Net Worth Card */}
            <motion.div
                className="net-worth-card glass-card"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <div className="net-worth-left">
                    <Landmark size={32} className="nw-icon" />
                    <div>
                        <span className="nw-label">Total Net Worth</span>
                        <span className="nw-value">₹{totalAssets.toLocaleString('en-IN')}</span>
                    </div>
                </div>
                <div className="nw-badge">
                    <TrendingUp size={16} />
                    <span>+9.4% this year</span>
                </div>
            </motion.div>

            {/* Asset Groups */}
            <div className="asset-groups">
                {assetGroups.map((group, gi) => (
                    <motion.div
                        key={gi}
                        className="asset-group glass-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 + gi * 0.1 }}
                    >
                        <div className="group-header">
                            <span className="group-icon" style={{ color: group.color }}>{group.icon}</span>
                            <h2 className="group-title">{group.title}</h2>
                            <span className="group-total" style={{ color: group.color }}>
                                ₹{group.items.reduce((s, i) => s + i.value, 0).toLocaleString('en-IN')}
                            </span>
                        </div>
                        <div className="asset-list">
                            {group.items.map((item, ii) => (
                                <div className="asset-item" key={ii}>
                                    <span className="asset-name">{item.name}</span>
                                    <div className="asset-right">
                                        <span className="asset-value">₹{item.value.toLocaleString('en-IN')}</span>
                                        <span className={`asset-change ${item.up ? 'up' : 'down'}`}>
                                            {item.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                            {item.change}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default Assets;
