import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import styles from './Auth.module.css';

const Register = () => {
    const [formData, setFormData] = useState({
        uid: '',
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        role: 'Customer'
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }

        try {
            await axios.post('/api/auth/register', formData);
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
                                name="uid"
                                type="text"
                                placeholder="User ID (UID)"
                                value={formData.uid}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <User className={styles.inputIcon} size={20} />
                            <input
                                name="username"
                                type="text"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <User className={styles.inputIcon} size={20} />
                            <input
                                name="email"
                                type="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <User className={styles.inputIcon} size={20} />
                            <input
                                name="phone"
                                type="text"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <Lock className={styles.inputIcon} size={20} />
                            <input
                                name="password"
                                type="password"
                                placeholder="Create Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <Lock className={styles.inputIcon} size={20} />
                            <input
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <ShieldCheck className={styles.inputIcon} size={20} />
                            <select name="role" value={formData.role} onChange={handleChange}>
                                <option value="Customer">Customer</option>
                            </select>
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
