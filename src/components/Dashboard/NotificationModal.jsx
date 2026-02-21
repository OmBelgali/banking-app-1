import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import './NotificationModal.css';

const NotificationModal = ({ isOpen, onClose, title, message, type = 'info' }) => {
    const icons = {
        success: <CheckCircle className="icon-success" size={24} />,
        info: <Info className="icon-info" size={24} />,
        warning: <AlertTriangle className="icon-warning" size={24} />
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="modal-overlay">
                    <motion.div
                        className="modal-content glass-card"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        <div className="modal-header">
                            <div className="title-section">
                                {icons[type]}
                                <h3>{title}</h3>
                            </div>
                            <button className="close-btn" onClick={onClose}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{message}</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-primary" onClick={onClose}>Got it</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default NotificationModal;
