import { Schema, Types, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const NutritionSchema = new Schema({
  calories: { type: Number, required: true },
  proteins: { type: String, required: true },
  carbs: { type: String, required: true },
  fats: { type: String, required: true }
});

const RecipeSchema = new Schema({
  name: { type: String, required: true, index: true },
  category: { 
    type: String, 
    required: true, 
    enum: ["Desayuno", "Almuerzo", "Cena", "Postre"], 
    index: true 
  },
  prepTime: { type: String, required: true },
  cookTime: { type: String, required: true },
  servings: { type: Number, required: true },
  ingredients: { type: Array, required: true },
  instructions: { type: Array, required: true },
  nutrition: { type: NutritionSchema, required: true }
});

RecipeSchema.plugin(mongoosePaginate)

const RecipeModel = model("recipe", RecipeSchema);

export default RecipeModel;
