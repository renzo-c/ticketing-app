import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handlers";
import { NotFoundError } from "./errors/not-found-error";
import { Session, SessionData } from "express-session";

type JWT = string;
// Augment express-session with a custom SessionData object
declare module "express-session" {
  interface SessionData {
    jwt: JWT;
  }
  interface Session {
    jwt: JWT;
  }
}

declare module "express" {
  interface Request {
    session: (Session & JWT) | Partial<SessionData> | null;
  }
}

const app = express();
// Important so express process user's requests whose IP is behind a reversed proxy
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    secure: process.env.NODE_ENV !== 'test',
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

export { app };
