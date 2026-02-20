import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import styles from './Auth.module.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        try {
            await axios.post('/api/auth/register', { username, password });
            setSuccess(true);
            setError('');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className={styles.authContainer}>
            <div className="glow-orb glow-orange" style={{ top: '10%', right: '20%' }}></div>
            <div className="glow-orb glow-pink" style={{ bottom: '15%', left: '25%' }}></div>

            <motion.div
                className={`${styles.authCard} glass-card`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <h2 className={styles.authTitle}>Join Aether Bank</h2>
                <p className={styles.authSubtitle}>Start your premium journey today</p>

                {success ? (
                    <div className={styles.successBox}>
                        <ShieldCheck size={48} color="#10b981" />
                        <p>Registration Successful! Redirecting...</p>
                    </div>
                ) : (
                    <form onSubmit={handleRegister} className={styles.authForm}>
                        {error && <p className={styles.errorText}>{error}</p>}
                        <div className={styles.inputGroup}>
                            <User className={styles.inputIcon} size={20} />
                            <input
                                type="text"
                                placeholder="Choose Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <Lock className={styles.inputIcon} size={20} />
                            <input
                                type="password"
                                placeholder="Create Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <Lock className={styles.inputIcon} size={20} />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary glow-orange">
                            Create Account <ArrowRight size={18} />
                        </button>
                    </form>
                )}

                <p className={styles.authFooter}>
                    Already member? <Link to="/login">Login</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
