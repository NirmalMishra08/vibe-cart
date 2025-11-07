import { motion } from 'framer-motion'
import { CheckCircle, ShoppingBag, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const CheckoutSuccess = () => {
    return (
        <div className="container mx-auto px-4 py-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="mb-6"
                >
                    <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-primary-600 bg-clip-text text-transparent"
                >
                    Payment Successful!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-gray-600 mb-8"
                >
                    Thank you for your purchase. Your order has been confirmed and will be shipped soon.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-4 justify-center"
                >
                    <Link to="/">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-primary flex items-center space-x-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Continue Shopping</span>
                        </motion.button>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default CheckoutSuccess

