import mongoose from "mongoose";

const foodCategorySchema = new mongoose.Schema(
  {
    categoryName: { type: String },
  },
  { timestamps: true }
);

const FoodCategoryModel = mongoose.model("foodCategory", foodCategorySchema);
export default FoodCategoryModel;
