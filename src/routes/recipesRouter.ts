import { Router } from "express";
import validator from "../middlewares/validator";
import { createRecipe, destroyRecipe, readRecipe, readRecipes, saveRecipe } from "../controllers/recipesControllers";

export const recipesRouter = Router()

// post
recipesRouter.post("/create", validator(["PUBLIC"]), createRecipe)
recipesRouter.post("/save",validator(["USER","ADMIN"]), saveRecipe)

// get
recipesRouter.get("/", validator(["USER","ADMIN"]), readRecipes)
recipesRouter.get("/:id",validator(["USER","ADMIN"]), readRecipe)

// delete
recipesRouter.delete("/:id",validator(["USER","ADMIN"]), destroyRecipe)