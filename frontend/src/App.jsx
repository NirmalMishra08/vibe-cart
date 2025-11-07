import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Products from './pages/Products'
import Cart from './pages/Cart'
import CheckoutSuccess from './pages/CheckoutSuccess'
import CheckoutCancel from './pages/CheckoutCancel'
import SignInPage from './pages/SignIn'
import SignUpPage from './pages/SignUp'
import { motion } from 'framer-motion'

function App() {
    const { isLoaded } = useAuth()

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full"
                />
            </div>
        )
    }

    return (
        <CartProvider>
            <Router>
                <div className="min-h-screen">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Products />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/success" element={<CheckoutSuccess />} />
                        <Route path="/cancel" element={<CheckoutCancel />} />
                        <Route path="/sign-in/*" element={<SignInPage />} />
                        <Route path="/sign-up/*" element={<SignUpPage />} />
                    </Routes>
                </div>
            </Router>
        </CartProvider>
    )
}

export default App

