import { Router } from "express";
import validator from "../middlewares/validator";
import { createRecipe } from "../controllers/recipesControllers";

export const recipesRouter = Router()

recipesRouter.post("/recipe", validator(["PUBLIC"]), createRecipe)