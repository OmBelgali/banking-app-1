import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import './StatCard.css';

const StatCard = ({ title, amount, trend, trendValue, icon, color }) => {
    return (
        <div className="stat-card glass-card glass-card-hover">
            <div className="stat-header">
                <div className={`stat-icon-wrapper ${color}`}>
                    {icon}
                </div>
                <div className={`stat-trend ${trend}`}>
                    {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    <span>{trendValue}%</span>
                </div>
            </div>
            <div className="stat-content">
                <h3 className="stat-title">{title}</h3>
                <p className="stat-amount">₹{amount.toLocaleString('en-IN')}</p>
            </div>
        </div>
    );
};

export default StatCard;
