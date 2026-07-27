const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'aether_secret_key_123';

// Register Endpoint
app.post('/api/auth/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// Login Endpoint
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, username: user.username });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Chat Endpoint
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ reply: 'Please provide a message.' });
    }

    const lowerMsg = message.toLowerCase();

    // 1. Sensitive Data Filter
    const sensitiveKeywords = ['otp', 'pin', 'password', 'account number'];
    if (sensitiveKeywords.some(keyword => lowerMsg.includes(keyword))) {
        return res.json({ reply: 'For security reasons, I cannot assist with sensitive information.' });
    }

    // 2. FAQ Logic
    const faq = {
        'upi limit': 'The daily UPI limit is ₹1,00,000.',
        'reset password': 'Go to Settings → Security → Reset Password.',
        'block card': 'Open Cards section → Block card immediately.'
    };

    for (const [key, value] of Object.entries(faq)) {
        if (lowerMsg.includes(key)) {
            return res.json({ reply: value });
        }
    }

    // 3. AI Fallback (Hugging Face)
    try {
        const response = await fetch(
            "https://router.huggingface.co/v1/chat/completions",
            {
                headers: {
                    "Authorization": `Bearer ${process.env.HF_TOKEN}`,
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    model: "Qwen/Qwen2.5-7B-Instruct",
                    messages: [{ role: "user", content: `As a professional banking assistant, provide a clear and short answer: ${message}` }],
                    max_tokens: 100
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`HF Error (${response.status}):`, errorText);
            return res.json({ reply: "I'm having trouble connecting to my AI brain. Please check your Hugging Face token permissions." });
        }

        const result = await response.json();
        const aiReply = result.choices?.[0]?.message?.content || "I'm sorry, I couldn't process your request.";
        res.json({ reply: aiReply.trim() });
    } catch (err) {
        console.error('HF Fetch Error:', err);
        res.status(500).json({ reply: 'Something went wrong with our AI assistant.' });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
