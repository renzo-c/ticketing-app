import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  if (!req.session.jwt) {
    return res.send({ currentUsert: null });
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    res.send({ currenUser: payload });  
} catch (err) {
    res.send({ currenUserx: null });
  }
});

export { router as currentUserRouter };
