import express from "express";
import FoodModel from "../models/Food.js";
import FoodCategoryModel from "../models/FoodCategory.js";

const router = express.Router();

router.post("/foodData", async (req, res) => {
  try {
    const food_items = await FoodModel.find();
    const foodCategory = await FoodCategoryModel.find();
    res.status(200).json([food_items, foodCategory]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
