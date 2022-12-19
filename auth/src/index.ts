import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./current-user";
import { signinRouter } from "./signin";
import { signoutRouter } from "./signout";
import { signupRouter } from "./signup";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.listen(3000, () => {
  console.log("Listening on port 3000! 💻");
});
