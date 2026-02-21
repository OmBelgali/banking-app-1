import React from 'react';
import { ShoppingBag, Coffee, Laptop, Home, ArrowUp, ArrowDown } from 'lucide-react';
import './TransactionList.css';

const transactions = [
    { id: 1, name: 'Apple Store', date: 'Feb 20, 2026', amount: -999.00, icon: <Laptop size={18} />, category: 'Technology', status: 'Completed' },
    { id: 2, name: 'Starbucks Coffee', date: 'Feb 19, 2026', amount: -15.50, icon: <Coffee size={18} />, category: 'Food & Drink', status: 'Completed' },
    { id: 3, name: 'Salary Deposit', date: 'Feb 18, 2026', amount: 5000.00, icon: <ArrowUp size={18} />, category: 'Income', status: 'Completed', type: 'credit' },
    { id: 4, name: 'Amazon Prime', date: 'Feb 17, 2026', amount: -14.99, icon: <ShoppingBag size={18} />, category: 'Subscription', status: 'Pending' },
    { id: 5, name: 'Monthly Rent', date: 'Feb 15, 2026', amount: -1200.00, icon: <Home size={18} />, category: 'Housing', status: 'Completed' },
];

const TransactionList = () => {
    return (
        <div className="transaction-list">
            {transactions.map((tx) => (
                <div key={tx.id} className="transaction-item">
                    <div className={`transaction-icon-wrapper ${tx.type === 'credit' ? 'credit' : 'debit'}`}>
                        {tx.icon}
                    </div>
                    <div className="transaction-info">
                        <p className="transaction-name">{tx.name}</p>
                        <p className="transaction-meta">{tx.category} • {tx.date}</p>
                    </div>
                    <div className="transaction-amount-wrapper">
                        <p className={`transaction-amount ${tx.type === 'credit' ? 'positive' : 'negative'}`}>
                            {tx.type === 'credit' ? '+' : '-'}₹{Math.abs(tx.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </p>
                        <p className={`transaction-status ${tx.status.toLowerCase()}`}>{tx.status}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TransactionList;
