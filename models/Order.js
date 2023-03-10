import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    email: { type: String},
    order_data: { type: Array, required: true }
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;