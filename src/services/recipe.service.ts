import RecipeManager from "../database/managers/RecipeManager";
import CustomService from "./customService";

const RecipeService = new CustomService(RecipeManager)

export const {readService, readOneService, createService, updateService, destroyService} = RecipeService