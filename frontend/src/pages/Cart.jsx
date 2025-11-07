import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import toast from "react-hot-toast"

const Cart = () => {
    const { cartItems, total, removeFromCart, loading } = useCart()
    const { isSignedIn, getToken } = useAuth()
    const navigate = useNavigate()
    const [processing, setProcessing] = useState(false)

    const handleCheckout = async () => {
        if (!isSignedIn) {
            toast.error('Please sign in to checkout')
            return
        }

        if (cartItems.length === 0) {
            toast.error('Your cart is empty')
            return
        }

        try {
            setProcessing(true)
            const token = await getToken()
            const response = await axios.post(
                'http://localhost:8000/api/checkout',
                { cartItems },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (response.data.url) {
                window.location.href = response.data.url
            }
        } catch (error) {
            console.error('Checkout error:', error)
           toast.error(error.response?.data?.error || 'Failed to initialize checkout')
        } finally {
            setProcessing(false)
        }
    }

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-20 flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                    <ShoppingBag className="w-12 h-12 text-primary-600" />
                </motion.div>
            </div>
        )
    }

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
                    <p className="text-gray-500 mb-6">Add some products to get started!</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/')}
                        className="btn-primary"
                    >
                        Browse Products
                    </motion.button>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"
            >
                Shopping Cart
            </motion.h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    <AnimatePresence>
                        {cartItems.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-6"
                            >
                                <motion.img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-24 h-24 object-contain rounded-lg bg-gradient-to-br from-slate-50 to-blue-50 p-2"
                                    whileHover={{ scale: 1.1 }}
                                />

                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg text-gray-800 mb-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-2xl font-bold text-primary-600">
                                        ${item.price.toFixed(2)}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1">
                                        <span className="text-gray-700 font-semibold">Qty: {item.qty}</span>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => removeFromCart(item._id)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="lg:col-span-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-lg p-6 sticky top-24"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="text-green-600">Free</span>
                            </div>
                            <div className="border-t pt-4">
                                <div className="flex justify-between text-xl font-bold">
                                    <span>Total</span>
                                    <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleCheckout}
                            disabled={processing || !isSignedIn}
                            className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                    />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <CreditCard className="w-5 h-5" />
                                    <span>Proceed to Checkout</span>
                                </>
                            )}
                        </motion.button>

                        {!isSignedIn && (
                            <p className="text-sm text-gray-500 text-center mt-4">
                                Please sign in to checkout
                            </p>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Cart

