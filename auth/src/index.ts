import "express-async-errors";
import mongoose from "mongoose";
import { app } from "./app";

const startUp = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT key must be defined");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log("Connected to MongoDB");
    console.log("Listening on port 3000! 💻");
  });
};

startUp();
