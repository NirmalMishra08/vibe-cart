import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import axios from 'axios'
import toast from 'react-hot-toast'

const CartContext = createContext()

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within CartProvider')
    }
    return context
}

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const { isSignedIn, getToken } = useAuth()

    const fetchCart = async () => {
        if (!isSignedIn) {
            setCartItems([])
            setTotal(0)
            return
        }

        try {
            setLoading(true)
            const token = await getToken()
            const response = await axios.get(`${import.meta.env.VITE_CLERK_BACKEND_URL}/api/cart`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setCartItems(response.data.cart || [])
            setTotal(response.data.total || 0)
        } catch (error) {
            console.error('Error fetching cart:', error)
        } finally {
            setLoading(false)
        }
    }

    const addToCart = async (productId, qty = 1) => {
        if (!isSignedIn) {
            toast.error('Please sign in to add items to cart')
            return
        }

        try {
            const token = await getToken()
            await axios.post(
                `${import.meta.env.VITE_CLERK_BACKEND_URL}/api/cart`,
                { productId, qty },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            await fetchCart()
        } catch (error) {
            console.error('Error adding to cart:', error)
            alert(error.response?.data?.error || 'Failed to add item to cart')
        }
    }

    const removeFromCart = async (itemId) => {
        try {
            const token = await getToken()
            await axios.delete(`${import.meta.env.VITE_CLERK_BACKEND_URL}/api/cart/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            await fetchCart()
        } catch (error) {
            console.error('Error removing from cart:', error)
            alert('Failed to remove item from cart')
        }
    }

    useEffect(() => {
        fetchCart()
    }, [isSignedIn])

    return (
        <CartContext.Provider
            value={{
                cartItems,
                total,
                loading,
                addToCart,
                removeFromCart,
                fetchCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

