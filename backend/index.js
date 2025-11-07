import express from "express";
import cors from "cors";
import { connectDB } from "./connectDB.js";
import { clerkMiddleware } from '@clerk/express'
import productRoutes from "./routes/product.routes.js"
import cartRoutes from "./routes/cartRoutes.js"
import checkoutRoutes from "./routes/checkoutRoutes.js"
import dotenv from "dotenv"

dotenv.config();


const app = express();
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'; // Default to local if not set
app.use(cors({ origin: frontendUrl }));

app.use(express.json());


app.get("/", (req, res) => res.send("API running..."));

app.use("/api/products", productRoutes);

app.use("/api/cart",clerkMiddleware(), cartRoutes);
app.use("/api/checkout",clerkMiddleware(), checkoutRoutes);

console.log("Clerk Secret Key:", process.env.CLERK_SECRET_KEY ? "✅ Found" : "❌ Missing");


connectDB()
  .then(() => {
    app.listen(8000, () => console.log("Server started on port 8000"));
  })
  .catch((error) => console.log("Failed to connect DB", error));
