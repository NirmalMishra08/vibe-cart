import axios from "axios";

export const getProducts = async (req, res) => {
  try {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

