import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY || PUBLISHABLE_KEY === 'pk_test_your_key_here') {
    console.warn('⚠️ Clerk Publishable Key not set! Please add VITE_CLERK_PUBLISHABLE_KEY to your .env file')
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {PUBLISHABLE_KEY ? (
            <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
                <App />
                <Toaster  reverseOrder={false} />
            </ClerkProvider>
        ) : (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: '20px',
                textAlign: 'center'
            }}>
                <h1 style={{ color: '#ef4444', marginBottom: '10px' }}>⚠️ Configuration Required</h1>
                <p style={{ color: '#666', marginBottom: '20px' }}>
                    Please set up your Clerk Publishable Key in the .env file
                </p>
                <p style={{ color: '#999', fontSize: '14px' }}>
                    Create a <code>.env</code> file in the frontend directory with:<br />
                    <code>VITE_CLERK_PUBLISHABLE_KEY=your_key_here</code>
                </p>
            </div>
        )}
    </React.StrictMode>,
)

