import express from "express";
import { createOrder, getOrders } from "../Controllers/orderController.js";

const router = express.Router();

router.post("/orderData", createOrder);
router.post("/orderHistory", getOrders);

export default router;