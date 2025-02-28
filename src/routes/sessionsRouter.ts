import { Router } from "express";
import validator from "../middlewares/validator";
import {
  destroyAccount,
  login,
  logout,
  recoveringToken,
  register,
  updatePassword,
  userData,
  verifyAccount,
} from "../controllers/sessionsControllers";
import passport from "../middlewares/passport";
import joiValidator from "../middlewares/joiValidator";
import { passwordSchema, userSchema } from "../schemas/userSchema";

export const sessionsRouter = Router();

// post
sessionsRouter.post(
  "/register",
  validator(["PUBLIC"]),
  joiValidator(userSchema),
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
sessionsRouter.put("/recover/:email", validator(["PUBLIC"]), recoveringToken)
sessionsRouter.put("/password/:email/:token", validator(["PUBLIC"]), joiValidator(passwordSchema), updatePassword)

// delete
sessionsRouter.delete("/delete", validator(["USER","ADMIN"]), destroyAccount)


