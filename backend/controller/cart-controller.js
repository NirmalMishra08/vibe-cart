import { getAuth } from "@clerk/express";
import Cart from "../models/Cart.js";
import axios from "axios";

export const getCart = async (req, res) => {
    try {
        const { userId , isAuthenticated } = getAuth(req);
        if(!isAuthenticated){
            return res.status(401).json({error:"User not authenticated"});
        }
        const cart = await Cart.find({ userId });
        const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        return res.status(200).json({ cart, total });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const addToCart = async (req, res) => {
    try {
        const { productId, qty } = req.body;
        const { userId , isAuthenticated } = getAuth(req);

        if(!isAuthenticated){
            return res.status(401).json({error:"User not authenticated"});
        }

        if(!userId){
            return res.status(400).json({ error: "Please Login to add item to Cart" });
        }

        if (!productId || !qty) {
            return res.status(400).json({ error: "Product ID and quantity are required" });
        }
        const { data: product } = await axios.get(`https://fakestoreapi.com/products/${productId}`);

        if (!product) return res.status(404).json({ error: "Product not found" });

        const existing = await Cart.findOne({ userId: userId, productId });
        if (existing) {
            existing.qty += qty;
            await existing.save();
            return res.json(existing);
        }

        const newItem = await Cart.create({
            userId: userId,
            productId,
            title: product.title,
            price: product.price,
            image: product.image,
            qty,
        });

        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const {  isAuthenticated } = getAuth(req);
        if(!isAuthenticated){
            return res.status(401).json({error:"User not authenticated"});
        }

        await Cart.findByIdAndDelete(req.params.id);
        res.json({ message: "Item removed" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
