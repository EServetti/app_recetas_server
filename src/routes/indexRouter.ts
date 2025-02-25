import { Router } from "express";
import { recipesRouter } from "./recipesRouter";
import sessionsRouter from "./sessionsRouter";

export const indexRouter = Router()

indexRouter.use("/api/recipe",recipesRouter)
indexRouter.use("/api/session", sessionsRouter)