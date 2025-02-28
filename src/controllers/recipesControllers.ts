import { NextFunction, Request, Response } from "express";
import {
  readService,
  paginateService,
  readOneService,
  updateService,
  createService,
  destroyService,
} from "../services/recipe.service";
import openAI from "../utils/openAI";
import { User } from "../../types";

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

export const saveRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    await createService(data);
    res.json({
      statusCode: 201,
      message: "Recipe saved successfully!",
    });
  } catch (error) {
    return next(error);
  }
};

export const readUserRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const one = req.user;
    const { recipes } = one as User;
    if (recipes) {
      const arrayOfRecipes = [];
      for (const id of recipes) {
        const recipe = await readOneService(id);
        arrayOfRecipes.push(recipe as never);
      }
      res.json({
        statusCode: 200,
        message: recipes,
      });
    } else {
      const { category, name } = req.query;
      const filter = name ? { name } : { category };
      const recipes = await readService(filter);
      res.json({
        statusCode: 200,
        message: recipes,
      });
    }
  } catch (error) {
    return next(error);
  }
};

export const readRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category, name, page } = req.query;
    const filter = name ? { name } : { category };
    const paginateOptions = {
      page: page ? page as any : 1,
      limit: 10,
    }
    const recipes = await paginateService(filter, paginateOptions);
    res.json({
      statusCode: 200,
      message: recipes,
    });
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
