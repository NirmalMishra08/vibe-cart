import { Link, useLocation } from 'react-router-dom'
import { useAuth, UserButton } from '@clerk/clerk-react'
import { motion } from 'framer-motion'
import { ShoppingCart, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

const Header = () => {
    const { isSignedIn } = useAuth()
    const location = useLocation()
    const { cartItems } = useCart()

    const cartItemCount = cartItems?.reduce((sum, item) => sum + (item.qty || 0), 0) || 0

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-primary-200"
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2 group">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ShoppingBag className="w-8 h-8 text-primary-600" />
                        </motion.div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                            Vibe Cart
                        </span>
                    </Link>

                    <nav className="flex items-center space-x-6">
                        <Link
                            to="/"
                            className={`relative font-medium transition-colors ${location.pathname === '/'
                                ? 'text-primary-600'
                                : 'text-gray-600 hover:text-primary-600'
                                }`}
                        >
                            Products
                            {location.pathname === '/' && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500"
                                    initial={false}
                                />
                            )}
                        </Link>

                        <Link
                            to="/cart"
                            className="relative font-medium text-gray-600 hover:text-primary-600 transition-colors"
                        >
                            <div className="flex items-center space-x-2">
                                <ShoppingCart className="w-5 h-5" />
                                <span>Cart</span>
                                {cartItemCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                                    >
                                        {cartItemCount}
                                    </motion.span>
                                )}
                            </div>
                            {location.pathname === '/cart' && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500"
                                    initial={false}
                                />
                            )}
                        </Link>

                        {isSignedIn ? (
                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: 'w-10 h-10',
                                    },
                                }}
                            />
                        ) : (
                            <Link to="/sign-in" className="btn-primary text-sm">
                                Sign In
                            </Link>
                        )}
                    </nav>
                </div>
            </div>
        </motion.header>
    )
}

export default Header

