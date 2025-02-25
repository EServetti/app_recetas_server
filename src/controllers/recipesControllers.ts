import { NextFunction, Request, Response } from "express";
import openAI from "../utils/openAI";

export const createRecipe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {ingredients} = req.body
        const arrayOfRecipes = await openAI(ingredients)
        res.json({
            statusCode: 200,
            message: arrayOfRecipes
        })
    } catch (error) {
        return next(error)
    }
}