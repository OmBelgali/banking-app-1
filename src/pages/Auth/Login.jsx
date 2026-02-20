import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight } from 'lucide-react';
import styles from './Auth.module.css';

const Login = ({ setAuth }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await axios.post(`${apiUrl}/api/auth/login`, { username, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', res.data.username);
            setAuth(true);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className={styles.authContainer}>
            <div className="glow-orb glow-orange" style={{ top: '10%', left: '20%' }}></div>
            <div className="glow-orb glow-pink" style={{ bottom: '15%', right: '25%' }}></div>

            <motion.div
                className={`${styles.authCard} glass-card`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h2 className={styles.authTitle}>Aether Bank Login</h2>
                <p className={styles.authSubtitle}>Secure access to your wealth</p>

                <form onSubmit={handleLogin} className={styles.authForm}>
                    {error && <p className={styles.errorText}>{error}</p>}
                    <div className={styles.inputGroup}>
                        <User className={styles.inputIcon} size={20} />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <Lock className={styles.inputIcon} size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary glow-orange">
                        Login <ArrowRight size={18} />
                    </button>
                </form>

                <p className={styles.authFooter}>
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
