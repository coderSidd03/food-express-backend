import FoodModel from "../models/Food.js";
import FoodCategoryModel from "../models/FoodCategory.js";

export const createFoodCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const createFoodCategoryRequest = await FoodCategoryModel.create(req.body);
    res.status(201).json({ data: createFoodCategoryRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createFood = async (req, res) => {
  try {
    const { categoryName, name, img, options, description } = req.body;
    const food = await FoodModel.create(req.body);
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
