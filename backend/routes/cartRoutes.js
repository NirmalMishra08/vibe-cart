import express from "express";
import { getCart, addToCart, removeFromCart } from "../controller/cart-controller.js";
import { getAuth } from "@clerk/express";

const router = express.Router();

// Get user's cart
router.get("/", (req, res, next) => {
    const { isAuthenticated } = getAuth(req);
    if (!isAuthenticated) {
        return res.status(401).json({ error: "Not authenticated" });
    }
    next();
}, getCart);

// Add item to cart
router.post("/", (req, res, next) => {
    const { isAuthenticated } = getAuth(req);
    if (!isAuthenticated) {
        return res.status(401).json({ error: "Not authenticated" });
    }
    next();
}, addToCart);

// Remove item from cart
router.delete("/:id", (req, res, next) => {
    const { isAuthenticated } = getAuth(req);
    if (!isAuthenticated) {
        return res.status(401).json({ error: "Not authenticated" });
    }
    next();
}, removeFromCart);

export default router;

