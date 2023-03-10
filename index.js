import * as dotenv from 'dotenv'
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoute from "./Routes/userRoute.js";
import FoodRoute from "./Routes/foodRoute.js";
import DisplayRoute from "./Routes/DisplayData.js";
import OrderRoute from "./Routes/OrderData.js";

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world!");
});

mongoose.set("strictQuery", true);
mongoose
  .connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true }
  )
  .then(() =>
    app.listen(PORT, () => {
      console.log(
        `\nExpress App Running in port ${PORT}...\n>> database connected..`
      );
    })
  )
  .catch((err) => console.err);

app.use("/api", DisplayRoute);
app.use("/api/user", UserRoute);
app.use("/api/food", FoodRoute);
app.use("/api/orders", OrderRoute);