import { motion } from 'framer-motion'
import { ShoppingCart, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

const ProductCard = ({ product, index }) => {
    const { addToCart } = useCart()
    const { isSignedIn } = useAuth()

    const handleAddToCart = () => {
        addToCart(product.id, 1)
        toast.success('Item added to cart')
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover group"
        >
            <div className="relative overflow-hidden">
                <motion.img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-contain p-4 bg-gradient-to-br from-slate-50 to-blue-50"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-4"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddToCart}
                        className="btn-primary flex items-center space-x-2"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                    </motion.button>
                </motion.div>
            </div>

            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
                    {product.title}
                </h3>

                <div className="flex items-center mb-3">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.round(product.rating?.rate || 0)
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                        ({product.rating?.count || 0})
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"
                    >
                        ${product.price.toFixed(2)}
                    </motion.div>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                        {product.category}
                    </span>
                </div>
            </div>
        </motion.div>
    )
}

export default ProductCard

