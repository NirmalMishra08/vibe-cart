import axios from "axios";

export const getProducts = async (req, res) => {
  try {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    res.json(data);
  } catch (error) {
    console.error("Error fetching products:", error);

    if (error.response) {
      // This means the request was made, but the server responded with a status code
      res.status(500).json({ error: "Failed to fetch products from the API" });
    } else if (error.request) {
      // This means the request was made but no response was received
      res.status(503).json({ error: "API not responding, please try again later." });
    } else {
      // Other errors
      res.status(500).json({ error: "Unknown error occurred while fetching products." });
    }
  }
};
