import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { json } from "body-parser";
import "express-async-errors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
// import expressSession from "express-session";

import { currentUserRouter } from "./current-user";
import { signinRouter } from "./signin";
import { signoutRouter } from "./signout";
import { signupRouter } from "./signup";
import { errorHandler } from "./middlewares/error-handlers";
import { NotFoundError } from "./errors/not-found-error";
import { Session, SessionData } from "express-session";

type JWT = string;
// Augment express-session with a custom SessionData object
declare module "express-session" {
  interface SessionData {
    jwt: JWT,
  }
}

declare module "express" {
  interface Request {
    session: Session & JWT | Partial<SessionData> | null
  }
}

const app = express();
// Important so express process user's requests whose IP is behind a reversed proxy
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    secure: true,
    signed: false,
  }) as express.RequestHandler
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);
const startUp = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT key must be defined');
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
