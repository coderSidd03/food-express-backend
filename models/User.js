import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    title: {type: 'string', enum: ["Mr.", "Mrs.", "Miss.", "Master."]},
    name: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
