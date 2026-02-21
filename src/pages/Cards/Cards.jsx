import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Unlock, Copy, CheckCircle } from 'lucide-react';
import Footer from '../../components/Footer/Footer';
import './Cards.css';

const cardsData = [
    { id: 1, type: 'Kodbank Visa Platinum', number: '4532 **** **** 8901', holder: 'Om Belgali', expiry: '09/28', cvv: '***', balance: 185000, color: ['#ff8c00', '#ff0055'], frozen: false },
    { id: 2, type: 'Kodbank Mastercard Gold', number: '5412 **** **** 3345', holder: 'Om Belgali', expiry: '03/27', cvv: '***', balance: 72500, color: ['#3300ff', '#00c9ff'], frozen: true },
];

const Cards = () => {
    const [cards, setCards] = useState(cardsData);
    const [copied, setCopied] = useState(null);

    const toggleFreeze = (id) => {
        setCards(prev => prev.map(c => c.id === id ? { ...c, frozen: !c.frozen } : c));
    };

    const handleCopy = (number, id) => {
        navigator.clipboard.writeText(number.replace(/\*/g, '0'));
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="cards-page">
            <motion.div
                className="page-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div>
                    <h1>My Cards</h1>
                    <p>Manage and control all your Kodbank cards.</p>
                </div>
                <motion.button
                    className="btn-add-card"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    + Add New Card
                </motion.button>
            </motion.div>

            <div className="cards-grid">
                {cards.map((card, i) => (
                    <motion.div
                        key={card.id}
                        className={`card-wrapper ${card.frozen ? 'frozen' : ''}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.15 }}
                    >
                        {/* Visual Card */}
                        <motion.div
                            className="visual-card"
                            style={{ background: `linear-gradient(135deg, ${card.color[0]}, ${card.color[1]})` }}
                            whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                        >
                            {card.frozen && <div className="frozen-overlay"><Lock size={32} /><span>Card Frozen</span></div>}
                            <div className="card-top">
                                <span className="card-bank">Kodbank</span>
                                <div className="card-chip" />
                            </div>
                            <div className="card-number">{card.number}</div>
                            <div className="card-bottom">
                                <div>
                                    <div className="card-label">Card Holder</div>
                                    <div className="card-value">{card.holder}</div>
                                </div>
                                <div>
                                    <div className="card-label">Expires</div>
                                    <div className="card-value">{card.expiry}</div>
                                </div>
                                <div className="card-network">VISA</div>
                            </div>
                        </motion.div>

                        {/* Card Details */}
                        <div className="card-details glass-card">
                            <div className="card-info-row">
                                <div className="card-info-item">
                                    <span className="info-label">Card Type</span>
                                    <span className="info-value">{card.type}</span>
                                </div>
                                <div className="card-info-item">
                                    <span className="info-label">Balance</span>
                                    <span className="info-value accent">₹{card.balance.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                            <div className="card-actions">
                                <motion.button
                                    className={`card-btn ${card.frozen ? 'btn-unfreeze' : 'btn-freeze'}`}
                                    onClick={() => toggleFreeze(card.id)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {card.frozen ? <><Unlock size={16} /> Unfreeze</> : <><Lock size={16} /> Freeze</>}
                                </motion.button>
                                <motion.button
                                    className="card-btn btn-copy"
                                    onClick={() => handleCopy(card.number, card.id)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {copied === card.id ? <><CheckCircle size={16} /> Copied!</> : <><Copy size={16} /> Copy Number</>}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default Cards;
