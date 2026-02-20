const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: true, // Allow all origins for Vercel preview/production
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET || 'aether_secret_key_123';

// Register Endpoint
app.post('/api/auth/register', async (req, res) => {
    const { uid, username, password, email, phone, role } = req.body;

    try {
        // Validation (basic)
        if (!uid || !username || !password || !email) {
            return res.status(400).json({ message: 'Missing required fields (UID, Username, Password, or Email)' });
        }

        const result = await db.query('SELECT * FROM KodUser WHERE username = $1 OR email = $2 OR uid = $3', [username, email, uid]);

        if (result.rows.length > 0) {
            const existing = result.rows[0];
            let msg = 'User already exists';
            if (existing.uid === uid) msg = 'User ID (UID) already taken';
            else if (existing.username === username) msg = 'Username already taken';
            else if (existing.email === email) msg = 'Email already taken';
            return res.status(400).json({ message: msg });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            'INSERT INTO KodUser (uid, username, password, email, phone, role) VALUES ($1, $2, $3, $4, $5, $6)',
            [uid, username, hashedPassword, email, phone, role || 'Customer']
        );

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Registration Error:', err);
        res.status(500).json({
            message: 'Server error during registration',
            error: err.message,
            code: err.code
        });
    }
});

// Login Endpoint
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await db.query('SELECT * FROM KodUser WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // JWT based on username as subject and role as claim
        const token = jwt.sign(
            { sub: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Store token in UserToken table
        const expiry = new Date(Date.now() + 3600000); // 1 hour
        await db.query(
            'INSERT INTO UserToken (token, uid, expiry) VALUES ($1, $2, $3)',
            [token, user.uid, expiry]
        );

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000
        });

        res.json({ success: true, username: user.username, role: user.role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Check Balance Endpoint (Protected)
app.get('/api/auth/balance', async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify JWT
        const decoded = jwt.verify(token, JWT_SECRET);
        const username = decoded.sub;

        // Fetch user information
        const result = await db.query('SELECT balance FROM KodUser WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ balance: user.balance });
    } catch (err) {
        console.error('Token verification failed:', err.message);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
});

// Logout
app.post('/api/auth/logout', async (req, res) => {
    const token = req.cookies.token;
    if (token) {
        await db.query('DELETE FROM UserToken WHERE token = $1', [token]);
    }
    res.clearCookie('token');
    res.json({ success: true });
});

// Export the app for Vercel
module.exports = app;
