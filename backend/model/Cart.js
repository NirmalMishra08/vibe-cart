import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: String,
  productId: Number,
  title: String,
  price: Number,
  image: String,
  qty: Number,
});

export default mongoose.model("Cart", cartSchema);
