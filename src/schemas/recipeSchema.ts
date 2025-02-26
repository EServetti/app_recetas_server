import Joi, { string } from "joi";

export const recipeSchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().valid("Desayuno","Almuerzo","Cena","Postre").required(),
    prepTime: Joi.string().required(),
    cookTime: Joi.string().required(),
    servings: Joi.number().required(),
    ingredients: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        amount: Joi.string().required()
    }).required()).required(),
    instructions: Joi.array().items(Joi.string().required()).required(),
    nutrition: Joi.object({
        calories: Joi.number().required(),
        proteins: Joi.string().required(),
        carbs: Joi.string().required(),
        fats: Joi.string().required()
    })
})