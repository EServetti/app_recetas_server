import { Router } from "express";
import validator from "../middlewares/validator";
import {
  login,
  logout,
  register,
  userData,
  verifyAccount,
} from "../controllers/sessionsControllers";
import passport from "../middlewares/passport";

const sessionsRouter = Router();

// post
sessionsRouter.post(
  "/register",
  validator(["PUBLIC"]),
  passport.authenticate("register", { session: false }),
  register
);
sessionsRouter.post(
  "/login",
  validator(["PUBLIC"]),
  passport.authenticate("login", { session: false }),
  login
);
sessionsRouter.post("/logout", validator(["USER","ADMIN"]), logout)

// get
sessionsRouter.get(
  "/data",
  validator(["USER", "ADMIN"]),
  passport.authenticate("data", { session: false }),
  userData
);

// put
sessionsRouter.put(
  "/verify/:email/:verifyCode",
  validator(["PUBLIC"]),
  verifyAccount
);

export default sessionsRouter;
