import { Router } from "express";
import { recipesRouter } from "./recipesRouter";

export const indexRouter = Router()

indexRouter.use("/api",recipesRouter)