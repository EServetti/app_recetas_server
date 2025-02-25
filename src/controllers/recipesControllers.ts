import { NextFunction, Request, Response } from "express";
import {
  readService,
  readOneService,
  updateService,
  createService,
  destroyService,
} from "../services/recipe.service";
import openAI from "../utils/openAI";

export const createRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ingredients } = req.body;
    const arrayOfRecipes = await openAI(ingredients);
    res.json({
      statusCode: 200,
      message: arrayOfRecipes,
    });
  } catch (error) {
    return next(error);
  }
};

export const saveRecipe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body
      await createService(data)
      res.json({
        statusCode: 201,
        message: "Recipe created successfully!"
      })
    } catch (error) {
        return next(error)
    }
}

export const readRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { arrayOfIds } = req.body;
    if (arrayOfIds) {
      const recipes = [];
      for (const id of arrayOfIds) {
        const recipe = await readOneService(id);
        recipes.push(recipe as never);
      }
      res.json({
        statusCode: 200,
        message: recipes,
      });
    } else {
      const {category, name} = req.query
      const filter = name ? {name} : {category}
      const recipes =  await readService(filter)
      res.json({
        statusCode: 200,
        message: recipes,
      });
    }
  } catch (error) {
    return next(error);
  }
};

export const readRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const recipe = await readOneService(id);
    res.json({
      statusCode: 200,
      message: recipe,
    });
  } catch (error) {
    return next(error);
  }
};


export const destroyRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await destroyService(id);
    res.json({
      statusCode: 200,
      message: "The recipe has been deleted!",
    });
  } catch (error) {
    return next(error);
  }
};