import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";

const app = express();
app.use(express.json());
app.use(cors());

try {
  mongoose.connect(
    "mongodb+srv://richassignment:richpanel@stripe-user.jz4ol6t.mongodb.net/stripe-user?retryWrites=true&w=majority"
  );
} catch (error) {
  console.log("Connection not established");
}

app.use("/auth", userRouter);
app.listen(3001, () => {
  console.log("Server started at PORT 3001");
});
