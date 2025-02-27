interface Ingredient {
  name: string;
  amount: string;
}

interface Nutrition {
  calories: number;
  proteins: string;
  carbs: string;
  fats: string;
}

interface Recipe {
  name: string;
  category: "Desayuno" | "Almuerzo" | "Cena" | "Postre";
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
  nutrition: Nutrition;
}

export interface User {
  _id: string;
  userName: string;
  email: string;
  password: string;
  verified?: boolean;
  verifyCode?: string | null;
  recipes?: string[];
  role?: "USER" | "ADMIN";
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;
}

export interface PaginateOptions {
  limit?: number;
  page?: number;
  sort?: string;
}
