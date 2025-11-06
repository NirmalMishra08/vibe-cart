import express from "express";
import { checkout } from "../controller/checkout-controller.js";
import { getAuth } from "@clerk/express";

const router = express.Router();

router.post("/", (req, res, next) => {
  const { isAuthenticated } = getAuth(req);
  if (!isAuthenticated) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  next();
}, checkout);

export default router;
