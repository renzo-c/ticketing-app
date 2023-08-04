import "express-async-errors";
import mongoose from "mongoose";
import { app } from "./app";

const startUp = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log("Connected to MongoDB");
    console.log("Listening on port 3000! 💻");
  });
};

startUp();
