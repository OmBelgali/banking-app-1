# Kodbank Banking Application

This application now features an AI-powered customer support chatbot.

## Getting Started

### Live Website 👇
https://banking-app-1-five.vercel.app/

### Local Development

1. **Backend**:
   - Navigate to `server/` directory.
   - Ensure `.env` contains your `HF_TOKEN`.
   - Run: `node index.js`
   
2. **Frontend**:
   - Run: `npm run dev`
   - The chatbot will appear as a floating bubble in the bottom right.

### Deployment

1. **Backend**:
   - Deploy the `server/` folder to a Node.js hosting provider (e.g., Vercel, Render).
   - Set environment variables: `HF_TOKEN`, `JWT_SECRET`, `DB_URL`.
   
2. **Frontend**:
   - Update `VITE_API_URL` in your production env or `.env` file to point to your deployed backend.
   - Run: `npm run build`
   - Deploy the `dist/` folder to any static hosting provider.

## Chatbot Features

- **FAQ**: Instant answers for "upi limit", "reset password", and "block card".
- **Security**: Professional filtering of sensitive keywords like OTP and PIN.
- **AI**: Powered by Meta's advanced `Llama-3.2-1B-Instruct` via the Hugging Face Router for fast and intelligent banking support.
