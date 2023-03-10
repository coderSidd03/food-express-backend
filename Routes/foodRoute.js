import express from "express";
import {
  createFood,
  createFoodCategory,
} from "../Controllers/foodController.js";

import { body } from "express-validator";

const router = express.Router();

router.post("/createFoodCategory", createFoodCategory);
router.post("/createFood", createFood);

export default router;
