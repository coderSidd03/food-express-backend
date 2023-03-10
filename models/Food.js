import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  categoryName: { type: String },
  name: { type: String },
  img: { type: String },
  options: [{ type: Object }],
  description: { type: String }
},
{ timestamps: true });


const FoodModel = mongoose.model("Food_items", foodSchema);
export default FoodModel;