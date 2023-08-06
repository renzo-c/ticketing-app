import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@rcnp-tickets/common";
import { Session, SessionData } from "express-session";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";

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
    secure: process.env.NODE_ENV !== "test",
    signed: false,
  }) as express.RequestHandler
);

app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
