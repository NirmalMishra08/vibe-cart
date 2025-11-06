import express from "express";
import cors from "cors";
import { connectDB } from "./connectDB.js";
import { clerkMiddleware } from '@clerk/express'
import productRoutes from "./routes/product.routes.js"


const app = express();
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())

app.get("/", (req, res) => res.send("API running..."));

app.use("/api/products", productRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/checkout", checkoutRoutes);

connectDB()
  .then(() => {
    app.listen(5000, () => console.log("Server started on port 5000"));
  })
  .catch((error) => console.log("Failed to connect DB", error));
