import { Router } from "express";
import validator from "../middlewares/validator";
import { register } from "../controllers/sessionsControllers";
import passport from "../middlewares/passport"

const sessionsRouter = Router();

// post
sessionsRouter.post(
  "/register",
  validator(["PUBLIC"]),
  passport.authenticate("register", { session: false }),
  register
);

export default sessionsRouter